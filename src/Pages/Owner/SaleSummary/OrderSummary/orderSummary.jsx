import React, { useState } from "react";

import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";
import OrderAndCancelCard from "../../../../Components/orderAndCancelCard";
import PaymentMethodFilter from "../../../../Components/paymentMethodFilter";

const OrderSummary = () => {
  const timeRangeFilter = ["ทั้งหมด", "รายปี", "รายเดือน", "รายวัน"];
  const [selectedTimeRange, setSelectedTimeRange] = useState("ทั้งหมด");
  const handleTimeRangeClick = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };
  const [orderData, setOrderData] = useState([
    {
      orderId: 110234,
      dateTime: "02-02-24 เวลา 16:00 น.",
      quantity: "3",
      totalPrice: "100",
      paymentMethod: "QR CODE",
    },
    {
      orderId: 110235,
      dateTime: "02-02-24 เวลา 15:00 น.",
      quantity: "2",
      totalPrice: "40",
      paymentMethod: "เงินสด",
    },
    {
      orderId: 110236,
      dateTime: "02-02-24 เวลา 14:00 น.",
      quantity: "5",
      totalPrice: "300",
      paymentMethod: "QR CODE",
    },
    {
      orderId: 110237,
      dateTime: "02-02-24 เวลา 13:00 น.",
      quantity: "1",
      totalPrice: "20",
      paymentMethod: "เงินสด",
    },
    {
      orderId: 110238,
      dateTime: "02-02-24 เวลา 16:00 น.",
      quantity: "3",
      totalPrice: "100",
      paymentMethod: "QR CODE",
    },
    {
      orderId: 110239,
      dateTime: "02-02-24 เวลา 15:00 น.",
      quantity: "2",
      totalPrice: "40",
      paymentMethod: "เงินสด",
    },
    {
      orderId: 110240,
      dateTime: "02-02-24 เวลา 14:00 น.",
      quantity: "5",
      totalPrice: "300",
      paymentMethod: "QR CODE",
    },
    {
      orderId: 110241,
      dateTime: "02-02-24 เวลา 13:00 น.",
      quantity: "1",
      totalPrice: "20",
      paymentMethod: "เงินสด",
    },
  ]);
  return (
    <div>
      <SideBar menuTab={"orderSummary"} />
      <h1 className="font-bold text-xl">ออร์เดอร์ทั้งหมด</h1>
      <span className="flex justify-end">
        <CalendarSelect />
      </span>
      <OrderAndCancelCard />
      <PaymentMethodFilter />

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg p-5">
        <div>
          <div className="my-3">
            <div className="flex justify-between items-center space-x-4">
              <div>ช่องทางการชำระเงิน</div>
              <div>
                {/* timeRange Section */}
                {timeRangeFilter.map((timeRange, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeRangeClick(timeRange)}
                    className={`px-4 py-1  ${
                      selectedTimeRange === timeRange
                        ? "bg-[#C6B399] text-white rounded-full border"
                        : "bg-white border-[#C6B399]"
                    }`}
                  >
                    {timeRange}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <table className="border-collapse table-auto w-full">
          <thead>
            <tr>
              <th className="py-2 pr-5 text-center border-b border-[#000000]">
                หมายเลขออเดอร์
              </th>
              <th className="py-2 text-center border-b border-[#000000]">
                เวลาที่สั่งซื้อ
              </th>
              <th className="px-1 py-2 border-b border-[#000000]">จำนวน</th>
              <th className="pl-10 py-2 border-b border-[#000000]">
                ราคาสุทธิ
              </th>
              <th className=" pr-5 py-2 text-center border-b border-[#000000]">
                ช่องทางการชำระเงิน
              </th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((item) => (
              <tr
                key={item.id}
                onClick={() => alert("CLICKED!!!")}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="pr-5 text-center border-b border-[#F1F4F7]">
                  {item.orderId}
                </td>
                <td className="py-2 text-center border-b border-[#F1F4F7]">
                  {item.dateTime}
                </td>
                <td className="py-2 text-center border-b border-[#F1F4F7]">
                  {item.quantity}
                </td>
                <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                  {item.totalPrice}
                </td>
                <td className="py-2 flex justify-center text-center border-b border-[#F1F4F7]">
                  <div className="border border-[#70AB8E] text-[#70AB8E] rounded-full w-24">
                    {item.paymentMethod}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderSummary;
