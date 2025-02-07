import React from "react";
import { FaBahtSign } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
const IncomeOrderCancel = () => {
  return (
    <div>
      <div className="flex justify-between">
        {/* รายรับทั้งหมด */}
        <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
            <FaBahtSign color="white" size={16} />
          </div>
          <div className="ml-3">
            <p>รายรับทั้งหมด</p>
            <p className="font-bold">3,860.00 ฿</p>
          </div>
        </div>

        {/* ยอดออเดอร์ทั้งหมด */}
        <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
            <MdOutlineShoppingCart color="white" size={16} />
          </div>
          <div className="ml-3">
            <p>ยอดออเดอร์ทั้งหมด</p>
            <p className="font-bold">3674 ออเดอร์</p>
          </div>
        </div>

        {/* จำนวนออเดอร์ที่ถูกยกเลิก */}
        <div className="flex block max-w-sm py-2 px-4 w-full bg-white border rounded-lg ">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
            <MdOutlineRemoveShoppingCart color="white" size={16} />
          </div>
          <div className="ml-3">
            <p>จำนวนออเดอร์ที่ถูกยกเลิก</p>
            <p className="font-bold">5 ออเดอร์</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeOrderCancel;
