import { useState } from "react";

const API = "https://learnova-backend-266m.onrender.com";

export default function CodeRunner({ sharedCode, setSharedCode, lang }) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [runError, setRunError] = useState(null);

  async function run() {
    if (!sharedCode.trim()) return;
    setLoading(true);
    setOutput(null);
    setRunError(null);
    try {
      const res = await fetch(`${API}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sharedCode, language: lang }),
      });
      const data = await res.json();
      setOutput(data.output);
      setRunError(data.error);
    } catch {
      setRunError("Could not connect to backend.");
    }
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>▶ Code Runner</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Run your Python code live and see the output instantly.</p>
      </div>

      <textarea
        rows={12}
        value={sharedCode}
        onChange={e => setSharedCode(e.target.value)}
        placeholder="Paste Python code here and hit Run…"
        style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.9)", outline: "none", resize: "none" }}
      />

      <button
        onClick={run}
        disabled={loading || !sharedCode.trim()}
        style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "#16a34a", border: "none", color: "white", fontWeight: "500", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !sharedCode.trim() ? 0.5 : 1 }}
      >
        {loading ? "Running…" : "▶ Run Code"}
      </button>

      {(output || runError) && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Output</p>
          {output && (
            <pre style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "#86efac", overflowX: "auto", whiteSpace: "pre-wrap" }}>
              {output}
            </pre>
          )}
          {runError && (
            <pre style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "12px", padding: "16px", fontSize: "13px", fontFamily: "monospace", color: "#fca5a5", overflowX: "auto", whiteSpace: "pre-wrap" }}>
              {runError}
            </pre>
          )}
        </div>
      )}

      {lang !== "python" && (
        <p style={{ fontSize: "12px", color: "rgba(234,179,8,0.6)", textAlign: "center" }}>
          Live execution supports Python only.
        </p>
      )}
    </div>
  );
}
