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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 DSA Roadmap Tracker</h1>
      {roadmap.map((phase, idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl text-red-500 font-semibold mb-4">{phase.phase}</h2>
          {phase.topics.map((topic, i) => (
            <div key={i} className="mb-4 p-4 bg-gray-800 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-blue-500">{topic.title}</span>
                <input
                  type="checkbox"
                  checked={completed[topic.title] || false}
                  onChange={() => toggleTopic(topic.title)}
                  className="w-5 h-5 accent-green-500"
                />
              </div>
              <ul className="mt-2 ml-4 list-disc text-gray-300 space-y-1">
                {topic.details.map((point, idx2) => (
                  <li key={idx2}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
