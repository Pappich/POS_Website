import React from "react";
import { CiBoxList } from "react-icons/ci";
import { CgMenuGridO } from "react-icons/cg";
import { CiGlass } from "react-icons/ci";
import { LiaMugHotSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const ChoiceOptions = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/choice-list");
  };

  const handleGlassClick = () => {
    navigate("/glass-choice");
  };

  const handleTypeClick = () => {
    navigate("/type-choice");
  };

  const handleToppingClick = () => {
    navigate("/topping-choice");
  };

  const handleSweetLevelClick = () => {
    navigate("/sweet-level-choice");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">ตัวเลือกรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      {/* Options Section */}
      <div className="w-full ml-16 mt-8">
        <div className="grid grid-cols-4 gap-8">
          {/* glass size */}
          <div className="flex flex-col items-center">
            <CiGlass
              className="text-[#D4B28C] text-6xl mb-2"
              onClick={handleGlassClick}
            />
            <p className="text-black font-semibold">ขนาดแก้ว</p>
          </div>

          {/* sweet level */}
          <div className="flex flex-col items-center">
            <CiBoxList
              className="text-[#D4B28C] text-6xl mb-2"
              onClick={handleSweetLevelClick}
            />
            <p className="text-black font-semibold">ความหวาน</p>
          </div>

          {/* topping */}
          <div className="flex flex-col items-center">
            <CgMenuGridO
              className="text-[#D4B28C] text-6xl mb-2"
              onClick={handleToppingClick}
            />
            <p className="text-black font-semibold">ท็อปปิ้ง</p>
          </div>

          {/* type */}
          <div className="flex flex-col items-center">
            <LiaMugHotSolid
              className="text-[#D4B28C] text-6xl mb-2"
              onClick={handleTypeClick}
            />
            <p className="text-black font-semibold">ชนิด</p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="flex mt-24 w-full space-x-8 justify-between">
        <button
          className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
          onClick={handleBack}
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
};

export default ChoiceOptions;
