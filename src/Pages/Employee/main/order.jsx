import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";

const Order = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#FFFFFF] rounded-2xl shadow-md">
        {/* ข้างบน */}
        <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
          <h1 className="flex items-center justify-center font-bold border bg-[#F0ECE3] w-full rounded-full py-2 px-4 text-xl">
            คิวที่ 01
          </h1>

          <div className="flex justify-between items-center">
            <span>
              <FaRegClock className="text-[#DD9F52]" />
            </span>
            <span className="pl-1">13:00:52 น.</span>
          </div>

          <div className="flex justify-between items-center">
            <span>
              <MdOutlineTableBar className="text-[#DD9F52]" size={19} />
            </span>
            <span className="pl-1 font-bold text-[#FF5555]">ทานที่ร้าน</span>
          </div>

          <div className="flex justify-between">
            <span className="pr-1">ช่องทางการชำระเงิน</span>
            <span className="border border-[#70AB8E] text-[#70AB8E] rounded-full px-5 ">
              QR CODE
            </span>
          </div>
        </div>
        <hr className="mt-2 h-0.5 mx-4 bg-[#DD9F52] border-0" />
        {/* ข้างล่าง */}
        <div className="pl-4 pr-4 pt-2">
          <span className="font-bold flex justify-center">
            รายการคำสั่งซื้อ
          </span>
          <div className="flex justify-between font-bold">
            <div>รายการสินค้า</div>
            <div>จำนวน</div>
          </div>
          {/* ชื่อเมนู */}
          <div className="h-[200px] overflow-y-auto">
            <div className="mb-2">
              <div className="flex justify-between">
                <div>ชาสตรอเบอร์รี่</div>
                <div>1</div>
              </div>
              <span className="text-[#5B5B5B] text-sm">
                ชนิด: ปั่น | หวาน: 50% | ขนาด: S
              </span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between">
                <div>ชานมไต้หวัน</div>
                <div>2</div>
              </div>
              <span className="text-[#5B5B5B] text-sm">
                ชนิด: ปั่น | หวาน: 50% | ขนาด: S
              </span>
            </div>
          </div>
          <div class="space-y-2 w-full pt-2 pb-2">
            <button class="w-full text-[#C6B399] border border-[#C6B399]   hover:bg-[#FF5555] hover:border-[#FF5555] hover:text-white font-bold py-2 px-4 rounded-full">
              ยกเลิกออเดอร์
            </button>
            <button class="w-full bg-[#C6B399] hover:bg-[#a69781] text-white font-bold py-2 px-4 rounded-full">
              เสร็จสิ้นออเดอร์
            </button>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-cols-8 gap-2">
          <div className="py-1 col-span-3 flex justify-center items-center border border-[#C6B399] rounded-full">
            <CiCalendar className="text-[#C6B399]" size={24}/>
            <span className="pl-1 text-[#C6B399]">
              17 ธันวาคม พ.ศ. 2567
            </span>
          </div>
          <button className="py-1 col-span-4 w-full bg-[#C6B399] hover:bg-[#a69781] text-white rounded-full">
            <div className="flex justify-center items-center">
              <MdOutlinePauseCircleOutline size={24} />
              พักวัตถุดิบ / รายการสินค้า
            </div>
          </button>
          <button className="col-span-1 w-full bg-[#F0ECE3] hover:bg-[#a69781] text-white font-bold rounded-full">
            <div className="py-1 flex justify-center">
              <IoMdHome className="text-[#AD8B73]" size={24} />
            </div>
          </button>
        </div>
        <div className="flex justify-around">
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10  py-2 rounded-full font-bold">
            00 Orders
          </div>
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10 py-2 rounded-full font-bold">
            00 Process
          </div>
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10 py-2 rounded-full font-bold">
            00 Served
          </div>
        </div>
        {/* ตัวCard */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] shadow-md rounded-2xl bg-[#F6F6F6]">
              <div className="bg-[#D8D8D8] flex flex-col items-center justify-center p-4 rounded-2xl">
                <div className="font-bold">Queue 03</div>
                <div>⌛: 15 นาที</div>
              </div>
              <div className="flex items-center justify-center font-bold">
                Order Summary
              </div>
              <div className="flex justify-between px-4 pt-2 font-bold">
                <div>Menu Name</div>
                <div>Pending</div>
              </div>
              {/* ชื่อเมนู */}
              <div className="h-[200px] overflow-y-auto px-4">
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
              </div>
              <div className="space-y-2 w-full p-4">
                <button className="w-full bg-[#C6B399] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] shadow-md rounded-2xl bg-[#F6F6F6]">
              <div className="bg-[#D8D8D8] flex flex-col items-center justify-center p-4 rounded-2xl">
                <div className="font-bold">Queue 03</div>
                <div>⌛: 15 นาที</div>
              </div>
              <div className="flex items-center justify-center font-bold">
                Order Summary
              </div>
              <div className="flex justify-between px-4 pt-2 font-bold">
                <div>Menu Name</div>
                <div>Pending</div>
              </div>
              {/* ชื่อเมนู */}
              <div className="h-[200px] overflow-y-auto px-4">
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
              </div>
              <div className="space-y-2 w-full p-4">
                <button className="w-full bg-[#C6B399] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
