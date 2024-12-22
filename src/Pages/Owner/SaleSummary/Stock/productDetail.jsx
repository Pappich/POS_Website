import React, { useState } from "react";
import SideBar from "../../../../Components/sideBar";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

const ProductDetail = () => {
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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSave = () => {
    if (
      !productImage ||
      !productName.trim() ||
      !productAmount.trim() ||
      !categoryOption ||
      !volumeUnit
    ) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/stock");
  };

  const handleBack = () => {
    navigate("/stock");
  };

  return (
    <div>
      <SideBar menuTab={"stock"} />
      <h1 className="font-bold text-xl">คลังสินค้า</h1>
      <h1 className="font-bold">รายการวัตถุดิบ</h1>
      <div className="px-10">
        {/* Upload Product Image */}
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
              <img
                src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
                alt="Upload Icon"
                className="w-40 h-40"
              />
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
        {/* Product Details */}
        <div className="grid grid-cols-2 gap-20">
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
          <div className="w-full">
            <div className="py-2">
              <span className="font-bold">หมวดหมู่</span>
            </div>
            <div className="relative">
              <div
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                className="border border-[#D4B28C] rounded-full p-3 text-gray-600 cursor-pointer flex items-center justify-between"
              >
                {categoryOption || "เลือกตัวเลือก"}
                <IoIosArrowDown />
              </div>
              {isCategoryDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white border border-[#D4B28C] rounded-lg shadow-lg">
                  {categoryOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setCategoryOption(option);
                        setIsCategoryDropdownOpen(false);
                      }}
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
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 text-center">
              <AiOutlineCheckCircle
                size={60}
                className="text-green-500 mx-auto"
              />
              <h2 className="font-bold text-lg my-4">บันทึกเสร็จสิ้น</h2>
              <button
                className="px-4 py-2 bg-[#D4B28C] text-white rounded-full font-bold"
                onClick={closeModal}
              >
                ปิด
              </button>
            </div>
          </div>
        )}
        {/* Save and Back Buttons */}
        <div className="flex mt-8 justify-between">
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

export default ProductDetail;
