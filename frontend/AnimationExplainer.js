import { useState } from "react";
 
const API = "https://learnova-backend-266m.onrender.com";
 
const CHARACTERS = {
  robot:     { idle: "🤖", thinking: "🤔", pointing: "👉🤖", celebrating: "🎉🤖", reading: "📖🤖" },
  wizard:    { idle: "🧙", thinking: "🧙‍♂️💭", pointing: "🧙‍♂️✨", celebrating: "🧙‍♂️🎊", reading: "🧙‍♂️📜" },
  cat:       { idle: "🐱", thinking: "🐱💭", pointing: "🐱👉", celebrating: "🐱🎉", reading: "🐱📖" },
  astronaut: { idle: "👨‍🚀", thinking: "👨‍🚀💭", pointing: "👨‍🚀👉", celebrating: "👨‍🚀🎊", reading: "👨‍🚀📡" },
};
 
export default function AnimationExplainer({ sharedCode, setSharedCode, lang }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
 
  async function generate() {
    if (!sharedCode.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setCurrentStep(0);
    try {
      const res = await fetch(`${API}/animate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: sharedCode, language: lang }),
      });
      const data = await res.json();
      if (!data || !Array.isArray(data.steps) || data.steps.length === 0) {
        setError("AI returned unexpected response. Please try again.");
        setLoading(false);
        return;
      }
      setResult(data);
    } catch (e) {
      setError("Could not connect to backend. Make sure server is running on port 8000.");
    }
    setLoading(false);
  }
 
  function playAll() {
    if (!result || !result.steps || result.steps.length === 0) return;
    setPlaying(true);
    setCurrentStep(0);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i >= result.steps.length) {
        clearInterval(interval);
        setPlaying(false);
      } else {
        setCurrentStep(i);
      }
    }, 2200);
  }
 
  const steps = (result && Array.isArray(result.steps)) ? result.steps : [];
  const chars = CHARACTERS[result && result.character] || CHARACTERS.robot;
  const step = steps[currentStep] || {};
  const charEmoji = chars[step.visual_action] || chars.idle;
 
  const box = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px" };
 
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>🎬 Animation Explainer</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>AI breaks your code into fun animated steps.</p>
      </div>
 
      <textarea
        rows={8}
        value={sharedCode}
        onChange={e => setSharedCode(e.target.value)}
        placeholder={`Paste your ${lang} code to animate…`}
        style={{ ...box, fontFamily: "monospace", fontSize: "14px", color: "rgba(255,255,255,0.9)", outline: "none", resize: "none", width: "100%", boxSizing: "border-box" }}
      />
 
      <button
        onClick={generate}
        disabled={loading || !sharedCode.trim()}
        style={{ width: "100%", padding: "12px", borderRadius: "12px", background: "linear-gradient(to right, #7c3aed, #0891b2)", border: "none", color: "white", fontWeight: "500", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading || !sharedCode.trim() ? 0.5 : 1 }}
      >
        {loading ? "Generating animation…" : "🎬 Animate This Code"}
      </button>
 
      {error && (
        <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "14px" }}>{error}</div>
      )}
 
      {result && steps.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontWeight: "600" }}>{result.title}</p>
            <button onClick={playAll} disabled={playing} style={{ padding: "6px 16px", borderRadius: "8px", background: "#7c3aed", border: "none", color: "white", fontSize: "13px", cursor: "pointer", opacity: playing ? 0.5 : 1 }}>
              {playing ? "Playing…" : "▶ Auto Play"}
            </button>
          </div>
 
          {/* Animation Card */}
          <div style={{ position: "relative", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.1)", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(8,145,178,0.1))", padding: "32px 24px", minHeight: "200px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "12px", right: "16px", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
              {currentStep + 1} / {steps.length}
            </div>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>{charEmoji}</div>
            <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>{step.emoji} {step.title}</p>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", lineHeight: "1.6", maxWidth: "480px" }}>{step.description}</p>
            {step.code_highlight && (
              <code style={{ display: "block", marginTop: "10px", padding: "8px 14px", background: "rgba(0,0,0,0.4)", borderRadius: "8px", color: "#67e8f9", fontSize: "12px", fontFamily: "monospace" }}>
                {step.code_highlight}
              </code>
            )}
          </div>
 
          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
            {steps.map((_, i) => (
              <button key={i} onClick={() => setCurrentStep(i)} style={{ border: "none", cursor: "pointer", borderRadius: "999px", background: i === currentStep ? "#7c3aed" : "rgba(255,255,255,0.2)", width: i === currentStep ? "24px" : "10px", height: "10px", padding: 0, transition: "all 0.2s" }} />
            ))}
          </div>
 
          {/* Prev / Next */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0} style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "white", cursor: "pointer", opacity: currentStep === 0 ? 0.3 : 1 }}>← Prev</button>
            <button onClick={() => setCurrentStep(s => Math.min(steps.length - 1, s + 1))} disabled={currentStep === steps.length - 1} style={{ flex: 1, padding: "10px", borderRadius: "12px", border: "none", background: "#7c3aed", color: "white", fontWeight: "500", cursor: "pointer", opacity: currentStep === steps.length - 1 ? 0.3 : 1 }}>Next →</button>
          </div>
 
          {currentStep === steps.length - 1 && (
            <div style={{ padding: "16px", borderRadius: "12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", textAlign: "center" }}>
              <p style={{ fontSize: "28px", marginBottom: "8px" }}>🎉</p>
              <p style={{ color: "#86efac", fontSize: "14px", fontWeight: "500" }}>{result.summary}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}