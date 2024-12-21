import React from "react";
import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";
import IncomeOrderCancel from "../../../../Components/incomeOrderCancel";
import LineChart from "../../../../Components/lineChart";
const SaleSummaryGraph = () => {
  return (
    <div className="h-screen flex flex-col">
      <SideBar menuTab={"saleSummaryGraph"} />
      <h1 className="font-bold text-xl">ภาพรวมยอดขาย</h1>
      <span className="flex justify-end">
        <CalendarSelect />
      </span>
      <IncomeOrderCancel />
      <div className="mt-3 flex-1">
        {/* Bar Chart Section */}
        <div className="bg-white p-4 border rounded-lg  flex flex-col">
          <h2 className="text-lg text-center font-semibold mb-2 ">
            กราฟสรุปรายรับประจำเดือน
          </h2>
          <div className="flex-1">
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleSummaryGraph;
