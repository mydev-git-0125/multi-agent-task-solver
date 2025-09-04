import React, { useEffect, useState } from "react";

function AgentProgress({ tasks, onAllDone }) {
  const [progressMap, setProgressMap] = useState({});
  const [activeTask, setActiveTask] = useState(null);


  useEffect(() => {
    tasks.forEach((task) => {

        // Reset for pending tasks
      if (task.status === "pending") {
        setProgressMap((prev) => ({
          ...prev,
          [task.id]: {
            width: "0%",
            transition: "none",
            color: "bg-gray-400",
          },
        }));
      }


      // Step 1: when task goes in_progress -> creep slowly
      if (task.status === "in_progress" && activeTask !== task.id) {
        setActiveTask(task.id); // mark this as the active one
        setProgressMap((prev) => ({
          ...prev,
          [task.id]: {
            width: task.id === 1 ? "0%" : "40%", // creep slowly toward ~70%
            transition: "width 10s linear",
            color: "bg-green-500",
          },
        }));
      }

      // Step 2: when task is done -> finish to 100% in green, then turn blue
      if (task.status === "done" && activeTask === task.id) {
        // quick finish to 100% in 0.5s
        setProgressMap((prev) => ({
          ...prev,
          [task.id]: {
            width: "100%",
            transition: "width 500ms ease-in-out",
            color: "bg-green-500",
          },
        }));

        // after 0.5s, flip to blue
        setTimeout(() => {
          setProgressMap((prev) => ({
            ...prev,
            [task.id]: {
              ...prev[task.id],
              color: "bg-blue-500",
            },
          }));

          // if it's the last task, trigger final result after 1s
          if (task.id === tasks[tasks.length - 1].id) {
            setTimeout(() => {
              if (onAllDone) onAllDone();
            }, 500);
          }
        }, 100);
      }

      
    });

  }, [tasks]);

  if (!tasks.length) return null;

  return (
    <div className="w-full max-w-lg mb-6">
      <h2 className="text-lg font-semibold mb-2">Agent Progress</h2>
      {tasks.map((task) => {
        const barStyle = progressMap[task.id] || {
          width: "0%",
          transition: "none",
          color: "bg-gray-400",
        };

        return (
          <div key={task.id} className="mb-4">
            <p className="mb-1">{task.name}</p>
            <div className="w-full bg-gray-300 h-3 rounded overflow-hidden">
              <div
                className={`h-3 rounded ${barStyle.color}`}
                style={{
                  width: barStyle.width,
                  transition: barStyle.transition,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AgentProgress;