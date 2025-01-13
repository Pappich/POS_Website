import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const PauseIngredient = () => {
  const menus = [
    "วุ้นมะพร้าว",
    "เยลลี่",
    "ไซรัป",
    "โกโก้1",
    "ไข่มุก1",
    "วุ้นมะพร้าว1",
    "วิปครีม1",
    "เยลลี่1",
    "ไซรัป1",
    "โกโก้2",
    "ไข่มุก2",
    "วุ้นมะพร้าว2",
    "วิปครีม2",
    "เยลลี่2",
    "ไซรัป2",
    "โกโก้3",
    "ไข่มุก3",
    "วุ้นมะพร้าว3",
    "วิปครีม3",
    "เยลลี่3",
    "ไซรัป3",
    "โกโก้4",
  ];

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [filter, setFilter] = useState("ทั้งหมด");

  const unpausedIngredients = menus.filter(
    (menu) => !selectedMenus.includes(menu)
  );

  const getFilteredMenus = () => {
    if (filter === "ทั้งหมด") return menus;
    if (filter === "วัตถุดิบที่พัก") return selectedMenus;

    if (filter === "วัตถุดิบที่ไม่พัก") return unpausedIngredients;
    return menus;
  };

  const filteredMenus = getFilteredMenus().filter((menu) =>
    menu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleBackButton = () => navigate("/pause-section");
  const handleSaveButton = () => navigate("/pause-section");
  const handleSelectMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };
  const handleFilterChange = (filterName) => {
    setFilter(filterName);
  };

  return (
    <>
      <div className="w-full flex justify-center text-lg font-bold">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">วัตถุดิบที่ต้องการพัก</h1>
          <div className="w-20 h-1 bg-[#D4B28C]"></div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mb-8">
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

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="productDetails"
            className="text-lg font-bold text-start"
          >
            เมนูทั้งหมด
          </label>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "ทั้งหมด"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("ทั้งหมด")}
          >
            ทั้งหมด
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "วัตถุดิบที่ไม่พัก"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("วัตถุดิบที่ไม่พัก")}
          >
            วัตถุดิบที่ไม่พัก
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "วัตถุดิบที่พัก"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("วัตถุดิบที่พัก")}
          >
            วัตถุดิบที่พัก
          </button>
        </div>
      </div>

      <div className="w-full ml-16">
        <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
          {filteredMenus.map((menu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={
                  filter === "วัตถุดิบที่พัก"
                    ? true
                    : selectedMenus.includes(menu)
                }
                onChange={() => handleSelectMenu(menu)}
                className="form-checkbox h-5 w-5 accent-[#DD9F52]"
              />
              <span>{menu}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 flex justify-center">
        {selectedMenus.length === 0 && filter === "วัตถุดิบที่พัก"
          ? "ไม่มีวัตถุดิบที่พักในขณะนี้"
          : null}
      </div>

      <div className="flex justify-between items-center">
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
