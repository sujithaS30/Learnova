const ROADMAP = [
  {
    level: "1",
    title: "Python Basics",
    color: "#22c55e",
    emoji: "🌱",
    topics: ["Variables & Data Types", "Print & Input", "String Formatting", "Comments", "Basic Operators"],
    project: "Simple Calculator",
  },
  {
    level: "2",
    title: "Control Flow",
    color: "#3b82f6",
    emoji: "🔀",
    topics: ["If / Elif / Else", "Comparison Operators", "Logical Operators (and, or, not)", "Nested Conditions", "Match Statement"],
    project: "Number Guessing Game",
  },
  {
    level: "3",
    title: "Loops",
    color: "#8b5cf6",
    emoji: "🔄",
    topics: ["For Loop", "While Loop", "Break & Continue", "Range Function", "Nested Loops"],
    project: "Multiplication Table Generator",
  },
  {
    level: "4",
    title: "Functions",
    color: "#f59e0b",
    emoji: "⚙️",
    topics: ["def keyword", "Parameters & Arguments", "Return Values", "Default Parameters", "Lambda Functions", "Recursion"],
    project: "Fibonacci & Factorial Calculator",
  },
  {
    level: "5",
    title: "Data Structures",
    color: "#ef4444",
    emoji: "📦",
    topics: ["Lists", "Tuples", "Sets", "Dictionaries", "List Comprehension", "Dictionary Comprehension"],
    project: "Student Grade Manager",
  },
  {
    level: "6",
    title: "String Operations",
    color: "#06b6d4",
    emoji: "📝",
    topics: ["String Methods", "String Slicing", "f-Strings", "String Formatting", "Regular Expressions basics"],
    project: "Text Analyzer (count words, vowels)",
  },
  {
    level: "7",
    title: "File Handling",
    color: "#84cc16",
    emoji: "🗂️",
    topics: ["Open & Close Files", "Read Files", "Write Files", "Append to Files", "CSV Files", "JSON Files"],
    project: "Contact Book (save to file)",
  },
  {
    level: "8",
    title: "OOP (Classes)",
    color: "#ec4899",
    emoji: "🏛️",
    topics: ["Classes & Objects", "__init__ method", "Instance Methods", "Inheritance", "Encapsulation", "Polymorphism"],
    project: "Bank Account System",
  },
  {
    level: "9",
    title: "Error Handling",
    color: "#f97316",
    emoji: "🛡️",
    topics: ["Try / Except", "Finally Block", "Raise Exceptions", "Custom Exceptions", "Error Types"],
    project: "Safe Calculator with Error Handling",
  },
  {
    level: "10",
    title: "Libraries & Projects",
    color: "#a78bfa",
    emoji: "🚀",
    topics: ["pip & Installing Libraries", "requests (APIs)", "pandas (Data)", "matplotlib (Charts)", "tkinter (GUI)", "Flask (Web)"],
    project: "Weather App / Data Dashboard",
  },
];

export default function Roadmap() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>🗺️ Python Learning Roadmap</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Follow this path to go from complete beginner to Python developer!</p>
      </div>

      <div style={{ position: "relative" }}>
        {/* Vertical line */}
        <div style={{ position: "absolute", left: "20px", top: "0", bottom: "0", width: "2px", background: "rgba(255,255,255,0.1)" }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {ROADMAP.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              {/* Circle */}
              <div style={{ flexShrink: 0, width: "42px", height: "42px", borderRadius: "50%", background: `${step.color}20`, border: `2px solid ${step.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", zIndex: 1 }}>
                {step.emoji}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: "16px 18px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: `1px solid ${step.color}25`, marginBottom: "4px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: `${step.color}20`, color: step.color }}>Level {step.level}</span>
                  <span style={{ fontWeight: "600", fontSize: "15px" }}>{step.title}</span>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
                  {step.topics.map(t => (
                    <span key={t} style={{ fontSize: "11px", padding: "3px 10px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", borderRadius: "8px", background: `${step.color}10`, border: `1px solid ${step.color}20` }}>
                  <span style={{ fontSize: "13px" }}>🎯</span>
                  <span style={{ fontSize: "12px", color: step.color, fontWeight: "500" }}>Project: {step.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom message */}
      <div style={{ padding: "20px", borderRadius: "14px", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))", border: "1px solid rgba(124,58,237,0.3)", textAlign: "center" }}>
        <p style={{ fontSize: "20px", marginBottom: "8px" }}>🎉</p>
        <p style={{ fontWeight: "600", marginBottom: "4px" }}>Complete all 10 levels!</p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>Use the Templates, Concepts, and Challenges tabs to practice each level. Use Analyze to check your code and Ask AI when you're stuck!</p>
      </div>
    </div>
  );
}