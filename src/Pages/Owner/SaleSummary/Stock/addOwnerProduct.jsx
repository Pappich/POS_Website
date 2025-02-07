import React, { useState } from "react";
import SideBar from "../../../../Components/sideBar";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai"; // Import success icon
const AddOwnerProduct = () => {
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [unitOption, setUnitOption] = useState("");
  const [categoryOption, setCategoryOption] = useState("");
  const [netVolume, setNetVolume] = useState("");
  const [volumeUnit, setVolumeUnit] = useState("");

  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isVolumeUnitDropdownOpen, setIsVolumeUnitDropdownOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const categoryOptions = [
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 5",
  ];
  const unitOptions = ["Unit 1", "Unit 2", "Unit 3", "Unit 4"];
  const volumeUnitOptions = ["ml", "L", "g", "kg"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const handleSelectUnit = (option) => {
    setUnitOption(option);
    setIsUnitDropdownOpen(false);
  };

  const handleSelectCategory = (option) => {
    setCategoryOption(option);
    setIsCategoryDropdownOpen(false);
  };

  const handleSelectVolumeUnit = (option) => {
    setVolumeUnit(option);
    setIsVolumeUnitDropdownOpen(false);
  };

  const handleSave = () => {
    setIsModalOpen(true); // Show modal on save
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/stock"); // Navigate after closing modal
  };

  const handleBack = () => {
    navigate("/stock");
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
              <span className="text-[#D4B28C] font-bold">คลิก</span>{" "}
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
        <div className="grid grid-cols-2 gap-20">
          {/* ชื่อสินค้า */}
          <div className="w-full">
            <div className="py-2">
              <span className="font-bold">ชื่อสินค้า</span>
            </div>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="กรอกชื่อสินค้า"
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <div className="grid grid-cols-7 gap-4">
              {/* จำนวน */}
              <div className="col-span-4">
                <div className="py-2">
                  <span className="font-bold">จำนวน</span>
                </div>
                <input
                  type="text"
                  value={productAmount}
                  onChange={(e) => setProductAmount(e.target.value)}
                  placeholder="กรอกจำนวนของสินค้า"
                  className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                />
              </div>
              {/* หน่วย */}
              <div className="col-span-3">
                <div className="py-2">
                  <span className="font-bold">หน่วย</span>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
                    className={`border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400 cursor-pointer ${
                      isUnitDropdownOpen ? "ring-2 ring-brown-400" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {unitOption || "เลือกหน่วย"}
                      <IoIosArrowDown size={16} />
                    </div>
                  </div>

                  {isUnitDropdownOpen && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D4B28C] rounded-lg shadow-lg z-10">
                      {unitOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectUnit(option)}
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
          {/* หมวดหมู่ */}
          <div className="w-full">
            <div className="py-2">
              <span className="font-bold">หมวดหมู่</span>
            </div>
            <div className="relative w-full">
              <div
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                className={`border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400 cursor-pointer ${
                  isCategoryDropdownOpen ? "ring-2 ring-brown-400" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  {categoryOption || "เลือกตัวเลือก"}
                  <IoIosArrowDown size={16} />
                </div>
              </div>

              {isCategoryDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border border-[#D4B28C] rounded-lg shadow-lg z-10">
                  {categoryOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectCategory(option)}
                      className="p-3 hover:bg-[#F3E5D8] cursor-pointer text-gray-600"
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-cols-7 gap-4">
              {/* ปริมาตรสุทธิต่อหน่วย */}
              <div className="col-span-4">
                <div className="py-2">
                  <span className="font-bold">ปริมาตรสุทธิต่อหน่วย</span>
                </div>
                <input
                  type="text"
                  value={netVolume}
                  onChange={(e) => setNetVolume(e.target.value)}
                  placeholder="กรอกปริมาตรสุทธิ"
                  className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                />
              </div>
              {/* หน่วยปริมาตร */}
              <div className="col-span-3">
                <div className="py-2">
                  <span className="font-bold">หน่วยปริมาตร</span>
                </div>
                <div className="relative w-full">
                  <div
                    onClick={() =>
                      setIsVolumeUnitDropdownOpen(!isVolumeUnitDropdownOpen)
                    }
                    className={`border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400 cursor-pointer ${
                      isVolumeUnitDropdownOpen ? "ring-2 ring-brown-400" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {volumeUnit || "เลือกหน่วย"}
                      <IoIosArrowDown size={16} />
                    </div>
                  </div>

                  {isVolumeUnitDropdownOpen && (
                    <div className="absolute mt-2 w-full bg-white border border-[#D4B28C] rounded-lg shadow-lg z-10">
                      {volumeUnitOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleSelectVolumeUnit(option)}
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
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-[400px] text-center">
                <AiOutlineCheckCircle
                  size={60}
                  className="text-green-500 mx-auto"
                />
                <h2 className="font-bold text-lg my-4">บันทึกเสร็จสิ้น</h2>
                <button
                  className="px-4 py-2 bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
                  onClick={closeModal}
                >
                  ปิด
                </button>
              </div>
            </div>
          )}
        </div>
        {/* Save and Back buttons */}
        <div className="flex mt-8 w-full justify-between">
          <button
            className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
          <button
            className="px-6 py-3 w-[250px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
            onClick={handleSave}
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOwnerProduct;
