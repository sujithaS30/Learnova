import { useState } from "react";

const DAILY_CHALLENGES = [
  {
    level: "Beginner",
    color: "#22c55e",
    emoji: "🌱",
    title: "Sum of Numbers",
    description: "Write a Python program that asks the user for two numbers and prints their sum, difference, product, and quotient.",
    hint: "Use input() to get numbers, float() to convert them, and print() to show results.",
    starter: '# Get two numbers from user\na = float(input("Enter first number: "))\nb = float(input("Enter second number: "))\n\n# Calculate and print results\n# Your code here...',
    solution: 'a = float(input("Enter first number: "))\nb = float(input("Enter second number: "))\nprint(f"Sum: {a + b}")\nprint(f"Difference: {a - b}")\nprint(f"Product: {a * b}")\nif b != 0:\n    print(f"Quotient: {a / b}")\nelse:\n    print("Cannot divide by zero!")',
  },
  {
    level: "Beginner",
    color: "#22c55e",
    emoji: "🌱",
    title: "FizzBuzz",
    description: "Print numbers from 1 to 20. For multiples of 3 print Fizz, for multiples of 5 print Buzz, for both print FizzBuzz.",
    hint: "Use a for loop with range(1, 21) and check conditions with if/elif/else.",
    starter: '# FizzBuzz from 1 to 20\nfor i in range(1, 21):\n    # Your code here...\n    pass',
    solution: 'for i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        print("FizzBuzz")\n    elif i % 3 == 0:\n        print("Fizz")\n    elif i % 5 == 0:\n        print("Buzz")\n    else:\n        print(i)',
  },
  {
    level: "Intermediate",
    color: "#f59e0b",
    emoji: "⚡",
    title: "Palindrome Check",
    description: "Write a function that checks if a given string is a palindrome. Test it with racecar, hello, madam.",
    hint: "Compare the string with its reverse using string[::-1]",
    starter: 'def is_palindrome(text):\n    # Your code here...\n    pass\n\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False\nprint(is_palindrome("madam"))    # True',
    solution: 'def is_palindrome(text):\n    text = text.lower().replace(" ", "")\n    return text == text[::-1]\n\nprint(is_palindrome("racecar"))  # True\nprint(is_palindrome("hello"))    # False\nprint(is_palindrome("madam"))    # True',
  },
  {
    level: "Intermediate",
    color: "#f59e0b",
    emoji: "⚡",
    title: "Count Vowels",
    description: "Write a function that counts the number of vowels in a given string.",
    hint: "Loop through each character and check if it is in aeiou",
    starter: 'def count_vowels(text):\n    # Your code here...\n    pass\n\nprint(count_vowels("Hello World"))  # 3\nprint(count_vowels("Python"))       # 1',
    solution: 'def count_vowels(text):\n    count = 0\n    for char in text.lower():\n        if char in "aeiou":\n            count += 1\n    return count\n\nprint(count_vowels("Hello World"))  # 3\nprint(count_vowels("Python"))       # 1',
  },
  {
    level: "Advanced",
    color: "#ef4444",
    emoji: "🔥",
    title: "Student Grade System",
    description: "Create a class Student with name and marks list. Add methods to calculate average, find highest mark, and determine grade.",
    hint: "Use sum()/len() for average, max() for highest, and if/elif for grade.",
    starter: 'class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    \n    def average(self):\n        pass\n    \n    def highest(self):\n        pass\n    \n    def grade(self):\n        pass\n\ns = Student("Alice", [85, 92, 78, 95, 88])\nprint(f"Average: {s.average()}")\nprint(f"Highest: {s.highest()}")\nprint(f"Grade: {s.grade()}")',
    solution: 'class Student:\n    def __init__(self, name, marks):\n        self.name = name\n        self.marks = marks\n    \n    def average(self):\n        return sum(self.marks) / len(self.marks)\n    \n    def highest(self):\n        return max(self.marks)\n    \n    def grade(self):\n        avg = self.average()\n        if avg >= 90: return "A"\n        elif avg >= 80: return "B"\n        elif avg >= 70: return "C"\n        else: return "F"\n\ns = Student("Alice", [85, 92, 78, 95, 88])\nprint(f"Average: {s.average()}")\nprint(f"Highest: {s.highest()}")\nprint(f"Grade: {s.grade()}")',
  },
];

export default function Challenges({ setSharedCode, setActiveTab }) {
  const [selected, setSelected] = useState(null);

  function startChallenge(ch) {
    setSelected(ch);
  }

  function tryInRunner() {
    setSharedCode(selected.starter);
    setActiveTab("run");
  }

  function seeSolution() {
    setSharedCode(selected.solution);
    setActiveTab("run");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>🏆 Python Challenges</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Practice Python by solving real challenges. Try yourself first, then see the solution!</p>
      </div>

      {!selected ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {DAILY_CHALLENGES.map((ch, i) => (
            <button
              key={i}
              onClick={() => startChallenge(ch)}
              style={{ textAlign: "left", padding: "18px 20px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${ch.color}30`, cursor: "pointer" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <span style={{ fontSize: "20px" }}>{ch.emoji}</span>
                <span style={{ fontWeight: "600", fontSize: "15px" }}>{ch.title}</span>
                <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: `${ch.color}20`, color: ch.color, marginLeft: "auto" }}>{ch.level}</span>
              </div>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)", lineHeight: "1.5" }}>{ch.description}</p>
            </button>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <button onClick={() => setSelected(null)} style={{ alignSelf: "flex-start", padding: "6px 14px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white", fontSize: "13px", cursor: "pointer" }}>
            Back to Challenges
          </button>
          <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: `1px solid ${selected.color}30` }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <span style={{ fontSize: "24px" }}>{selected.emoji}</span>
              <h3 style={{ fontSize: "18px", fontWeight: "600" }}>{selected.title}</h3>
              <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "999px", background: `${selected.color}20`, color: selected.color, marginLeft: "auto" }}>{selected.level}</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)", lineHeight: "1.6", marginBottom: "12px" }}>{selected.description}</p>
            <div style={{ padding: "12px", borderRadius: "8px", background: "rgba(255,255,255,0.05)", marginBottom: "16px" }}>
              <p style={{ fontSize: "12px", color: "#fbbf24", marginBottom: "4px" }}>Hint:</p>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{selected.hint}</p>
            </div>
            <pre style={{ background: "rgba(0,0,0,0.4)", borderRadius: "8px", padding: "14px", fontSize: "12px", fontFamily: "monospace", color: "#a5f3fc", overflowX: "auto", whiteSpace: "pre-wrap", marginBottom: "14px" }}>
              {selected.starter}
            </pre>
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={tryInRunner} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "#7c3aed", border: "none", color: "white", fontWeight: "500", fontSize: "14px", cursor: "pointer" }}>
                Try in Runner
              </button>
              <button onClick={seeSolution} style={{ flex: 1, padding: "10px", borderRadius: "10px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "white", fontSize: "14px", cursor: "pointer" }}>
                See Solution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
