import { useState } from "react";
import CodeAnalyzer from "./components/CodeAnalyzer";
import AnimationExplainer from "./components/AnimationExplainer";
import AskAI from "./components/AskAI";
import CodeRunner from "./components/CodeRunner";
import QuizMode from "./components/QuizMode";
import Templates from "./components/Templates";
import Concepts from "./components/Concepts";
import Challenges from "./components/Challenges";
import Roadmap from "./components/Roadmap";
 
const TABS = [
  { id: "analyze",    label: "🔍 Analyze"    },
  { id: "animate",    label: "🎬 Animate"    },
  { id: "run",        label: "▶ Run"          },
  { id: "ask",        label: "💬 Ask AI"     },
  { id: "quiz",       label: "🧠 Quiz"       },
  { id: "templates",  label: "📋 Templates"  },
  { id: "concepts",   label: "📚 Concepts"   },
  { id: "challenges", label: "🏆 Challenges" },
  { id: "roadmap",    label: "🗺️ Roadmap"    },
];
 
export default function App() {
  const [activeTab, setActiveTab] = useState("analyze");
  const [sharedCode, setSharedCode] = useState("");
 
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0f0f11", color: "white", fontFamily: "sans-serif" }}>
 
      {/* Header */}
      <header style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "22px", fontWeight: "700", background: "linear-gradient(to right, #a78bfa, #67e8f9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Learnova
          </span>
          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "2px 8px" }}>
            🐍 Python Learning Platform
          </span>
        </div>
        <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>Python only</span>
      </header>
 
      {/* Tab Bar - scrollable */}
      <div style={{ display: "flex", gap: "2px", padding: "12px 24px 0", borderBottom: "1px solid rgba(255,255,255,0.1)", overflowX: "auto" }}>
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "8px 14px",
              borderRadius: "8px 8px 0 0",
              fontSize: "13px",
              fontWeight: "500",
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
              backgroundColor: activeTab === t.id ? "#7c3aed" : "transparent",
              color: activeTab === t.id ? "white" : "rgba(255,255,255,0.4)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
 
      {/* Content */}
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "32px 24px" }}>
        {activeTab === "analyze"    && <CodeAnalyzer sharedCode={sharedCode} setSharedCode={setSharedCode} lang="python" />}
        {activeTab === "animate"    && <AnimationExplainer sharedCode={sharedCode} setSharedCode={setSharedCode} lang="python" />}
        {activeTab === "run"        && <CodeRunner sharedCode={sharedCode} setSharedCode={setSharedCode} lang="python" />}
        {activeTab === "ask"        && <AskAI />}
        {activeTab === "quiz"       && <QuizMode sharedCode={sharedCode} setSharedCode={setSharedCode} lang="python" />}
        {activeTab === "templates"  && <Templates setSharedCode={setSharedCode} setActiveTab={setActiveTab} />}
        {activeTab === "concepts"   && <Concepts setSharedCode={setSharedCode} setActiveTab={setActiveTab} />}
        {activeTab === "challenges" && <Challenges setSharedCode={setSharedCode} setActiveTab={setActiveTab} />}
        {activeTab === "roadmap"    && <Roadmap />}
      </main>
    </div>
  );
}
 