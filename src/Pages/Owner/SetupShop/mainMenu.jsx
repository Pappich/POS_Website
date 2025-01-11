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
      // disabled: !enabledSteps.includes("product"),
    },
    {
      id: "group",
      label: "เพิ่มกลุ่มรายการสินค้า",
      icon: <FaList size={50} />,
      // disabled: !enabledSteps.includes("group"),
    },
    {
      id: "choice",
      label: "เพิ่มตัวเลือก",
      icon: <FaThLarge size={50} />,
      // disabled: !enabledSteps.includes("options"),
    },
    {
      id: "stock",
      label: "เพิ่มการตัดคลังสินค้า",
      icon: <FaBox size={50} />,
      // disabled: !enabledSteps.includes("stock"),
    },
  ];

  // const handleClick = (id) => {
  //   if (enabledSteps.includes(id)) {
  //     if (id === "product") {
  //       // unlockNextStep("group");
  //       navigate("/product-list");
  //     } else if (id === "group") {
  //       // unlockNextStep("options");
  //       navigate("/group-list");
  //     } else if (id === "options") {
  //       // unlockNextStep("stock");
  //       navigate("/options-list");
  //     } else if (id === "stock") {
  //       navigate("/stock-list");
  //     }
  //   }
  // };

  const handleClick = (id) => {
    if (id === "product") {
      navigate("/product-list");
    } else if (id === "group") {
      navigate("/group-list");
    } else if (id === "choice") {
      navigate("/choice-list");
    } else if (id === "stock") {
      navigate("/stock-list");
    }
  };

  // ENABLE NEXT STEP
  // const unlockNextStep = (nextStepId) => {
  //   if (!enabledSteps.includes(nextStepId)) {
  //     setEnabledSteps((prevSteps) => [...prevSteps, nextStepId]);
  //   }
  // };

  const handleBack = () => {
    navigate("/guideline");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">ตัวเลือกรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="w-full ml-16 mt-8">
        <div className="grid grid-cols-4 gap-8">
          {icons.map(({ id, label, icon, disabled }) => (
            <div
              key={id}
              className={`flex flex-col items-center cursor-pointer transition-all ${
                disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-[#D4B28C] hover:text-orange-500"
              }`}
              onClick={() => handleClick(id)}
            >
              <div
                className={`p-3 transition-colors duration-300 mb-2 ${
                  disabled
                    ? "text-gray-300"
                    : "text-[#D4B28C] hover:text-orange-500"
                }`}
              >
                {icon}
              </div>
              <p className={`mt-2 text-lg text-black`}>{label}</p>
            </div>
          ))}
        </div>
      </div>

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

export default MainMenu;
