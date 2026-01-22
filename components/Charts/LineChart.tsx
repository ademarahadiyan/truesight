"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LineChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Scan Activity",
        data: [10, 20, 15, 40, 25],
        borderColor: "#E60026", // Telkomsel Red
        backgroundColor: "rgba(230, 0, 38, 0.15)",
        pointBackgroundColor: "#E60026",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // penting agar bisa diatur tinggi-nya
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { stepSize: 10 },
        grid: { color: "#f1f1f1" },
      },
    },
  };

  return (
    <div className="h-48"> {/* fixed height agar tidak terlalu besar */}
      <Line data={data} options={options} />
    </div>
  );
}
