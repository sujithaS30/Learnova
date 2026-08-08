import { useState, useRef, useEffect } from "react";
 
const API = "http://localhost:8000";
 
export default function AskAI() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi! I'm your code assistant 🤖 Ask me anything about programming!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
 
  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply || "No response received." }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "❌ Could not reach the server. Is the backend running?" }]);
    }
    setLoading(false);
  }
 
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "580px" }}>
      <div style={{ marginBottom: "16px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "4px" }}>💬 Ask AI</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Ask anything about your code or programming concepts.</p>
      </div>
 
      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "16px", paddingRight: "4px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "80%",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
              background: m.role === "user" ? "#7c3aed" : "rgba(255,255,255,0.08)",
              border: m.role === "ai" ? "1px solid rgba(255,255,255,0.1)" : "none",
              color: "rgba(255,255,255,0.9)",
              fontSize: "14px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ display: "flex", gap: "4px" }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "rgba(255,255,255,0.4)", display: "inline-block", animation: "bounce 1s infinite", animationDelay: `${i*150}ms` }} />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
 
      {/* Input */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
          placeholder="Ask a question about code…"
          style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", color: "white", outline: "none" }}
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          style={{ padding: "12px 20px", borderRadius: "12px", background: "#7c3aed", border: "none", color: "white", fontWeight: "500", fontSize: "14px", cursor: "pointer", opacity: loading || !input.trim() ? 0.5 : 1 }}
        >
          Send
        </button>
      </div>
    </div>
  );
}