import React, { useState, useEffect } from "react";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";
import SideBar from "../../../../Components/Owner/sideBar";
import CalendarSelect from "../../../../Components/Owner/calendarSelect";
import OrderAndCancelCard from "../../../../Components/Owner/orderAndCancelCard";
import PaymentMethodFilter from "../../../../Components/Owner/paymentMethodFilter";

const OrderSummary = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const timeRangeFilter = ["ทั้งหมด", "รายปี", "รายเดือน", "รายวัน"];
  const [selectedTimeRange, setSelectedTimeRange] = useState("ทั้งหมด");
  const [orderData, setOrderData] = useState([]);

  // Set default date to today's date in the format YYYY-MM-DD
  const today = new Date();
  const options = {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-CA", options); // Format as YYYY-MM-DD

  const [selectedDate, setSelectedDate] = useState(formattedDate);

  const handleTimeRangeClick = (timeRange) => {
    setSelectedTimeRange(timeRange);
  };

  // Function to fetch order data based on the selected date
  const fetchOrderData = async () => {
    try {
      const response = await fetchApi(
        `${URL}/owner/stock-orders/${selectedDate}`
      );
      const data = await response.json();
      console.log("API Response Data:", data);

      const { total_orders, canceled_orders, order_topic } = data;

      const orders = Array.isArray(order_topic) ? order_topic : [order_topic];

      const formattedData = orders.map((order) => {
        const orderDate = new Date(order.order_date);
        const thaiTime = orderDate.toLocaleString("th-TH", {
          timeZone: "Asia/Bangkok",
          hour12: false,
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return {
          ...order,
          order_date: thaiTime,
        };
      });

      setOrderData({
        total_orders,
        canceled_orders,
        order_topic: formattedData,
      });
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  // Fetch data when the component mounts or when the selected date changes
  useEffect(() => {
    fetchOrderData();
  }, [selectedDate]);

  return (
    <div>
      <SideBar menuTab={"orderSummary"} />
      <div className="px-10">
        <h1 className="font-bold text-3xl mt-[40px]">ออเดอร์ทั้งหมด</h1>
        <span className="flex justify-end">
          <CalendarSelect setSelectedDate={setSelectedDate} />
        </span>
        <OrderAndCancelCard
          total_orders={orderData.total_orders}
          canceled_orders={orderData.canceled_orders}
        />
        <PaymentMethodFilter />

        {/* Table Section */}
        <div className="overflow-x-auto border rounded-lg p-5">
          <div>
            <div className="my-3">
              <div className="flex justify-between items-center space-x-4">
                <div>รายการออเดอร์</div>
                <div>
                  {/* timeRange Section */}
                  {timeRangeFilter.map((timeRange, index) => (
                    <button
                      key={index}
                      onClick={() => handleTimeRangeClick(timeRange)}
                      className={`px-4 py-1 ${
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
                <th className="pr-5 py-2 text-center border-b border-[#000000]">
                  ช่องทางการชำระเงิน
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.order_topic && orderData.order_topic.length > 0 ? (
                orderData.order_topic.map((item) => (
                  <tr
                    key={item.order_id}
                    onClick={() => alert("CLICKED!!!")}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="pr-5 text-center border-b border-[#F1F4F7]">
                      {item.order_id}
                    </td>
                    <td className="py-2 text-center border-b border-[#F1F4F7]">
                      {item.order_date} น.
                    </td>
                    <td className="py-2 text-center border-b border-[#F1F4F7]">
                      {item.quantity}
                    </td>
                    <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                      {item.total_amount}
                    </td>
                    <td className="py-2 flex justify-center text-center border-b border-[#F1F4F7]">
                      <div className="border-x px-2 border border-[#70AB8E] text-[#70AB8E] rounded-full">
                        {item.payment_method}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
