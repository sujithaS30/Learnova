import { useState, useEffect } from "react";

const API = "https://learnova-backend-266m.onrender.com";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Silently warm up the backend as soon as the page loads.
  // No status is shown to the user — this just quietly wakes
  // up the server in the background before they finish typing.
  useEffect(() => {
    fetch(`${API}/health`).catch(() => {});
  }, []);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handleSubmit() {
    if (!email || !password) { setError("Please fill all fields"); return; }
    if (isRegister && !name) { setError("Please enter your name"); return; }
    setLoading(true);
    setError("");

    // Retry silently up to 3 times in the background.
    // The user only ever sees the button say "Please wait…".
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (isRegister) {
          const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.detail || "Registration failed");
            setLoading(false);
            return;
          }
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
          onLogin({ name: data.name, email: data.email });
          return;
        } else {
          const formData = new FormData();
          formData.append("username", email);
          formData.append("password", password);
          const res = await fetch(`${API}/login`, { method: "POST", body: formData });
          const data = await res.json();
          if (!res.ok) {
            setError(data.detail || "Invalid email or password");
            setLoading(false);
            return;
          }
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));
          onLogin({ name: data.name, email: data.email });
          return;
        }
      } catch (e) {
        if (attempt < 3) {
          await sleep(5000);
        } else {
          setError("Something went wrong. Please try again.");
        }
      }
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f11", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 20px" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "700", background: "linear-gradient(to right, #a78bfa, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 8px" }}>
            Learnova
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>🐍 AI-Powered Python Learning Platform</p>
        </div>

        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "32px" }}>

          <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: "10px", padding: "4px", marginBottom: "24px" }}>
            <button onClick={() => { setIsRegister(false); setError(""); }}
              style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500", fontSize: "14px", background: !isRegister ? "#7c3aed" : "transparent", color: !isRegister ? "white" : "rgba(255,255,255,0.4)" }}
            >Login</button>
            <button onClick={() => { setIsRegister(true); setError(""); }}
              style={{ flex: 1, padding: "8px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "500", fontSize: "14px", background: isRegister ? "#7c3aed" : "transparent", color: isRegister ? "white" : "rgba(255,255,255,0.4)" }}
            >Register</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {isRegister && (
              <div>
                <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name"
                  style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none" }}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email"
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none" }}
              />
            </div>

            <div>
              <label style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "block", marginBottom: "6px" }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password"
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "white", fontSize: "14px", outline: "none" }}
              />
            </div>

            {error && (
              <div style={{ padding: "10px 14px", borderRadius: "8px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#fca5a5", fontSize: "13px" }}>
                {error}
              </div>
            )}

            <button onClick={handleSubmit} disabled={loading}
              style={{ width: "100%", padding: "13px", borderRadius: "10px", background: "linear-gradient(to right, #7c3aed, #0891b2)", border: "none", color: "white", fontWeight: "600", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1, marginTop: "4px" }}
            >
              {loading ? "Please wait…" : isRegister ? "Create Account" : "Login"}
            </button>
          </div>
        </div>

        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "20px" }}>
          Learn Python with AI — Free forever 🚀
        </p>
      </div>
    </div>
  );
}
