const CONCEPTS = [
  { emoji: "📦", title: "Variables", color: "#3b82f6", desc: "Variables store data values. Python has no command for declaring a variable — it is created the moment you assign a value.", code: '# Different variable types\nname = "Alice"        # String\nage = 25              # Integer\nheight = 5.6          # Float\nis_student = True     # Boolean\n\nprint(name, age, height, is_student)\nprint(type(name))     # <class str>' },
  { emoji: "🔀", title: "If / Else", color: "#8b5cf6", desc: "If/else statements let your code make decisions based on conditions.", code: 'score = 85\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelif score >= 70:\n    print("Grade: C")\nelse:\n    print("Grade: F")' },
  { emoji: "🔄", title: "For Loops", color: "#22c55e", desc: "For loops repeat a block of code for each item in a sequence.", code: '# Loop through a range\nfor i in range(5):\n    print(f"Step {i}")\n\n# Loop through a list\ncolors = ["red", "green", "blue"]\nfor color in colors:\n    print(f"Color: {color}")' },
  { emoji: "⏳", title: "While Loops", color: "#f59e0b", desc: "While loops keep running as long as a condition is True.", code: 'count = 0\nwhile count < 5:\n    print(f"Count is {count}")\n    count += 1\n\nprint("Done!")' },
  { emoji: "⚙️", title: "Functions", color: "#ef4444", desc: "Functions are reusable blocks of code that perform a specific task.", code: 'def add(a, b):\n    return a + b\n\ndef greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\nprint(add(3, 4))           # 7\nprint(greet("Python"))     # Hello, Python!\nprint(greet("World", "Hi")) # Hi, World!' },
  { emoji: "📝", title: "Lists", color: "#06b6d4", desc: "Lists store multiple items in a single variable. They are ordered and changeable.", code: 'fruits = ["apple", "banana", "cherry"]\n\n# Access items\nprint(fruits[0])    # apple\n\n# Add items\nfruits.append("mango")\n\n# Remove items\nfruits.remove("banana")\n\n# Length\nprint(len(fruits))  # 3\nprint(fruits)' },
  { emoji: "📖", title: "Dictionaries", color: "#f97316", desc: "Dictionaries store data in key-value pairs. They are ordered and changeable.", code: 'person = {\n    "name": "Alice",\n    "age": 25,\n    "city": "Chennai"\n}\n\n# Access value\nprint(person["name"])  # Alice\n\n# Add new key\nperson["job"] = "Developer"\n\n# Loop through\nfor key, value in person.items():\n    print(f"{key} = {value}")' },
  { emoji: "🏛️", title: "Classes", color: "#ec4899", desc: "Classes are blueprints for creating objects. They bundle data and functions together.", code: 'class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n    \n    def introduce(self):\n        return f"I am {self.name} with grade {self.grade}"\n    \n    def is_passing(self):\n        return self.grade >= 50\n\ns = Student("Alice", 85)\nprint(s.introduce())\nprint(s.is_passing())  # True' },
  { emoji: "🛡️", title: "Try / Except", color: "#64748b", desc: "Try/except blocks handle errors gracefully so your program doesn't crash.", code: 'try:\n    age = int(input("Enter age: "))\n    if age < 0:\n        raise ValueError("Age cannot be negative")\n    print(f"Your age is {age}")\nexcept ValueError as e:\n    print(f"Error: {e}")\nexcept Exception as e:\n    print(f"Something went wrong: {e}")\nfinally:\n    print("Program finished")' },
  { emoji: "🗂️", title: "File Handling", color: "#84cc16", desc: "Python can read and write files on your computer using the open() function.", code: '# Write to a file\nwith open("data.txt", "w") as f:\n    f.write("Line 1\\n")\n    f.write("Line 2\\n")\n    f.write("Line 3\\n")\n\n# Read from a file\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())' },
];

export default function Concepts({ setSharedCode, setActiveTab }) {
  function tryCode(code) {
    setSharedCode(code);
    setActiveTab("run");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>📚 Python Concepts</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Learn Python concepts with examples. Click "Try it" to run the code!</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "14px" }}>
        {CONCEPTS.map(c => (
          <div key={c.title} style={{ padding: "18px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${c.color}25` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <span style={{ fontSize: "22px" }}>{c.emoji}</span>
              <span style={{ fontWeight: "600", fontSize: "16px", color: c.color }}>{c.title}</span>
            </div>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: "1.6", marginBottom: "12px" }}>{c.desc}</p>
            <pre style={{ background: "rgba(0,0,0,0.4)", borderRadius: "8px", padding: "10px", fontSize: "11px", fontFamily: "monospace", color: "#a5f3fc", overflowX: "auto", whiteSpace: "pre-wrap", marginBottom: "10px" }}>
              {c.code}
            </pre>
            <button
              onClick={() => tryCode(c.code)}
              style={{ width: "100%", padding: "8px", borderRadius: "8px", background: `${c.color}20`, border: `1px solid ${c.color}40`, color: c.color, fontSize: "13px", fontWeight: "500", cursor: "pointer" }}
            >
              ▶ Try it in Runner
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}