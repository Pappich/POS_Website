import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdStopwatch } from "react-icons/io";
import { MdDone } from "react-icons/md";
import DoneOrderButton from "../../../Components/doneOrderButton";
import CancelOrderButtonEm from "../../../Components/cancelOrderButtonEm";

const Order = () => {
  const navigate = useNavigate();
  const handlePauseSection = () => {
    navigate("/pause-section");
  };
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
            <CancelOrderButtonEm />
            <DoneOrderButton />
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="grid grid-cols-8 gap-2 my-2">
          <div className="py-1 col-span-3 flex justify-center items-center border border-[#C6B399] rounded-full">
            <CiCalendar className="text-[#C6B399]" size={24} />
            <span className="pl-1 text-[#C6B399]">17 ธันวาคม พ.ศ. 2567</span>
          </div>
          <button
            onClick={handlePauseSection}
            className="py-1 col-span-4 w-full bg-[#C6B399] hover:bg-[#a69781] text-white rounded-full"
          >
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
          {/* ยอดออร์เดอร์ทั้งหมด */}
          <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <MdOutlineShoppingCart color="white" size={24} />
            </div>
            <div className="ml-3">
              <p>ยอดออร์เดอร์ทั้งหมด</p>
              <p className="font-bold">15 ออเดอร์</p>
            </div>
          </div>
          <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <IoMdStopwatch className="font-bold" color="white" size={30} />
            </div>
            <div className="ml-3">
              <p>ยอดออเดอร์ที่รอ</p>
              <p className="font-bold">17 ออเดอร์</p>
            </div>
          </div>
          <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <MdDone color="white" size={28} />
            </div>
            <div className="ml-3">
              <p>ยอดออเดอร์ที่เสร็จสิ้น</p>
              <p className="font-bold">10 ออเดอร์</p>
            </div>
          </div>
        </div>
        {/* ตัวCard */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] bg-[#FFFFFF] rounded-2xl shadow-md">
              {/* ข้างบน */}
              <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
                <h1 className="flex items-center justify-center font-bold w-full py-2 px-4 text-xl">
                  คิวที่ 02
                </h1>

                <div className="flex justify-between items-center">
                  <span>
                    <FaRegClock className="text-[#DD9F52]" />
                  </span>
                  <span className="pl-1">13:00:52 น.</span>
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
                  <CancelOrderButtonEm />
                </div>
              </div>
            </div>

            {/* Add more cards as needed */}
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] bg-[#FFFFFF] rounded-2xl shadow-md">
              {/* ข้างบน */}
              <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
                <h1 className="flex items-center justify-center font-bold w-full py-2 px-4 text-xl">
                  คิวที่ 02
                </h1>

                <div className="flex justify-between items-center">
                  <span>
                    <FaRegClock className="text-[#DD9F52]" />
                  </span>
                  <span className="pl-1">13:00:52 น.</span>
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
                  <CancelOrderButtonEm />
                </div>
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
