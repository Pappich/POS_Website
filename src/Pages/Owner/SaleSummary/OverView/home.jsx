import React from "react";
import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";

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
      <CalendarSelect/>
    </div>
  );
};

export default Home;
