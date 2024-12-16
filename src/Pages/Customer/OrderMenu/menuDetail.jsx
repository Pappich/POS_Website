import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";

const MenuDetail = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("ร้อน");
  const [selectedSweetness, setSelectedSweetness] = useState("0%");
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedAddOn, setSelectedAddOn] = useState("ไข่มุก");

  const handleBack = () => navigate("/menu");
  const handleCart = () => navigate("/cart");

  const handleSelection = (setter, value, current) => {
    setter(current === value ? null : value);
  };

  const OptionGroup = ({ title, options, selected, onSelect }) => (
    <div>
      <div className="font-bold mb-2">{title}</div>
      <div className="flex flex-wrap gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            aria-selected={selected === option}
            className={`px-6 py-3 flex-1 max-w-[250px] text-center rounded-full border border-[#D4B28C] font-bold ${
              selected === option
                ? "bg-[#D4B28C] text-white"
                : "bg-white text-[#D4B28C"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white p-6">
      {/* Back button and cart */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={handleBack}
          aria-label="Go back to menu"
          className="text-[#DD9F52] text-4xl"
        >
          <IoChevronBack />
        </button>
        <button
          onClick={handleCart}
          aria-label="View cart"
          className="text-[#DD9F52] text-4xl"
        >
          <PiShoppingCart />
        </button>
      </div>

      {/* Product  Detail */}
      <div className="flex justify-center mb-6">
        <img
          src="https://s359.kapook.com/r/600/auto/pagebuilder/7f2adf98-9b23-46db-814c-ff23d31554e5.jpg"
          alt="ชาเขียว"
          className="rounded-md border border-[#AD8B73] h-[250px] w-[350px]"
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-yellow-600">ชาเขียว</h1>
        <p className="text-gray-500">ชาเขียวแท้จากญี่ปุ่น</p>
      </div>

      {/* Options */}
      <div className="space-y-6">
        {/* Type */}
        <OptionGroup
          title="ชนิดเครื่องดื่ม"
          options={["ร้อน", "เย็น", "ปั่น"]}
          selected={selectedType}
          onSelect={(option) =>
            handleSelection(setSelectedType, option, selectedType)
          }
        />

        {/* Sweetness */}
        <OptionGroup
          title="ระดับความหวาน"
          options={["0%", "25%", "50%", "75%"]}
          selected={selectedSweetness}
          onSelect={(option) =>
            handleSelection(setSelectedSweetness, option, selectedSweetness)
          }
        />

        {/* Size */}
        <OptionGroup
          title="ขนาด"
          options={["S", "M", "L"]}
          selected={selectedSize}
          onSelect={(option) =>
            handleSelection(setSelectedSize, option, selectedSize)
          }
        />

        {/* Add-ons */}
        <OptionGroup
          title="ตัวเลือก"
          options={["ไข่มุก", "วุ้นมะพร้าว", "บุก"]}
          selected={selectedAddOn}
          onSelect={(option) =>
            handleSelection(setSelectedAddOn, option, selectedAddOn)
          }
        />
      </div>
    </div>
  );
};

export default MenuDetail;
