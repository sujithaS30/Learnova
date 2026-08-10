from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
import os
import subprocess
import tempfile
import sys
import json
import re

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

SECRET_KEY = os.getenv("SECRET_KEY", "learnova-secret-key-2024")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Simple in-memory user store (replace with database later)
users_db = {}

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Models ──────────────────────────────────────────────
class ChatRequest(BaseModel):
    message: str

class CodeRequest(BaseModel):
    code: str
    language: str = "python"

class AnimationRequest(BaseModel):
    code: str
    language: str = "python"

class ExecuteRequest(BaseModel):
    code: str
    language: str = "python"

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str
    name: str
    email: str

# ── Auth Helpers ─────────────────────────────────────────
def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None or email not in users_db:
            raise HTTPException(status_code=401, detail="Invalid token")
        return users_db[email]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ── Auth Routes ──────────────────────────────────────────
@app.post("/register")
async def register(request: RegisterRequest):
    if request.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    users_db[request.email] = {
        "name": request.name,
        "email": request.email,
        "password": hash_password(request.password)
    }
    token = create_token({"sub": request.email})
    return Token(access_token=token, token_type="bearer", name=request.name, email=request.email)

@app.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_token({"sub": form_data.username})
    return Token(access_token=token, token_type="bearer", name=user["name"], email=user["email"])

@app.get("/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return {"name": current_user["name"], "email": current_user["email"]}

# ── Helper ───────────────────────────────────────────────
def ask_groq(prompt: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3,
    )
    return response.choices[0].message.content

def clean_json(text: str):
    text = text.strip()
    text = re.sub(r"^```[a-z]*\n?", "", text)
    text = re.sub(r"\n?```$", "", text)
    return json.loads(text)

# ── App Routes ───────────────────────────────────────────
@app.get("/")
def root():
    return {"status": "Learnova backend running!"}

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        reply = ask_groq(request.message)
        return {"reply": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_code(request: CodeRequest):
    prompt = f"""You are a strict code teacher analyzing {request.language} code.
IMPORTANT:
- If the code uses syntax from a DIFFERENT language, mark it as an error.
- Check for ALL issues: wrong language syntax, missing quotes, logic errors.

Return ONLY a valid JSON object with NO markdown:
{{
  "errors": [{{"line": 1, "type": "SyntaxError", "message": "what is wrong", "fix": "how to fix it"}}],
  "fixed_code": "corrected full code here",
  "explanation": "plain English explanation",
  "difficulty": "beginner",
  "concepts": ["print", "output"]
}}

If NO errors, return empty array: "errors": []
Code ({request.language}): {request.code}"""
    try:
        return clean_json(ask_groq(prompt))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/animate")
async def animate_code(request: AnimationRequest):
    prompt = f"""You are a fun coding teacher explaining code to a beginner.
Break down this {request.language} code into exactly 4 animation steps.

Return ONLY a valid JSON object with NO markdown:
{{
  "title": "One sentence about what this code does",
  "character": "robot",
  "steps": [
    {{"step": 1, "emoji": "🔍", "title": "Step title", "description": "Simple explanation", "code_highlight": "the specific line", "visual_action": "thinking"}}
  ],
  "summary": "One fun sentence"
}}

Rules: character must be one of: robot, wizard, cat, astronaut
visual_action must be one of: idle, thinking, pointing, celebrating, reading
Code ({request.language}): {request.code}"""
    try:
        return clean_json(ask_groq(prompt))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/execute")
async def execute_code(request: ExecuteRequest):
    if request.language.lower() != "python":
        return {"output": "Live execution supports Python only.", "error": None}
    try:
        with tempfile.NamedTemporaryFile(suffix=".py", mode="w", delete=False, encoding="utf-8") as f:
            f.write(request.code)
            tmp = f.name
        result = subprocess.run([sys.executable, tmp], capture_output=True, text=True, timeout=5)
        os.unlink(tmp)
        return {"output": result.stdout or "(no output)", "error": result.stderr or None}
    except subprocess.TimeoutExpired:
        return {"output": None, "error": "Took too long (5s limit)."}
    except Exception as e:
        return {"output": None, "error": str(e)}

@app.post("/quiz")
async def generate_quiz(request: CodeRequest):
    prompt = f"""Create a 3-question multiple choice quiz about this {request.language} code.

Return ONLY a valid JSON object with NO markdown:
{{
  "questions": [
    {{"question": "What does this code do?", "options": ["A", "B", "C", "D"], "correct": 0, "explanation": "Because..."}}
  ]
}}

Rules: exactly 3 questions, exactly 4 options each
Code ({request.language}): {request.code}"""
    try:
        return clean_json(ask_groq(prompt))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
