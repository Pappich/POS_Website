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
  const [stockData, setStockData] = useState([
    {
      id: 1,
      name: "ชาสตอเบอร์รี่",
      choice: "หวานน้อย",
      volume: "25 ML",
      group: "ชาผลไม้",
    },
    {
      id: 2,
      name: "ชาสตอเบอร์รี่",
      choice: "หวานปานกลาง",
      volume: "30 ML",
      group: "ชาผลไม้",
    },
    {
      id: 3,
      name: "ชาสตอเบอร์รี่",
      choice: "หวานมาก",
      volume: "40 ML",
      group: "ชาผลไม้",
    },
    {
      id: 4,
      name: "สตอเบอร์รี่โซดา",
      choice: "หวานน้อย",
      volume: "30 ML",
      group: "โซดาสุดซ่า",
    },
    {
      id: 5,
      name: "สตอเบอร์รี่โซดา",
      choice: "หวานปานกลาง",
      volume: "35 ML",
      group: "โซดาสุดซ่า",
    },
    {
      id: 6,
      name: "สตอเบอร์รี่โซดา",
      choice: "หวานมาก",
      volume: "45 ML",
      group: "โซดาสุดซ่า",
    },
    {
      id: 7,
      name: "ชานมสตอเบอร์รี่",
      choice: "หวานน้อย",
      volume: "20 ML",
      group: "ชานม",
    },
    {
      id: 8,
      name: "ชานมสตอเบอร์รี่",
      choice: "หวานปานกลาง",
      volume: "25 ML",
      group: "ชานม",
    },
    {
      id: 9,
      name: "ชานมสตอเบอร์รี่",
      choice: "หวานมาก",
      volume: "30 ML",
      group: "ชานม",
    },
  ]);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
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
              placeholder="น้ำสตรอว์เบอร์รี่ เข้มข้น สูตร 2 "
              className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <div className="py-2">
              <span className="font-bold">จำนวน</span>
            </div>
            <input
              type="text"
              value={productAmount}
              onChange={(e) => setProductAmount(e.target.value)}
              placeholder="1 ขวด"
              className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            <div className="py-2">
              <span className="font-bold">การตัดคลังสินค้า</span>
            </div>
            <div className="flex items-center">
              <div className="text-nowrap pr-5">ปริมาณสุทธิต่อหน่วย</div>
              <input
                type="text"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
                placeholder="760 มิลลิลิตร"
                className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
            </div>
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
                className="border bg-[#ECECEC] border-[#D4B28C] rounded-full p-3 text-gray-600 cursor-pointer flex items-center justify-between"
              >
                {categoryOption || "น้ำชง"}
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
                      className="p-3  hover:bg-[#F3E5D8] cursor-pointer text-gray-600"
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

        <div className="py-2">
          <span className="font-bold">อัตราส่วนในแต่ละเมนู</span>
        </div>
        {/* Table Section */}
        <div className="overflow-x-auto border rounded-lg p-5">
          <table className="border-collapse table-auto w-full">
            <thead>
              <tr>
                <th className="py-2 pr-5 text-center border-b border-[#000000]">
                  ลำดับที่
                </th>
                <th className="py-2 text-left border-b border-[#000000]">
                  รายการสินค้า
                </th>
                <th className="px-1 py-2 border-b border-[#000000]">
                  ตัวเลือก
                </th>
                <th className="pl-10 py-2 border-b border-[#000000]">
                  อัตราส่วน
                </th>
                <th className="pl-16 pr-5 py-2 border-b border-[#000000]">
                  กลุ่ม
                </th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item) => (
                <tr key={item.id}>
                  <td className="pr-5 text-center border-b border-[#F1F4F7]">
                    {item.id}
                  </td>
                  <td className="py-2 break-words border-b border-[#F1F4F7]">
                    {item.name}
                  </td>
                  <td className="py-2 text-center border-b border-[#F1F4F7]">
                    {item.choice}
                  </td>
                  <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                    {item.volume}
                  </td>
                  <td className="py-2 pl-9 text-center border-b border-[#F1F4F7]">
                    <div className="border border-[#70AB8E] rounded-full text-[#70AB8E] inline-flex items-center justify-center px-2">
                      {item.group}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-8 justify-between">
          <button
            className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
