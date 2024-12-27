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
  const [quantity, setQuantity] = useState(1);

  const handleBack = () => navigate("/menu");
  const handleAddToCart = () => navigate("/order-summary");

  const handleSelection = (setter, value, current) => {
    setter(current === value ? null : value);
  };

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const OptionGroup = ({ title, options, selected, onSelect }) => (
    <div>
      <div className="font-bold mb-2">{title}</div>
      <div className="flex flex-wrap gap-4 mb-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            aria-selected={selected === option}
            className={`px-6 py-3 flex-1 max-w-[250px] text-center rounded-full border border-[#D4B28C] font-bold ${
              selected === option
                ? "bg-[#D4B28C] text-white"
                : "bg-white text-[#D4B28C]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white">
      {/* Back button and cart */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBack} className="text-[#DD9F52] text-4xl">
          <IoChevronBack />
        </button>
        <button onClick={handleAddToCart} className="text-[#DD9F52] text-4xl">
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
      <div className="mt-4">
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
          options={["ไข่มุก + 10 ", "วุ้นมะพร้าว + 15", "บุก + 10"]}
          selected={selectedAddOn}
          onSelect={(option) =>
            handleSelection(setSelectedAddOn, option, selectedAddOn)
          }
        />
      </div>

      <div className="mt-4 flex flex-col items-center space-y-4">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-bold">จำนวน</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDelete}
              className="w-10 h-10 font-bold text-white bg-[#DC9494] rounded-full flex items-center justify-center"
            >
              -
            </button>
            <div className="w-20 h-10 font-bold text-center border border-[#AD8B73] rounded-full flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={handleAdd}
              className="w-10 h-10 text-white bg-[#A2DC94] rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-bold">ราคา</span>
          <div className="w-40 text-center border border-[#AD8B73] text-black font-bold text-xl px-6 py-2 rounded-full">
            {69} ฿
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#D4B28C] text-white rounded-full font-semibold"
        >
          + เพิ่มเข้าตระกร้า
        </button>
      </div>
    </div>
  );
};

export default MenuDetail;
