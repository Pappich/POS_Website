import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const categories = [
    "ยอดฮิต",
    "กาแฟ",
    "สว่างคาตา",
    "จับคู่อิ่มคุ้ม",
    "โซดาสุดซ่า",
    "นมอุ่นๆก่อนนอน",
    "ชาเขียว",
    "เมนูร้อนๆ",
  ];
  const [activeCategory, setActiveCategory] = useState("ยอดฮิต");

  const products = [
    {
      name: "ชาเขียว",
      description: "ชาเขียวแก้วจากญี่ปุ่น",
    },
    {
      name: "โกโก้",
      description: "ผงโกโก้แก้วคาเบลเยียม",
    },
    {
      name: "ดาร์กช็อกโกแลต",
      description: "ช็อกโกแลตแก้วคาเบลเยียม",
    },
    {
      name: "ลาเต้",
      description: "เมล็ดกาแฟคั่วจากทางร้าน",
    },
    {
      name: "สตอเบอรี่",
      description: "สตอเบอรี่แก้วจากฟาร์ม",
    },
    {
      name: "สตอเบอรี่",
      description: "สตอเบอรี่แก้วจากฟาร์ม",
    },
    {
      name: "สตอเบอรี่",
      description: "สตอเบอรี่แก้วจากฟาร์ม",
    },
  ];

  const handleMenuClick = (product) => {
    navigate("/menu-detail", {
      // CHANGE TO SEND MENU IN EACH GROUP
      // EXAMPLE
    });
  };

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white">
      {/* LOGO */}
      <h1 className="text-3xl font-bold mb-4">SHOP NAME</h1>

      <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 ml-2 space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full border border-[#D4B28C] ${
              activeCategory === category
                ? "bg-[#D4B28C] text-white"
                : "border-[#D4B28C] text-[#D4B28C]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 gap-6">
        {products.map((product, index) => (
          <button
            className={"px-6 py-3 rounded-md border border-[#D4B28C] ml-2"}
            key={index}
            onClick={() => handleMenuClick(product)}
          >
            <img
              class="flex items-center rounded-md border border-[#AD8B73] bg-[image-class] h-[150px] w-[250px] mb-2"
              src="https://s359.kapook.com/r/600/auto/pagebuilder/7f2adf98-9b23-46db-814c-ff23d31554e5.jpg"
              alt="image description"
            />
            <div className="font-bold">{product.name}</div>
            <div>{product.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
