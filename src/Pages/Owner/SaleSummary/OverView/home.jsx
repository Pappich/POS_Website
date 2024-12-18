import React from "react";
import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";
import IncomeOrderCancel from "../../../../Components/incomeOrderCancel";

const Home = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div>
      <SideBar menuTab={"overview"} />
      <h1 className="font-bold">ภาพรวมการขาย</h1>
      <span className="flex justify-end">
        <CalendarSelect />
      </span>
      <IncomeOrderCancel />
    </div>
  );
};

export default Home;
