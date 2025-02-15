import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineDocumentChartBar,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { BiFoodMenu } from "react-icons/bi";

const UserRole = () => {
  const navigate = useNavigate();

  const icons = [
    {
      id: "owner",
      label: "ฝั่งเจ้าของร้าน",
      details: "เว็บไซต์ตรวจสอบคลังสินค้าและยอดขาย ระบบสร้างรายการสินค้า",
      icon: <HiOutlineDocumentChartBar size={120} />,
    },
    {
      id: "employee",
      label: "ฝั่งพนักงาน",
      details: "เว็บไซต์ดูคำสั่งซื้อ",
      icon: <HiOutlineClipboardDocumentList size={120} />,
    },
    {
      id: "customer",
      label: "ฝั่งลูกค้า",
      details: "เว็บไซต์สั่งอาหาร",
      icon: <BiFoodMenu size={120} />,
    },
  ];

  const handleClick = (id) => {
    if (id === "owner") {
      navigate("/owner");
    } else if (id === "employee") {
      navigate("/order-list");
    } else if (id === "customer") {
      window.open("/menu", "_blank");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-[120px]">
      <div className="text-start mb-10">
        <h1 className="mt-4 text-3xl font-bold mb-2">ผู้ใช้งาน</h1>
        <h1 className="text-2xl mb-2">
          โปรดเลือกเว็บไซต์ฝั่งผู้ใช้งานที่ต้องการ
        </h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="w-full h-full ml-16 mt-[120px]">
        <div className="grid grid-cols-3 gap-8">
          {icons.map(({ id, label, details, icon }) => (
            <div
              key={id}
              className={
                "flex flex-col items-center cursor-pointer transition-all text-[#D4B28C] hover:text-orange-500"
              }
              onClick={() => handleClick(id)}
            >
              <div
                className={
                  "p-3 transition-colors duration-300 mb-2 text-[#D4B28C] hover:text-orange-500"
                }
              >
                {icon}
              </div>
              <p className={"mt-2 text-3xl font-bold text-black"}>{label}</p>
              <p className={"mt-2 text-2xl text-black"}>{details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserRole;
