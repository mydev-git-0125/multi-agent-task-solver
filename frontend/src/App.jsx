import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import TaskInput from "./components/TaskInput";
import AgentProgress from "./components/AgentProgress";
import ResultDisplay from "./components/ResultDisplay";

const socket = io("http://localhost:4000"); // backend URL

function App() {
  const [tasks, setTasks] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    socket.on("tasksPlanned", (plannedTasks) => {
      setTasks(plannedTasks);
      setFinalResult(null);
      setShowResult(false);
    });

    socket.on("taskUpdate", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === updatedTask.id ? { ...t, status: updatedTask.status } : t
        )
      );
    });

    socket.on("finalResult", (result) => {
      setFinalResult(result);
      // we don’t call setShowResult here, AgentProgress will trigger after 1s
    });

    return () => {
      socket.off("tasksPlanned");
      socket.off("taskUpdate");
      socket.off("finalResult");
    };
  }, []);

  const handleStart = (requestText) => {
    setTasks([]);
    setFinalResult(null);
    setShowResult(false);
    socket.emit("startTask", requestText);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6">
        Multi-Agent Task Solver (Demo)
      </h1>

      {/* Input field */}
      <TaskInput onStart={handleStart} />

      {/* Progress bars */}
      <AgentProgress
        tasks={tasks}
        onAllDone={() => setShowResult(true)} // show result after pipeline finishes
      />

      {/* Final Result */}
      {showResult && finalResult && <ResultDisplay result={finalResult} />}
    </div>
  );
}

export default App;