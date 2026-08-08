from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
import os
import subprocess
import tempfile
import sys
import json
import re
 
load_dotenv()
 
client = Groq(api_key=os.getenv("GROQ_API_KEY"))
 
app = FastAPI()
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
 
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
 
@app.get("/")
def root():
    return {"status": "Learnova backend running with Groq!"}
 
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
- If the code uses syntax from a DIFFERENT language (e.g. printf in Python, semicolons not needed, System.out in Python), mark it as an error.
- Check for ALL issues: wrong language syntax, missing quotes, logic errors, bad practices.
 
Return ONLY a valid JSON object with NO markdown, no extra text:
{{
  "errors": [
    {{
      "line": 1,
      "type": "SyntaxError",
      "message": "what is wrong",
      "fix": "how to fix it"
    }}
  ],
  "fixed_code": "corrected full code here",
  "explanation": "plain English explanation of what the code does and what was wrong",
  "difficulty": "beginner",
  "concepts": ["print", "output"]
}}
 
If NO errors, return empty array: "errors": []
 
Code ({request.language}):
{request.code}"""
    try:
        text = ask_groq(prompt)
        return clean_json(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
 
@app.post("/animate")
async def animate_code(request: AnimationRequest):
    prompt = f"""You are a fun coding teacher explaining code to a beginner.
Break down this {request.language} code into exactly 4 animation steps.
 
Return ONLY a valid JSON object with NO markdown, no extra text:
{{
  "title": "One sentence about what this code does",
  "character": "robot",
  "steps": [
    {{
      "step": 1,
      "emoji": "🔍",
      "title": "Step title",
      "description": "Simple explanation a 10-year-old understands",
      "code_highlight": "the specific line this step refers to",
      "visual_action": "thinking"
    }}
  ],
  "summary": "One fun sentence about what the code achieves"
}}
 
Rules:
- character must be one of: robot, wizard, cat, astronaut
- visual_action must be one of: idle, thinking, pointing, celebrating, reading
- steps array must have exactly 4 items
 
Code ({request.language}):
{request.code}"""
    try:
        text = ask_groq(prompt)
        return clean_json(text)
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
        result = subprocess.run(
            [sys.executable, tmp],
            capture_output=True, text=True, timeout=5
        )
        os.unlink(tmp)
        return {
            "output": result.stdout or "(no output)",
            "error": result.stderr or None
        }
    except subprocess.TimeoutExpired:
        return {"output": None, "error": "Took too long (5s limit)."}
    except Exception as e:
        return {"output": None, "error": str(e)}
 
@app.post("/quiz")
async def generate_quiz(request: CodeRequest):
    prompt = f"""Create a 3-question multiple choice quiz about this {request.language} code.
 
Return ONLY a valid JSON object with NO markdown, no extra text:
{{
  "questions": [
    {{
      "question": "What does this code do?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Because..."
    }}
  ]
}}
 
Rules:
- questions array must have exactly 3 items
- each question must have exactly 4 options
- correct is the index (0, 1, 2, or 3) of the right answer
 
Code ({request.language}):
{request.code}"""
    try:
        text = ask_groq(prompt)
        return clean_json(text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))