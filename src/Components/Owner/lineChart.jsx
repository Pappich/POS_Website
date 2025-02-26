import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);
ChartJS.defaults.font.family = "Noto Sans Thai";
ChartJS.defaults.font.size = 16;
ChartJS.defaults.color = "black";

const LineChart = () => {
  const data = {
    labels: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    datasets: [
      {
        label: "รายรับทั้งหมด",
        data: [
          50000, 10000, 40000, 30000, 60000, 50000, 80000, 70000, 90000, 60000,
          70000, 40000,
        ],
        borderColor: "#A3C4DC", // Light blue line color
        backgroundColor: "rgba(163, 196, 220, 0.3)", // Transparent fill color
        fill: true, // Enable area under the line to be filled
        tension: 0, // Smooth curve
        pointStyle: "circle",
        pointBorderColor: "#A3C4DC",
        pointBackgroundColor: "#A3C4DC",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: null,
        display: true,
        position: "bottom", // Move the legend to the bottom
        labels: {
          usePointStyle: true, // Makes the marker a circle
          pointStyle: "rectRounded", // Use a circle style
          padding: 5, // Padding around the legend items
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Turn off the grid on the x-axis
        },
      },
      y: {
        beginAtZero: true,
        border: {
          display: false,
          dash: [10, 15],
          dashOffset: 4,
        },
        ticks: { stepSize: 100 },
        grid: {
          color: "grey", // Turn off the grid on the y-axis
        },
      },
    },
  };

  return (
    <div className="w-full h-96">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
