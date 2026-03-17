import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// ✅ Register once (outside component)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BP_chart({ chartData }) {
  if (!chartData || !chartData.date || chartData.date.length === 0) {
    return (
      <div className="h-64 w-full grid place-content-center text-gray-500 italic">
        No chart data available
      </div>
    );
  }

  const { low = [], date = [], high = [] } = chartData;

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
        text: "Blood Pressure",
        font: {
          size: 18,
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        display: true,
        ticks: {
          stepSize: 10,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const data = {
    labels: date,
    datasets: [
      {
        label: "Low",
        data: low,
        backgroundColor: "rgba(252, 99, 255, 0.7)",
        barPercentage: 0.6,
        borderRadius: 8,
      },
      {
        label: "High",
        data: high,
        backgroundColor: "rgba(99, 99, 255, 0.7)",
        barPercentage: 0.6,
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="w-full h-72 bg-white p-4 rounded-xl shadow-sm">
      <Bar options={options} data={data} />
    </div>
  );
}
