import React from "react";

const QueueSummary = () => {
  return (
    <div className="w-full font-noto flex flex-col justify-center items-center">
      <div className="w-[720px] bg-white p-12 rounded-lg shadow-md">
        <h2 className="text-3xl text-black mb-2 text-left">
          ขอบคุณที่ใช้บริการ
        </h2>
        <p className="text-gray-500 mb-2 text-left">
          กรุณารอรับสินค้าทางซ้ายมือค่ะ
        </p>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>

        <div className="mb-4 relative">
          <div className="justify-between items-center grid grid-cols-2 gap-6 mb-4">
            <span className="text-black text-left font-bold">
              หมายเลขออเดอร์
            </span>
            <div
              id="order-id"
              className="w-full py-2 px-3 bg-transparent text-black font-bold border border-[#D4B28C] rounded-full"
            >
              123245
            </div>
          </div>

          <div className="justify-between items-center grid grid-cols-2 gap-6 mb-4">
            <span className="text-black text-left font-bold">บัตรคิวที่</span>
            <div
              id="order-id"
              className="w-full py-2 px-3 bg-transparent text-black font-bold border border-[#D4B28C] rounded-full"
            >
              A-10
            </div>
          </div>
        </div>

        <div className="justify-between items-center grid grid-cols-2 gap-6 mb-4">
          <div className="flex flex-col items-center">
            <span>คิวปัจจุบัน</span>
            <span className="text-center">A-2</span>
          </div>
          <div className="flex flex-col items-center">
            <span>จำนวนคิวรอ</span>
            <span className="text-center">3</span>
          </div>
        </div>

        <div>
          <span className="flex justify-center font-bold">
            โปรดรับใบเสร็จรับเงินที่ช่องทางด้านล่าง
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueSummary;
