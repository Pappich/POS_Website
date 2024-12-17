import React from "react";
import SideBar from "../../../../Components/sideBar";

const Home = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div>
      <SideBar />
      <h1 className="font-bold">ออเดอร์ทั้งหมด</h1>
    </div>
  );
};

export default Home;
