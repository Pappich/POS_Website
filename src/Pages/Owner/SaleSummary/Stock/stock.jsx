import React, { useState } from "react";
import SideBar from "../../../../Components/sideBar";
import AddCategoryButton from "../../../../Components/addCategoryButton";
import { LuInfo } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi"; // Import magnifier icon
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const tags = [
  "ทั้งหมด",
  "อุปกรณ์",
  "วัตถุดิบ",
  "ท็อปปิ้ง",
  "ส่วนเสริม",
  "ภาชนะ",
  "น้ำซุป",
  "เครื่องครัว",
  "เครื่องเคียง",
];

const Stock = () => {
  const navigate = useNavigate();
  const [selectedTag, setSelectedTag] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddOwnerProduct = () => {
    navigate("/add-owner-product");
  };

  return (
    <div>
      <SideBar menuTab={"stock"} />
      <h1 className="font-bold text-xl">คลังสินค้า</h1>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <span className="font-bold">หมวดหมู่</span>
          <span className="pl-2 text-[#DD9F52]">
            <LuInfo size={18} />
          </span>
        </span>
        <AddCategoryButton />
      </div>
      {/* Tags Section */}
      <div className="my-3">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide whitespace-nowrap">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-1  ${
                selectedTag === tag
                  ? "bg-[#C6B399] text-white rounded-full border"
                  : "bg-white border-[#C6B399]"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="flex">
          {/* รายรับทั้งหมด */}
          <div className="flex py-2 px-4 w-3/4 mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DC9494]">
              <div className="pb-1">
                <IoWarningOutline color="white" size={32} />
              </div>
            </div>
            <div className="ml-3">
              <p>สินค้าที่ใกล้จะหมด</p>
              <div className="flex">
                <p className="font-bold">แก้วขนาด M</p>
                <p className="pl-1">จำนวน 16 ใบ</p>
              </div>
            </div>
          </div>

          {/* ยอดออร์เดอร์ทั้งหมด */}
          <div className="flex py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <IoMdTime color="white" size={32} />
            </div>
            <div className="ml-3">
              <p>สินค้าที่ใกล้จะหมดอายุ วันที่ 16 มกราคม พ.ศ. 2567</p>
              <p className="font-bold">ไข่มุกแบบต้ม</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="my-4 relative flex">
          <div className="mr-5 flex items-center bg-white border-[#C6B399] border rounded-full px-4 py-1 w-full">
            <FiSearch className="text-[#C6B399] mr-2" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="ค้นหาสินค้า..."
              className="w-full focus:outline-none"
            />
          </div>
          {/* เพิมรายการสินค้า */}
          <button
            type="button"
            className="flex justify-center items-center w-1/4 text-white border border-[#C6B399] bg-[#C6B399] hover:text-[#C6B399] hover:bg-white hover:border hover:border-[#C6B399] focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1"
            onClick={handleAddOwnerProduct}
          >
            <div className="flex items-center whitespace-nowrap">
              <span className="pl-1">
                <FaPlus size={12} />
              </span>
              <span className="pl-2">เพิ่มรายการสินค้า</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stock;
