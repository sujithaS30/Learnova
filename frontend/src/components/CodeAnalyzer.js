import { useState } from "react";
 
const API = "https://learnova-backend-266m.onrender.com";
 
export default function CodeAnalyzer({ sharedCode, setSharedCode, lang }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
 
  async function analyze() {
    if (!sharedCode.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`${API}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sharedCode, language: lang }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setError("Could not connect to backend. Is the server running on port 8000?");
    }
    setLoading(false);
  }
 
  const errors = (result && Array.isArray(result.errors)) ? result.errors : [];
 
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>🔍 Code Analyzer</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Paste your code — AI finds errors and explains fixes.</p>
      </div>
 
      <div style={{ position: "relative" }}>
        <textarea
          rows={10}
          value={sharedCode}
          onChange={e => setSharedCode(e.target.value)}
          placeholder={`Paste your ${lang} code here…`}
          style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.9)", outline: "none", resize: "none" }}
        />
        <span style={{ position: "absolute", top: "12px", right: "14px", fontSize: "11px", color: "rgba(255,255,255,0.2)" }}>{lang}</span>
      </div>
 
      <button
        onClick={analyze}
        disabled={loading || !sharedCode.trim()}
        style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#7c3aed", border: "none", color: "white", fontWeight: "500", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !sharedCode.trim() ? 0.5 : 1 }}
      >
        {loading ? "Analyzing…" : "🔍 Analyze Code"}
      </button>
 
      {error && (
        <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "14px" }}>{error}</div>
      )}
 
      {result && (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
 
          {/* Difficulty + concepts */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {result.difficulty && (
              <span style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.2)", color: result.difficulty === "beginner" ? "#4ade80" : result.difficulty === "intermediate" ? "#facc15" : "#f87171" }}>
                {result.difficulty}
              </span>
            )}
            {Array.isArray(result.concepts) && result.concepts.map(c => (
              <span key={c} style={{ fontSize: "12px", padding: "3px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>{c}</span>
            ))}
          </div>
 
          {/* Explanation */}
          {result.explanation && (
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}>
              <p style={{ fontSize: "12px", color: "#93c5fd", fontWeight: "500", marginBottom: "6px" }}>What this code does</p>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)" }}>{result.explanation}</p>
            </div>
          )}
 
          {/* Errors */}
          {errors.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{errors.length} issue{errors.length > 1 ? "s" : ""} found</p>
              {errors.map((err, i) => (
                <div key={i} style={{ padding: "14px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
                  <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "11px", fontFamily: "monospace", background: "rgba(239,68,68,0.2)", color: "#fca5a5", padding: "2px 8px", borderRadius: "4px", flexShrink: 0 }}>Line {err.line}</span>
                    <div>
                      <p style={{ fontSize: "14px", fontWeight: "500", color: "#fca5a5" }}>{err.type}: {err.message}</p>
                      <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>✅ Fix: {err.fix}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", color: "#86efac", fontSize: "14px" }}>
              ✅ No errors found!
            </div>
          )}
 
          {/* Fixed code */}
          {result.fixed_code && errors.length > 0 && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Fixed Code</p>
                <button onClick={() => setSharedCode(result.fixed_code)} style={{ fontSize: "12px", color: "#a78bfa", background: "none", border: "none", cursor: "pointer" }}>← Use this code</button>
              </div>
              <pre style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "#86efac", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                {result.fixed_code}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}