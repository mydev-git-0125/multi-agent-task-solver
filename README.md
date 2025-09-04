Title: Multi-Agent Task Solver

Overview

This project is my take on Challenge 1 – Multi-Agent Task Solver from Wand AI’s technical assignment. 
The idea is pretty straightforward: take a plain English business request, break it down into smaller tasks, 
simulate different “agents” working on those tasks, and then show a combined final result. 
I focused on making the app feel real and polished, even though the backend logic is mocked.

What it Does
- You type in a request like “Summarize the last 3 quarters’ financial trends and create a chart.”
- The system creates 3 fake agents: Data Fetcher, Summarizer, Visualizer.
- Each agent “runs” in real time (you see progress bars update live).
- When they’re all done, you get:
  • A short summary (like a business insight)
  • A simple chart (bar chart of revenue by quarter)
- The result isn’t connected to the specific input I type, it’s just mocked data. I made that choice to keep the focus on demonstrating the full flow.

Stack & Setup
- Frontend: React (Vite), TailwindCSS, Socket.io client, Recharts (for charts)
- Backend: Node.js, Express, Socket.io

How to Run
1. Backend
   cd backend
   npm install
   npm start
   (runs on http://localhost:4000)

2. Frontend
   cd frontend
   npm install
   npm run dev
   (open http://localhost:5173)

Design Choices & Trade-offs
- Kept the backend super light. No real AI calls, just mocked data with setTimeouts and socket events.
- Chose WebSockets over polling because it feels smoother and more “real time.”
- Picked revenue as the metric since it’s easy to understand and chart.
- Spent more time polishing the frontend so it looks good and demos well.

Expected Demo Flow
1. Enter a plain language request
2. Watch 3 agents light up one by one, updating progress
3. Final card shows:
   - Summary of financial trend
   - Bar chart of quarterly revenue

Future Ideas
- Integrate with real LLM (OpenAI/Anthropic) for planning + summarization.
- Pull actual financial data from an API
- Add retry buttons when an agent “fails”
- Support multiple requests in a single session

