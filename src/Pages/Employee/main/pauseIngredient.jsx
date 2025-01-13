import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const PauseIngredient = () => {
  // SELECT MENU
  const menus = [
    "ไข่มุก",
    "วุ้นมะพร้าว",
    "วิปครีม",
    "เยลลี่",
    "ไซรัป",
    "ไข่มุก",
    "วุ้นมะพร้าว",
    "วิปครีม",
    "เยลลี่",
    "ไซรัป",
    "ไข่มุก",
    "วุ้นมะพร้าว",
    "วิปครีม",
    "เยลลี่",
    "ไซรัป",
    "ไข่มุก",
    "วุ้นมะพร้าว",
    "วิปครีม",
    "เยลลี่",
  ];
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const filteredGroups = menus.filter((menu) =>
    menu.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleBackButton = () => {
    navigate("/pause-section");
  };
  const handleSaveButton = () => {
    navigate("/pause-section");
  };
  const handleSelectMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };
  return (
    <>
      <div className="w-full flex justify-center text-lg font-bold">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">วัตถุดิบที่ต้องการพัก</h1>
          <div className="w-20 h-1 bg-[#D4B28C]"></div>
        </div>
        <span className="text-[#DD9F52] ml-2"> {groupName}</span>
      </div>

      <div className="w-full flex justify-start text-lg mb-8">
        <div className="relative flex items-center w-full">
          <FaSearch
            style={{ color: "#D4B28C" }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="ค้นหาด้วยชื่อกลุ่ม..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-[#D4B28C] rounded-full p-3 pl-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
          />
        </div>
      </div>
      <div className="w-full ml-16">
        <label
          htmlFor="productDetails"
          className="text-lg w-full text-start font-bold"
        >
          เมนูทั้งหมด
        </label>
        <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
          {filteredGroups.map((menu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMenus.includes(menu)}
                onChange={() => handleSelectMenu(menu)}
                className="form-checkbox h-5 w-5 accent-[#DD9F52]"
              />
              <span>{menu}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleBackButton}
          className="px-6 py-3 w-[250px] rounded-full border text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
        >
          ย้อนกลับ
        </button>
        <button
          onClick={handleSaveButton}
          className="px-6 py-3 w-[250px] rounded-full bg-[#D4B28C] text-white hover:bg-[#cda777] transition-colors font-bold"
        >
          บันทึก
        </button>
      </div>
    </>
  );
};

export default PauseIngredient;
