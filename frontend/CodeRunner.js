import { useState } from "react";

const API = "http://localhost:8000";

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
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">▶ Code Runner</h2>
        <p className="text-white/40 text-sm">Run your Python code live and see the output instantly.</p>
      </div>

      <textarea
        rows={12}
        value={sharedCode}
        onChange={e => setSharedCode(e.target.value)}
        placeholder="Paste Python code here and hit Run…"
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 font-mono text-sm text-white/90 outline-none focus:border-violet-500 resize-none"
      />

      <button
        onClick={run}
        disabled={loading || !sharedCode.trim()}
        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed font-medium transition"
      >
        {loading ? "Running…" : "▶ Run Code"}
      </button>

      {(output || runError) && (
        <div>
          <p className="text-sm text-white/40 mb-2">Output</p>
          {output && (
            <pre className="bg-black/50 border border-white/10 rounded-xl p-4 text-sm font-mono text-green-300 overflow-x-auto whitespace-pre-wrap">
              {output}
            </pre>
          )}
          {runError && (
            <pre className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm font-mono text-red-300 overflow-x-auto whitespace-pre-wrap mt-2">
              {runError}
            </pre>
          )}
        </div>
      )}

      {lang !== "python" && (
        <p className="text-xs text-yellow-400/60 text-center">
          ⚠️ Live execution currently supports Python only. Switch language to Python to run code.
        </p>
      )}
    </div>
  );
}