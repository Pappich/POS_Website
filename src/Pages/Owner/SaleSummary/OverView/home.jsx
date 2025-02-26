import React from "react";
import CalendarSelect from "../../../../Components/Owner/calendarSelect";
import IncomeOrderCancel from "../../../../Components/Owner/incomeOrderCancel";
import BarChart from "../../../../Components/Owner/barChart";
import PieChart from "../../../../Components/Owner/pieChart";
import SideBar from "../../../../Components/Owner/sideBar";

const Home = () => {
  const myName = [
    { name: "Total Order                  ", age: 5 },
    { name: "Total Revenue", age: 51 },
    { name: "Total Cancel", age: 52 },
  ];

  return (
    <div>
      <SideBar menuTab={"overview"} />
      <h1 className="font-bold text-xl">ภาพรวมการขาย</h1>
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
