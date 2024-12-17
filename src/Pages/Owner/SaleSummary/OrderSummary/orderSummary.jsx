import React from "react";
import SideBar from "../../../../Components/sideBar";

const OrderSummary = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div>
      <SideBar />
      <h1 className="font-bold">นี่คือหน้า Order Summary</h1>
    </div>
  );
};

export default OrderSummary;
