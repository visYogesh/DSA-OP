import { useState, useEffect } from "react";
import { roadmap } from "./data/roadmap";

export default function App() {
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dsaProgress") || "{}");
    setCompleted(saved);
  }, []);

  const toggleTopic = (topic) => {
    const updated = { ...completed, [topic]: !completed[topic] };
    setCompleted(updated);
    localStorage.setItem("dsaProgress", JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 DSA Roadmap Tracker</h1>
      {roadmap.map((phase, idx) => (
        <div key={idx} className="mb-6 p-4 bg-gray-800 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-3">{phase.phase}</h2>
          <ul className="space-y-2">
            {phase.topics.map((topic, i) => (
              <li
                key={i}
                className={`flex items-center justify-between p-2 rounded ${
                  completed[topic] ? "bg-green-700" : "bg-gray-700"
                }`}
              >
                <span>{topic}</span>
                <input
                  type="checkbox"
                  checked={completed[topic] || false}
                  onChange={() => toggleTopic(topic)}
                  className="w-5 h-5 accent-green-500"
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
