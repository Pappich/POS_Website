import React from "react";
import SideBar from "../../../../Components/sideBar";

const SaleSummaryGraph = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div>
      <SideBar menuTab={"saleSummaryGraph"} />
      <h1 className="font-bold">นี่คือหน้า SaleSummaryGraph</h1>
    </div>
  );
};

export default SaleSummaryGraph;
