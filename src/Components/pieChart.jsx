import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["ข้าวผัดไก่", "ข้าวไข่เจียว", "ราดหน้า"],
    datasets: [
      {
        data: [50, 48, 42], // Sales data for the menu
        backgroundColor: ["#D49148", "#A3C4DC", "#E4D5A6"], // Custom colors
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw} จาน`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full" style={{ height: "180px" }}>
      {" "}
      {/* Adjust the height here */}
      <Pie data={data} options={options} />
      <CustomLegend data={data} />
    </div>
  );
};

const CustomLegend = ({ data }) => {
  return (
    <div
      style={{
        display: "inline",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0px",
      }}
    >
      {data.labels.map((label, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "15px",
              height: "15px",
              backgroundColor: data.datasets[0].backgroundColor[i],
              borderRadius: "4px",
              marginRight: "8px",
            }}
          />
          <span style={{ marginRight: "auto" }}>{label}</span>
          <span style={{ fontWeight: "bold", textAlign: "right" }}>
            {data.datasets[0].data[i]} จาน
          </span>
        </div>
      ))}
    </div>
  );
};

export default PieChart;
