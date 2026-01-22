"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ResultChartProps {
  detectionScore: number; // 0-100
  type: "video" | "audio" | "image";
}

export default function ResultChart({ detectionScore, type }: ResultChartProps) {
  const data = [
    { name: "Terdeteksi Palsu", value: detectionScore },
    { name: "Asli", value: 100 - detectionScore },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}