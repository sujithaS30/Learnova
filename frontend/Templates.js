const TEMPLATES = [
  {
    category: "Beginner",
    color: "#22c55e",
    items: [
      { title: "Hello World", code: 'print("Hello, World!")' },
      { title: "User Input", code: 'name = input("Enter your name: ")\nprint(f"Hello, {name}!")' },
      { title: "Simple Calculator", code: 'a = float(input("Enter first number: "))\nb = float(input("Enter second number: "))\nprint(f"Sum: {a + b}")\nprint(f"Difference: {a - b}")\nprint(f"Product: {a * b}")\nprint(f"Division: {a / b}")' },
      { title: "Even or Odd", code: 'num = int(input("Enter a number: "))\nif num % 2 == 0:\n    print(f"{num} is Even")\nelse:\n    print(f"{num} is Odd")' },
    ]
  },
  {
    category: "Loops",
    color: "#3b82f6",
    items: [
      { title: "For Loop", code: 'for i in range(1, 6):\n    print(f"Number: {i}")' },
      { title: "While Loop", code: 'count = 1\nwhile count <= 5:\n    print(f"Count: {count}")\n    count += 1' },
      { title: "Loop with List", code: 'fruits = ["apple", "banana", "cherry"]\nfor fruit in fruits:\n    print(f"I like {fruit}")' },
      { title: "Multiplication Table", code: 'num = int(input("Enter a number: "))\nfor i in range(1, 11):\n    print(f"{num} x {i} = {num * i}")' },
    ]
  },
  {
    category: "Functions",
    color: "#f59e0b",
    items: [
      { title: "Simple Function", code: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Python"))' },
      { title: "Function with Default", code: 'def power(base, exp=2):\n    return base ** exp\n\nprint(power(3))    # 9\nprint(power(2, 10)) # 1024' },
      { title: "Factorial", code: 'def factorial(n):\n    if n == 0 or n == 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))  # 120' },
      { title: "Fibonacci", code: 'def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        print(a, end=" ")\n        a, b = b, a + b\n\nfibonacci(10)' },
    ]
  },
  {
    category: "Lists & Dicts",
    color: "#8b5cf6",
    items: [
      { title: "List Operations", code: 'numbers = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(f"Original: {numbers}")\nnumbers.sort()\nprint(f"Sorted: {numbers}")\nprint(f"Max: {max(numbers)}")\nprint(f"Min: {min(numbers)}")' },
      { title: "List Comprehension", code: 'squares = [x**2 for x in range(1, 6)]\nprint(squares)  # [1, 4, 9, 16, 25]\n\nevens = [x for x in range(20) if x % 2 == 0]\nprint(evens)' },
      { title: "Dictionary", code: 'student = {\n    "name": "Alice",\n    "age": 20,\n    "grade": "A"\n}\n\nfor key, value in student.items():\n    print(f"{key}: {value}")' },
      { title: "Word Counter", code: 'text = "hello world hello python world hello"\nwords = text.split()\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\nprint(counts)' },
    ]
  },
  {
    category: "Advanced",
    color: "#ef4444",
    items: [
      { title: "File Read/Write", code: '# Write to file\nwith open("test.txt", "w") as f:\n    f.write("Hello from Python!")\n\n# Read from file\nwith open("test.txt", "r") as f:\n    content = f.read()\n    print(content)' },
      { title: "Class & Object", code: 'class Dog:\n    def __init__(self, name, breed):\n        self.name = name\n        self.breed = breed\n    \n    def bark(self):\n        return f"{self.name} says: Woof!"\n\ndog = Dog("Rex", "Labrador")\nprint(dog.bark())' },
      { title: "Try Except", code: 'try:\n    num = int(input("Enter a number: "))\n    result = 100 / num\n    print(f"Result: {result}")\nexcept ValueError:\n    print("Please enter a valid number!")\nexcept ZeroDivisionError:\n    print("Cannot divide by zero!")' },
      { title: "Lambda & Map", code: 'numbers = [1, 2, 3, 4, 5]\n\n# Lambda function\nsquare = lambda x: x ** 2\n\n# Map applies function to all items\nsquared = list(map(square, numbers))\nprint(squared)  # [1, 4, 9, 16, 25]' },
    ]
  },
];

export default function Templates({ setSharedCode, setActiveTab }) {
  function loadTemplate(code) {
    setSharedCode(code);
    setActiveTab("run");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>📋 Python Templates</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "14px" }}>Click any template to load it in the Runner and try it instantly!</p>
      </div>

      {TEMPLATES.map(cat => (
        <div key={cat.category}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: cat.color }} />
            <p style={{ fontWeight: "600", fontSize: "15px", color: cat.color }}>{cat.category}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
            {cat.items.map(item => (
              <button
                key={item.title}
                onClick={() => loadTemplate(item.code)}
                style={{ textAlign: "left", padding: "14px 16px", borderRadius: "10px", background: "rgba(255,255,255,0.05)", border: `1px solid ${cat.color}30`, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.background = `${cat.color}15`}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
              >
                <p style={{ fontWeight: "500", fontSize: "14px", color: "white", marginBottom: "4px" }}>{item.title}</p>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.code.split("\n")[0]}
                </p>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}