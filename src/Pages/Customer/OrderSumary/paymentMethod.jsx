import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import qrExample from "../../../Assets/Images/qrExample.jpg";
import { BsCashCoin } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bankIcons = [
    "BAAC.png",
    "BAY.png",
    "BBL.png",
    "GSB.png",
    "KBANK.png",
    "KTB.png",
    "PromptPay.png",
    "SCB.png",
    "TrueMoney.png",
    "TTB.png",
  ];

  const handleBack = () => navigate("/summary");

  const { selectedPayment, totalAmount } = location.state || {};
  console.log("selectedPayment: ", selectedPayment);

  return (
    <div>
      <div className="flex justify-start items-center mb-6">
        <button onClick={handleBack}>
          <IoChevronBack className="w-[40px] h-[40px] text-[#DD9F52]" />
        </button>
      </div>

      {/* QR code */}
      {selectedPayment === "qr" && (
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-2 gap-8">
            {/* QR code */}
            <div className="flex justify-center">
              <img src={qrExample} alt="QR code" className="w-[360px]" />
            </div>
            {/* Detail */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-[8px]">ชำระด้วย QR Code</h1>
              <h1 className="text-xl mb-[48px]">โปรดแสกนเพื่อชำระเงิน</h1>
              <h2 className="text-3xl text-[#DD9F52] font-bold mb-[40px]">
                รวมทั้งสิ้น {totalAmount} บาท
              </h2>
              <p className="text-2xl font-bold mb-[8px]">
                เมื่อชำระเงินเสร็จสิ้นแล้ว
              </p>
              <p className="text-2xl font-bold mb-[16px]">
                โปรดนำหลักฐานไว้ที่ช่องด้านขวามือ
              </p>
              <p className="text-xl mb-[16px]">
                อย่าลืมรับสลิปที่ช่องทางด้านขวามือ
              </p>
              <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
                {bankIcons.map((bankName, index) => (
                  <div key={index} className="w-1/6 flex justify-center">
                    <img
                      src={require(`../../../Assets/Images/bankIcons/${bankName}`)}
                      alt={`Bank logo ${index + 1}`}
                      className="w-[40px] h-[40px] rounded-full shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* cash */}
      {selectedPayment === "cash" && (
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold mb-[4px]">ชำระด้วยเงินสด</h1>
          <div className="my-[20px]">
            <BsCashCoin className="w-[200px] h-[200px] text-[#cda777]" />
          </div>
          <h2 className="text-3xl text-[#DD9F52] font-bold mb-[40px]">
            รวมทั้งสิ้น {totalAmount} บาท
          </h2>
          <p className="text-2xl font-bold mb-[8px]">
            กรุณาชำระเงินที่เคาน์เตอร์พนักงาน
          </p>
          <p className="text-2xl">อย่าลืมรับสลิปที่ช่องทางด้านขวามือ</p>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
