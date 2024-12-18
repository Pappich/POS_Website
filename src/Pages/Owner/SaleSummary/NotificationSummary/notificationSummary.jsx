import React from "react";
import SideBar from "../../../../Components/sideBar";

const NotificationSummary = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div>
      <SideBar menuTab={"notificationSummary"} />
      <h1 className="font-bold">นี่คือหน้า Notification</h1>
    </div>
  );
};

export default NotificationSummary;
