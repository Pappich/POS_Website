import React, { useState } from "react";
import { FaUtensils, FaList, FaThLarge, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();

  const [enabledSteps, setEnabledSteps] = useState(["product"]);

  const icons = [
    {
      id: "product",
      label: "เพิ่มรายการสินค้า",
      icon: <FaUtensils size={50} />,
      disabled: !enabledSteps.includes("product"),
    },
    {
      id: "group",
      label: "เพิ่มกลุ่มรายการสินค้า",
      icon: <FaList size={50} />,
      disabled: !enabledSteps.includes("group"),
    },
    {
      id: "options",
      label: "เพิ่มตัวเลือก",
      icon: <FaThLarge size={50} />,
      disabled: !enabledSteps.includes("options"),
    },
    {
      id: "stock",
      label: "เพิ่มการตัดคลังสินค้า",
      icon: <FaBox size={50} />,
      disabled: !enabledSteps.includes("stock"),
    },
  ];

  const handleClick = (id) => {
    if (enabledSteps.includes(id)) {
      if (id === "product") {
        unlockNextStep("group");
        navigate("/product-list");
      } else if (id === "group") {
        unlockNextStep("options");
        navigate("/group-list");
      } else if (id === "options") {
        unlockNextStep("stock");
        navigate("/options-list");
      } else if (id === "stock") {
        navigate("/stock-list");
      }
    }
  };

  // ENABLE NEXT STEP
  const unlockNextStep = (nextStepId) => {
    if (!enabledSteps.includes(nextStepId)) {
      setEnabledSteps((prevSteps) => [...prevSteps, nextStepId]);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-xl font-bold mb-8">
        จัดการเมนู / สินค้า{" "}
        <span className="text-orange-400 text-sm ml-1">ℹ️</span>
      </h1>

      <div className="w-full flex justify-center space-x-24">
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
