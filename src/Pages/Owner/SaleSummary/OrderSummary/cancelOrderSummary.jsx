import React from "react";
import SideBar from "../../../../Components/sideBar";

const CancelOrderSummary = () => {
  return (
    <div>
      <SideBar menuTab={"orderSummary"} />
      <h1 className="font-bold text-xl">ออเดอร์ที่ถูกยกเลิก</h1>
    </div>
  );
};

export default CancelOrderSummary;
