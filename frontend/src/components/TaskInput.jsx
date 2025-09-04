import React, { useState } from "react";

function TaskInput({ onStart }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    onStart(input.trim()); // send to parent
    setInput(""); // clear field
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center mb-6 w-full max-w-lg"
    >
      <input
        type="text"
        placeholder="Enter a business request..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={!input.trim()}
        className={`px-4 py-2 rounded-lg font-medium text-white ${
          input.trim()
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Start
      </button>
    </form>
  );
}

export default TaskInput;