import React, { useState } from "react";
import { FaUtensils, FaList, FaThLarge, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  const [disabledIcons, setDisabledIcons] = useState([
    "category",
    "options",
    "inventory",
  ]);

  const icons = [
    {
      id: "add-product",
      label: "เพิ่มรายการสินค้า",
      icon: <FaUtensils size={50} />,
      disabled: false,
    },
    {
      id: "category",
      label: "เพิ่มหมวดหมู่",
      icon: <FaList size={50} />,
      disabled: true,
    },
    {
      id: "options",
      label: "เพิ่มตัวเลือก",
      icon: <FaThLarge size={50} />,
      disabled: true,
    },
    {
      id: "inventory",
      label: "เพิ่มการตัดคลังสินค้า",
      icon: <FaBox size={50} />,
      disabled: true,
    },
  ];

  const handleClick = (id) => {
    if (!disabledIcons.includes(id)) {
      if (id === "add-product") {
        navigate("/product-list");
      } else {
        alert(`click menu ${id}`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-6">
        จัดการเมนู / สินค้า{" "}
        <span className="text-orange-400 text-sm ml-1">ℹ️</span>
      </h1>

      <div className="flex justify-center space-x-8">
        {icons.map(({ id, label, icon, disabled }) => (
          <div
            key={id}
            className={`flex flex-col items-center cursor-pointer ${
              disabled
                ? "text-gray-300 cursor-not-allowed"
                : "text-orange-500 hover:text-orange-700"
            }`}
            onClick={() => handleClick(id)}
          >
            <div
              className={`p-3 rounded-lg mb-2 ${
                disabled ? "bg-gray-300" : "bg-orange-100 hover:bg-orange-200"
              }`}
            >
              {icon}
            </div>
            <p
              className={`mt-2 text-lg ${
                disabled ? "text-gray-300" : "text-black"
              }`}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainMenu;
