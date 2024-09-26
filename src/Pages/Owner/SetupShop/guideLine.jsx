import React from "react";
import { useNavigate } from "react-router-dom";

const GuideLine = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/main-menu");
  };

  return (
    <div className="font-noto flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="mb-8 text-center">
        <h1 className="text-xl font-semibold text-black mb-2">
          ขั้นตอนการตั้งค่าเพื่อใช้งานระบบการขายหน้าร้าน
        </h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="space-y-4 w-4/5 max-w-lg">
        {[
          "สร้างรายการสินค้าที่ต้องการ",
          "เพิ่มกลุ่มรายการสินค้า",
          "เพิ่มตัวเลือกสำหรับใช้ในรายการสินค้า",
          "เพิ่มการตัดการสต็อคในแต่ละรายการสินค้า",
        ].map((step, index) => (
          <div
            key={index}
            className="flex items-center p-2 border rounded-full shadow-sm"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-[#D4B28C] rounded-full flex items-center justify-center text-lg font-bold text-black">
              {index + 1}
            </div>
            <div className="ml-4 text-black">{step}</div>
          </div>
        ))}
      </div>

      <button
        className="mt-10 w-4/5 max-w-lg px-6 py-2 bg-[#D4B28C] text-white font-semibold rounded-full hover:bg-[#c9a07e] transition"
        onClick={handleStart}
      >
        เริ่มต้น
      </button>
    </div>
  );
};

export default GuideLine;
