import React, { useState } from "react";
import SideBar from "../../../../Components/sideBar";
import AddCategoryButton from "../../../../Components/addCategoryButton";
import { LuInfo } from "react-icons/lu";

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
  const [selectedTag, setSelectedTag] = useState("ทั้งหมด");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
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
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <LuInfo color="white" size={16} />
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
              <LuInfo color="white" size={16} />
            </div>
            <div className="ml-3">
              <p>สินค้าที่ใกล้จะหมดอายุ วันที่ 16 มกราคม พ.ศ. 2567</p>
              <p className="font-bold">ไข่มุกแบบต้ม</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stock;
