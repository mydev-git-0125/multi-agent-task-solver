import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";

function ResultDisplay({ result }) {
  if (!result) return null;

  return (
    <div className="max-w-lg w-full bg-white p-6 rounded-2xl shadow-lg mt-6">
      <h2 className="text-xl font-bold mb-4">📊 Final Report</h2>

      {/* Summary */}
      <p className="mb-6 text-gray-700">{result.summary}</p>

      {/* Chart */}
      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={result.chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#3b82f6" /> {/* Tailwind blue-500 */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ResultDisplay;