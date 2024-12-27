import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();

  const handleBack = () => navigate("/menu");
  const handlePayment = () => navigate("/payment");

  const items = [
    { name: "ชาเขียว", quantity: 1, price: 69, total: 69 },
    { name: "ชาเขียว", quantity: 2, price: 50, total: 100 },
    { name: "ชาเขียว", quantity: 2, price: 50, total: 100 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.total, 0);
  const tax = (subtotal * 0.07).toFixed(2);
  const total = (subtotal + parseFloat(tax)).toFixed(2);

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
        onClick={handlePayment}
        className="w-full mt-6 py-3 bg-[#D4B28C] text-white rounded-full font-bold"
      >
        จ่ายเงิน
      </button>
    </div>
  );
};

export default OrderSummary;
