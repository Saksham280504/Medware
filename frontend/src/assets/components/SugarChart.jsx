import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ✅ Register ONCE (outside component)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SugarChart({ chartData }) {
  if (!chartData) return null;

  const { after = [], before = [], date = [] } = chartData;

  // ✅ Trim dates to YYYY-MM-DD
  const formattedDates = date.map((d) => d?.slice(0, 10));

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: "Glucose - Breakfast",
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const data = {
    labels: formattedDates,
    datasets: [
      {
        label: "Before",
        data: before, // ✅ fixed
        borderColor: "rgba(0, 205, 145, 0.8)",
        backgroundColor: "rgba(0, 205, 145, 0.2)",
        fill: false,
      },
      {
        label: "After",
        data: after, // ✅ fixed
        borderColor: "rgba(84, 18, 255, 0.8)",
        backgroundColor: "rgba(84, 18, 255, 0.2)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full h-96">
      <Line options={options} data={data} />
    </div>
  );
}
