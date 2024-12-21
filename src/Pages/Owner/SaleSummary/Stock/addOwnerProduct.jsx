import React, { useState } from "react";

import SideBar from "../../../../Components/sideBar";
import { IoIosArrowDown } from "react-icons/io";

const AddOwnerProduct = () => {
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const categoryOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <SideBar menuTab={"stock"} />
      <h1 className="font-bold text-xl">คลังสินค้า</h1>
      <h1 className="font-bold">เพิ่มรายการสินค้าใหม่</h1>
      <div className="px-10">
        {/* upload รูปภาพสินค้า */}
        <div className="py-2">
          <span className="font-bold">รูปภาพสินค้า</span>
        </div>
        <div className="w-full flex justify-center">
          <label className="w-full border-2 border-dashed border-[#D4B28C] rounded-lg flex flex-col items-center justify-center cursor-pointer">
            {productImage ? (
              <img
                src={productImage}
                alt="Uploaded"
                className="h-80 object-contain"
              />
            ) : (
              <>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
                  alt="Upload Icon"
                  className="w-40 h-40"
                />
              </>
            )}
            <p className="text-center text-brown-500 mb-2 mt-2">
              <span className="text-[#D4B28C] font-bold">คลิก</span>
              เพื่ออัปโหลดรูปภาพ
            </p>
            <p className="text-gray-400 text-sm">
              ชนิดไฟล์ PNG, JPG, JPEG, WEBP
            </p>

            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleImageUpload}
            />
          </label>
        </div>
        <div className="flex">
          {/* ชื่อสินค้า */}
          <div className="w-1/2 pr-16">
            <div className="py-2">
              <span className="font-bold">ชื่อสินค้า</span>
            </div>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="กรอกชื่อสินค้า"
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
          {/* หมวดหมู่ */}
          <div className="w-1/2 pr-16">
            <div className="py-2">
              <span className="font-bold">หมวดหมู่</span>
            </div>
            <div className="relative w-full">
              {/* Dropdown Trigger */}
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400 cursor-pointer ${
                  isOpen ? "ring-2 ring-brown-400" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  {selectedOption || "เลือกตัวเลือก"}
                  <IoIosArrowDown className="" size={16} />
                </div>
              </div>

              {/* Dropdown categoryOptions */}
              {isOpen && (
                <div className="absolute mt-2 w-full bg-white border border-[#D4B28C] rounded-lg shadow-lg z-10">
                  {categoryOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelect(option)}
                      className="p-3 hover:bg-[#F3E5D8] cursor-pointer text-gray-600"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOwnerProduct;
