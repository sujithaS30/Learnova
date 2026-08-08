# Learnova 🧠

**An AI-powered Python learning platform** — analyze code, generate visual explanations, run Python live, chat with an AI tutor, and test yourself with quizzes.

🔗 **Live Demo:** [https://learnova.netlify.app](https://learnova.netlify.app)
🔗 **Backend API:** [https://learnova-api.onrender.com](https://learnova-api.onrender.com)

## ✨ Features

| Feature | Description |
|---|---|
| 🔍 **Analyze** | Finds and explains errors in your Python code |
| 🎬 **Animate** | Generates a cartoon-style explainer for how your code executes |
| ▶️ **Run** | Live in-browser Python code runner |
| 💬 **Ask AI** | Chat assistant for Python questions |
| 🧠 **Quiz** | Test your understanding with generated quizzes |
| 📋 **Templates** | 20 ready-to-use code examples |
| 📚 **Concepts** | 10 core Python topics explained |
| 🏆 **Challenges** | Coding problems to practice with |
| 🗺️ **Roadmap** | A structured Python learning path |

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS — deployed on [Netlify](https://netlify.com)
- **Backend:** Python, FastAPI, Uvicorn — deployed on [Render](https://render.com)
- **AI:** [Groq API](https://groq.com/) (Llama 3.3 70B)

## 📁 Project Structure

```
Learnova/
├── components/          # React components (AskAI, QuizMode, CodeRunner, etc.)
├── public/               # Static assets
├── main.py               # FastAPI backend entry point
├── App.js                # React app root
├── index.js               # React entry point
├── tailwind.config.js
├── package.json
├── requirements.txt      # Python dependencies
└── .gitignore
```

## 🚀 Getting Started Locally

### Prerequisites

- Node.js (v16+)
- Python (3.10+)
- A [Groq API key](https://console.groq.com/keys)

### 1. Clone the repo

```bash
git clone https://github.com/sujithaS30/Learnova.git
cd Learnova
```

### 2. Backend setup

```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Run the backend:

```bash
uvicorn main:app --reload
```

### 3. Frontend setup

```bash
npm install
npm start
```

The app will be available at `http://localhost:3000`, with the backend running on `http://localhost:8000`.

## 🌐 Deployment

This project is live and deployed as follows:

- **Frontend:** Hosted on [Netlify](https://netlify.com), auto-deployed from the `main` branch
- **Backend:** Hosted on [Render](https://render.com) as a Python web service

The `GROQ_API_KEY` is set as an environment variable in the Render dashboard — it is never committed to this repository.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♀️ Author

Built by [sujithaS30](https://github.com/sujithaS30)
