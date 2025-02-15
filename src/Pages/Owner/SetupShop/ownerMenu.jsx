import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBox2 } from "react-icons/bs";
import { RiMenuAddLine } from "react-icons/ri";

const OwnerMenu = () => {
  const navigate = useNavigate();

  const icons = [
    {
      id: "createMenu",
      label: "ระบบสร้างรายการสินค้า",
      details: "เพิ่มรายการ กลุ่ม ตัวเลือกของสินค้า และการตัดคลังสินค้า",
      icon: <RiMenuAddLine size={100} />,
    },
    {
      id: "stock",
      label: "เว็บไซต์ตรวจสอบคลังสินค้า",
      details: "ดูภาพรวมยอดขาย ประวัติออเดอร์ และอัปเดตคลังสินค้า",
      icon: <BsBox2 size={100} />,
    },
  ];

  const handleClick = (id) => {
    if (id === "createMenu") {
      navigate("/guideline");
    } else if (id === "stock") {
      navigate("/overview");
    }
  };

  const handleBack = () => {
    navigate("/role");
  };

  return (
    <div className="flex flex-col items-center mt-[120px]">
      <div className="text-start mb-10">
        <h1 className="text-3xl font-bold mb-2">เจ้าของร้าน</h1>
        <h1 className="text-2xl mb-2">โปรดเลือกเว็บไซต์ที่ต้องการเข้าใช้งาน</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="w-full ml-16 mt-[120px]">
        <div className="grid grid-cols-2 gap-8">
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

      <div className="flex w-full mt-[360px]">
        <button
          className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
          onClick={handleBack}
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
};

export default OwnerMenu;
