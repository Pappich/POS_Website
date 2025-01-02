import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentMethod = ({ selectedPayment, totalAmount }) => {
  const navigate = useNavigate();

  const handleBack = () => navigate("/order-summary");

  console.log("selectedPayment: ", selectedPayment);

  return (
    <div>
      {selectedPayment === "qr" && (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">SHOP NAME</h1>
          <div className="my-4">
            {/* QR CODE SHOP */}
            <img src="" alt="QR Code" />
          </div>
          <h2 className="text-2xl text-[#D4B28C] font-bold">
            รวมทั้งสิ้น {totalAmount} ฿
          </h2>
          <p>กรุณานำหลักฐานการโอนเงินไว้ที่ช่องด้านล่างค่ะ</p>
          <div className="flex justify-center gap-2 mt-4">
            <img src="/path/to/bank-logo1.png" alt="Bank 1" />
            <img src="/path/to/bank-logo2.png" alt="Bank 2" />
            <img src="/path/to/bank-logo3.png" alt="Bank 3" />
          </div>
        </div>
      )}

      {selectedPayment === "cash" && (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">SHOP NAME</h1>
          <div className="my-4">
            {/* Replace with actual cash icon */}
            <img src="/path/to/cash-icon.png" alt="Cash Payment" />
          </div>
          <h2 className="text-2xl text-[#D4B28C] font-bold">
            รวมทั้งสิ้น {totalAmount} ฿
          </h2>
          <p>อย่าลืมรับสลิปที่ช่องด้านล่างทางขวามือนะคะ</p>
          <p>ชำระเงินที่พนักงานค่ะ</p>

          <div className="w-full flex justify-between space-x-8">
            <button
              onClick={handleBack}
              className="w-[50%] py-2 mt-4 border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors"
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
