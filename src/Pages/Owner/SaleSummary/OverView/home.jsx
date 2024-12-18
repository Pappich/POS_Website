import React from "react";
import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";
import IncomeOrderCancel from "../../../../Components/incomeOrderCancel";
import BarChart from "../../../../Components/barChart";
import PieChart from "../../../../Components/pieChart";
const Home = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div >
      <SideBar menuTab={"overview"} />
      <h1 className="font-bold">ภาพรวมการขาย</h1>
      <span className="flex justify-end">
        <CalendarSelect />
      </span>
      <IncomeOrderCancel />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        {/* Bar Chart Section */}
        <div className="bg-white p-4 border rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            กราฟสรุปรายรับประจำเดือน
          </h2>
          <BarChart />
        </div>

        {/* Pie Chart Section */}
        <div className="bg-white p-4 border rounded-lg">
          <h2 className="text-lg font-semibold  mb-2">เมนูขายดี</h2>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
