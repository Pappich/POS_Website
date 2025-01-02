import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "./paymentMethod";

const OrderSummary = () => {
  const navigate = useNavigate();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qr");
  const totalAmount = 321;

  const handleBack = () => navigate("/menu");

  const items = [
    { name: "ชาเขียว", quantity: 1, price: 69, total: 69 },
    { name: "ชาเขียว", quantity: 2, price: 50, total: 100 },
    { name: "ชาเขียว", quantity: 2, price: 50, total: 100 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const tax = (subtotal * 0.07).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

  const handlePaymentClick = () => setShowPaymentPopup(true);
  const closePaymentPopup = () => setShowPaymentPopup(false);
  const handleSelectPayment = (method) => setSelectedPayment(method);

  const handleConfirmPayment = () => {
    console.log("Selected payment method :", selectedPayment);
    navigate("/payment-method");
    setShowPaymentPopup(false);
  };

  return (
    <div className="w-full font-noto flex flex-col items-center min-h-screen bg-white">
      <div className="w-full flex justify-start items-center mb-6">
        <button onClick={handleBack} className="text-[#DD9F52] text-4xl">
          <IoChevronBack />
        </button>
      </div>

      <div className="flex flex-col mb-2">
        <h1 className="text-2xl font-bold">สรุปรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-lg">
            <th className="text-left py-2">เมนู</th>
            <th className="text-center py-2">จำนวน</th>
            <th className="text-center py-2">ราคา</th>
            <th className="text-center py-2">ราคาทั้งหมด</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="flex items-center py-2">
                <img
                  src="https://via.placeholder.com/50"
                  alt={item.name}
                  className="w-12 h-12 mr-2 rounded"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    ชนิด: เย็น | หวาน: 50% | ขนาด: M | ท็อปปิ้ง: ไข่มุก
                  </p>
                </div>
              </td>
              <td className="text-center">{item.quantity}</td>
              <td className="text-center">{item.price} ฿</td>
              <td className="text-center">{item.total} ฿</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* order summary */}
      <div className="w-full mt-4 border-t border-gray-300 pt-4 text-lg">
        <div className="flex justify-between mb-2 font-bold">
          <span>รวมเป็นเงิน</span>
          <span>{subtotal} ฿</span>
        </div>
        <div className="flex font-bold justify-between mb-2">
          <span>ภาษีมูลค่าเพิ่ม 7%</span>
          <span>{tax} ฿</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span>รวมทั้งหมด</span>
          <span className="text-orange-600">{total} ฿</span>
        </div>
      </div>

      <button
        onClick={handlePaymentClick}
        className="w-full mt-6 py-3 bg-[#D4B28C] text-white rounded-full font-bold"
      >
        จ่ายเงิน
      </button>

      {/* payment popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-[500px] relative">
            <h2 className="text-xl font-bold mb-4 flex justify-center">
              วิธีการชำระเงิน
            </h2>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="qr-code"
                name="payment-method"
                className="mr-2"
                checked={selectedPayment === "qr"}
                onChange={() => handleSelectPayment("qr")}
              />
              <label htmlFor="qr-code" className="text-lg">
                QR CODE
              </label>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="cash"
                name="payment-method"
                className="mr-2"
                checked={selectedPayment === "cash"}
                onChange={() => handleSelectPayment("cash")}
              />
              <label htmlFor="cash" className="text-lg">
                เงินสด
              </label>
            </div>
            <div className="w-full flex justify-between space-x-8">
              <button
                onClick={closePaymentPopup}
                className="w-full py-2 mt-4 border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleConfirmPayment}
                className="w-full py-2 mt-4 bg-[#D4B28C] text-white rounded-full font-bold"
              >
                ตกลง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
