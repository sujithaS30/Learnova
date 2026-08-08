import { useState } from "react";
 
const API = "http://localhost:8000";
 
export default function QuizMode({ sharedCode, setSharedCode, lang }) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
 
  async function generate() {
    if (!sharedCode.trim()) return;
    setLoading(true);
    setError("");
    setQuiz(null);
    setAnswers({});
    setSubmitted(false);
    try {
      const res = await fetch(`${API}/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sharedCode, language: lang }),
      });
      const data = await res.json();
      if (!data || !Array.isArray(data.questions) || data.questions.length === 0) {
        setError("AI returned unexpected response. Please try again.");
        setLoading(false);
        return;
      }
      setQuiz(data);
    } catch {
      setError("Could not connect to backend. Make sure server is running on port 8000.");
    }
    setLoading(false);
  }
 
  function select(qIdx, oIdx) {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  }
 
  function submit() {
    if (!quiz) return;
    if (Object.keys(answers).length < quiz.questions.length) {
      alert("Please answer all questions first!");
      return;
    }
    setSubmitted(true);
  }
 
  const questions = (quiz && Array.isArray(quiz.questions)) ? quiz.questions : [];
  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;
 
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>🧠 Quiz Mode</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>AI generates a quiz from your code to test understanding.</p>
      </div>
 
      <textarea
        rows={6}
        value={sharedCode}
        onChange={e => setSharedCode(e.target.value)}
        placeholder="Paste code here, then generate a quiz…"
        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.9)", outline: "none", resize: "none", width: "100%", boxSizing: "border-box" }}
      />
 
      <button
        onClick={generate}
        disabled={loading || !sharedCode.trim()}
        style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#ca8a04", border: "none", color: "white", fontWeight: "500", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !sharedCode.trim() ? 0.5 : 1 }}
      >
        {loading ? "Generating quiz…" : "🧠 Generate Quiz"}
      </button>
 
      {error && (
        <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "14px" }}>{error}</div>
      )}
 
      {quiz && questions.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {questions.map((q, qi) => (
            <div key={qi} style={{ padding: "20px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{ fontWeight: "500", marginBottom: "12px" }}>Q{qi + 1}. {q.question}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(Array.isArray(q.options) ? q.options : []).map((opt, oi) => {
                  const selected = answers[qi] === oi;
                  const isCorrect = oi === q.correct;
                  let bg = "transparent";
                  let borderColor = "rgba(255,255,255,0.1)";
                  let color = "rgba(255,255,255,0.7)";
                  if (submitted) {
                    if (isCorrect) { bg = "rgba(34,197,94,0.15)"; borderColor = "#22c55e"; color = "#86efac"; }
                    else if (selected) { bg = "rgba(239,68,68,0.15)"; borderColor = "#ef4444"; color = "#fca5a5"; }
                  } else if (selected) {
                    bg = "rgba(124,58,237,0.15)"; borderColor = "#7c3aed"; color = "#c4b5fd";
                  }
                  return (
                    <button
                      key={oi}
                      onClick={() => select(qi, oi)}
                      style={{ textAlign: "left", padding: "10px 16px", borderRadius: "8px", border: `1px solid ${borderColor}`, background: bg, color, fontSize: "14px", cursor: submitted ? "default" : "pointer", transition: "all 0.15s" }}
                    >
                      <span style={{ fontFamily: "monospace", fontSize: "11px", opacity: 0.5, marginRight: "8px" }}>{["A","B","C","D"][oi]}.</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
              {submitted && <p style={{ marginTop: "10px", fontSize: "12px", color: "rgba(255,255,255,0.5)", fontStyle: "italic" }}>💡 {q.explanation}</p>}
            </div>
          ))}
 
          {!submitted ? (
            <button onClick={submit} style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#7c3aed", border: "none", color: "white", fontWeight: "500", fontSize: "15px", cursor: "pointer" }}>
              Submit Answers
            </button>
          ) : (
            <div style={{ padding: "20px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(8,145,178,0.2))", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
              <p style={{ fontSize: "32px", fontWeight: "700", marginBottom: "8px" }}>{score}/{questions.length}</p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
                {score === questions.length ? "🎉 Perfect score! You really understand this code." : score >= questions.length / 2 ? "👍 Good job! Review the wrong answers above." : "📖 Keep studying — try the Animation tab to understand better."}
              </p>
              <button onClick={() => { setQuiz(null); setAnswers({}); setSubmitted(false); }} style={{ marginTop: "12px", padding: "8px 20px", borderRadius: "8px", background: "rgba(255,255,255,0.1)", border: "none", color: "white", fontSize: "13px", cursor: "pointer" }}>
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}