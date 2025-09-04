/**
 * Multi-Agent Task Solver Backend
 * --------------------------------
 * Simulates three agents running sequentially:
 * 1. Data Fetching (1s)
 * 2. Summarization (3s)
 * 3. Visualization (2s)
 *
 * Communicates with the frontend via Socket.IO.
 */

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const PORT = process.env.PORT || 4000;

// --- App Setup ---
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// --- Task Definitions ---
const TASKS = [
  { id: 1, name: "Data Fetching", duration: 1000 },
  { id: 2, name: "Summarization", duration: 5000 },
  { id: 3, name: "Visualization", duration: 2000 },
];

/**
 * Emits a planned list of tasks to the client.
 */
function emitPlannedTasks(socket) {
  const planned = TASKS.map((t) => ({
    id: t.id,
    name: t.name,
    status: "pending",
    duration: t.duration,
  }));
  socket.emit("tasksPlanned", planned);
}

/**
 * Executes tasks sequentially with delays based on duration.
 * Each task emits: in_progress → done.
 */
async function executeTasks(socket) {
  for (const task of TASKS) {
    // Mark in_progress
    socket.emit("taskUpdate", {
      id: task.id,
      name: task.name,
      status: "in_progress",
    });
    console.log(`[Agent] ${task.name} started`);

    // Wait for task duration
    await new Promise((resolve) => setTimeout(resolve, task.duration));

    // Mark done
    socket.emit("taskUpdate", {
      id: task.id,
      name: task.name,
      status: "done",
    });
    console.log(`[Agent] ${task.name} completed`);
  }

  // Emit final result when all tasks complete
  socket.emit("finalResult", {
    summary:
      "Revenue grew steadily across the last 3 quarters, with strongest growth in Q2.",
    chartData: [
      { quarter: "Q1", revenue: 12000 },
      { quarter: "Q2", revenue: 18000 },
      { quarter: "Q3", revenue: 22000 },
    ],
  });
  console.log("[System] All tasks completed. Final result emitted.");
}

// --- Socket Events ---
io.on("connection", (socket) => {
  console.log("[System] Client connected");

  socket.on("startTask", (requestText) => {
    console.log(`[System] Received new request: "${requestText}"`);

    emitPlannedTasks(socket);
    executeTasks(socket);
  });

  socket.on("disconnect", () => {
    console.log("[System] Client disconnected");
  });
});

// --- Start Server ---
server.listen(PORT, () => {
  console.log(`[System] Backend running on http://localhost:${PORT}`);
});