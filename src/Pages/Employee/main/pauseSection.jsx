import React from "react";
import { useNavigate } from "react-router-dom";
import HomeEmButton from "../../../Components/homeEmButton";
const PauseSection = () => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/order-list");
  };

  const handlePauseIngredient = () => {
    navigate("/pause-ingredient");
  };

  const handlePauseMenu = () => {
    navigate("/pause-menu");
  };
  return (
    <>
      {/* <div className="flex justify-end">
        <HomeEmButton />
      </div> */}
      <div className="flex flex-col items-center bg-white">
        <div className="text-center mb-10 mt-[40px]">
          <h1 className="text-3xl font-bold mb-2">วัตถุดิบที่ต้องการพัก</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full">
          <div className="w-full mb-4">
            <div className="flex justify-between items-start">
              <p className="text-2xl">วัตถุดิบที่เลือกทั้งหมด</p>
              <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                {/* <button className="hover:underline font-bold">ดูรายการ</button>
                <span className="text-gray-300">|</span> */}
                <button
                  onClick={handlePauseIngredient}
                  className="hover:underline font-bold"
                >
                  แก้ไข
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full mb-4">
            <div className="flex justify-between items-start">
              <p className="text-2xl">เมนูที่เลือกทั้งหมด</p>
              <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                {/* <button className="hover:underline font-bold">ดูรายการ</button>
                <span className="text-gray-300">|</span> */}
                <button
                  onClick={handlePauseMenu}
                  className="hover:underline font-bold"
                >
                  แก้ไข
                </button>
              </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
          </div>
        </div>

        <div className="flex fixed bottom-4 left-0 px-4 py-4 w-full space-x-8 justify-between">
          <button
            onClick={handleBackButton}
            className="px-14 py-4 w-[300px] rounded-full border text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
          >
            ย้อนกลับ
          </button>
          {/* <button className="px-6 py-3 w-[250px] rounded-full bg-[#D4B28C] text-white hover:bg-[#cda777] transition-colors font-bold">
            บันทึก
          </button> */}
        </div>
      </div>
    </>
  );
};

export default PauseSection;
