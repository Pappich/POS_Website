import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsCashCoin } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from "react-redux";
import { QRCodeCanvas } from "qrcode.react";
import generatePayload from "promptpay-qr";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";

const PaymentMethod = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;
  const navigate = useNavigate();
  const location = useLocation();

  const { orderDetails } = location.state || {};
  const total = orderDetails?.total;
  const items = orderDetails?.items;
  const selectedPayment = orderDetails?.selectedPayment;

  console.log("orderDetails: ", orderDetails);
  console.log("selectedPayment: ", selectedPayment);
  console.log("TOTAL:", total);

  const accountNumber = "0869201512";
  const qrData = generatePayload(accountNumber, { amount: parseFloat(total) });

  console.log("qrData: ", qrData);

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

  const handleConfirmPayment = async () => {
    const createOrderDto = {
      order_date: new Date().toISOString(),
      total_price: total,
      queue_number: 3,
      status: "รอทำ",
      payment_method: selectedPayment,
    };

    const payload = {
      createOrderDto,
      items: [],
    };

    try {
      const response = await fetchApi(
        `${URL}/employee/orders`,
        "POST",
        payload
      );

      if (!response.ok) {
        throw new Error("Error submitting the order");
      }

      const responseData = await response.json();
      console.log("Order submission response:", responseData);
      navigate("/order-summary", { state: { orderData: responseData } });
    } catch (error) {
      console.error("Error during order submission:", error);
    }
  };

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
              <QRCodeCanvas value={qrData} size={360} />
            </div>
            {/* Detail */}
            <div className="flex flex-col items-center">
              <h1 className="text-3xl font-bold mb-[8px]">ชำระด้วย QR Code</h1>
              <h1 className="text-xl mb-[48px]">โปรดแสกนเพื่อชำระเงิน</h1>
              <h2 className="text-3xl text-[#DD9F52] font-bold mb-[40px]">
                รวมทั้งสิ้น {total} บาท
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
              <button
                onClick={handleConfirmPayment}
                className="px-4 py-2 bg-[#DD9F52] text-white rounded"
              >
                ยืนยันการชำระเงิน
              </button>
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
            รวมทั้งสิ้น {total} บาท
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
