import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const StockList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const menuItems = {
    สว่างคาตา: ["กาแฟดำ", "ชาเขียว"],
    เครื่องดื่มอุ่นๆ: ["โกโก้", "นมอุ่น"],
    จับคู่อิ่มท้อง: ["ชาไทย", "ขนมปังปิ้ง"],
    โซดาสุดซ่า: ["เลมอนโซดา", "สตรอเบอรี่โซดา"],
    เรื่องนมๆๆ: ["นมชมพู", "นมเย็น"],
    เรื่องนมๆๆๆ: ["นมชมพู", "นมเย็น"],
    เรื่องนมๆๆๆๆ: ["นมชมพู", "นมเย็น"],
    เรื่องนมๆๆๆๆๆ: ["นมชมพู", "นมเย็น"],
    เรื่องนมๆๆๆๆๆๆ: ["นมชมพู", "นมเย็น"],
  };

  const categoryItems = Object.keys(menuItems);
  const MenuItems = Object.values(menuItems).flat();

  const filteredItems =
    selectedCategory && menuItems[selectedCategory]
      ? menuItems[selectedCategory].filter((item) =>
          item.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : MenuItems;

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleBack = () => {
    navigate("/main-menu");
  };

  const handleEditClick = (product) => {
    navigate("/add-stock");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">รายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] mx-auto mt-6"></div>
      </div>

      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">เมนูทั้งหมด</h1>
      </div>

      <div className="w-full mb-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4B28C]" />
          <input
            type="text"
            placeholder="ค้นหาด้วยชื่อสินค้า..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-[#D4B28C] rounded-full py-3 pl-10 pr-4 text-gray-700 outline-none"
          />
        </div>
      </div>

      <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 mb-6">
        {categoryItems.map((categoryItem, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(categoryItem)}
            className={`px-6 py-3 rounded-full border border-[#DD9F52] font-bold ml-2 ${
              selectedCategory === categoryItem
                ? "bg-[#FFA726] text-white"
                : "bg-white text-[#DD9F52]"
            }`}
          >
            {categoryItem}
          </button>
        ))}
      </div>

      <div className="w-full">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <div key={index} className="w-full mb-4">
              <div className="flex justify-between items-center">
                <p className="text-lg">{item}</p>
                <button
                  onClick={() => handleEditClick(item)}
                  className="text-[#D4B28C] font-bold"
                >
                  แก้ไข
                </button>
              </div>
              <div className="w-full h-px bg-gray-300 mt-2"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">ไม่พบสินค้า</p>
        )}
      </div>

      <div className="flex mt-10 w-full justify-start">
        <button
          onClick={handleBack}
          className="px-6 py-3 w-64 rounded-full border border-[#D4B28C] text-[#D4B28C] bg-transparent font-bold transition duration-300 hover:bg-[#D4B28C] hover:text-white"
        >
          เสร็จสิ้น
        </button>
      </div>
    </div>
  );
};

export default StockList;
