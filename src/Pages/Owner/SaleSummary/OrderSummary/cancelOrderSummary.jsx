import React, { useState } from "react";

import SideBar from "../../../../Components/sideBar";
import CalendarSelect from "../../../../Components/calendarSelect";
import PaymentMethodFilter from "../../../../Components/paymentMethodFilter";

const CancelOrderSummary = () => {
  const [orderData, setOrderData] = useState([
    {
      orderId: 110234,
      dateTime: "02-02-24 เวลา 16:00 น.",
      quantity: "3",
      totalPrice: "100",
      paymentMethod: "QR CODE",
      tel: "086-151-7623",
      status: "คืนเงินสำเร็จ",
    },
    {
      orderId: 110235,
      dateTime: "02-02-24 เวลา 15:00 น.",
      quantity: "2",
      totalPrice: "40",
      paymentMethod: "เงินสด",
      tel: "086-151-7624",
      status: "รอคืนเงิน",
    },
  ]);

  const [orderDataDetail, setOrderDataDetail] = useState([
    {
      name: "ชานมไต้หวัน",
      quantity: 1,
      price: "30",
      category: "โปรสุดคุ้ม",
    },
    {
      name: "ชานมโกโก้",
      quantity: 1,
      price: "20",
      category: "โปรโคตรแม่",
    },
    {
      name: "ชานมเย็น",
      quantity: 1,
      price: "40",
      category: "โปรโคตรพ่อ",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsEditModalOpen(false);
    setSelectedStatus("");
  };

  const openEditModal = (e) => {
    e.stopPropagation();
    setSelectedStatus(selectedOrder.status);
    setIsEditModalOpen(true);
  };

  const handleStatusChange = () => {
    // Update the status in orderData
    setOrderData((prevData) =>
      prevData.map((order) =>
        order.orderId === selectedOrder.orderId
          ? { ...order, status: selectedStatus }
          : order
      )
    );

    // Update selected order status
    setSelectedOrder((prev) => ({
      ...prev,
      status: selectedStatus,
    }));

    setIsEditModalOpen(false);
  };

  return (
    <div>
      <SideBar menuTab={"orderSummary"} />
      <h1 className="font-bold text-xl">ออร์เดอร์ทั้งหมด</h1>
      <div className="flex justify-between items-center">
        <span className="flex items-center">
          <span className="font-bold">ออร์เดอร์ที่ถูกยกเลิก</span>
        </span>
        <CalendarSelect />
      </div>

      <PaymentMethodFilter />

      {/* Table Section */}
      <div className="overflow-x-auto border rounded-lg p-5">
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
            {orderData.map((item) => (
              <tr
                key={item.orderId}
                onClick={() => handleRowClick(item)}
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-2xl max-h-[80%] overflow-y-auto">
            <div className="flex justify-center">
              <h2 className="text-lg font-bold mb-4">ออเดอร์ที่ถูกยกเลิก</h2>
            </div>
            <p>
              <strong>หมายเลขออเดอร์: {selectedOrder.orderId}</strong>
            </p>
            {/* Table Section */}
            <div className="overflow-x-auto border rounded-lg p-2">
              <table className="border-collapse table-auto w-full">
                <thead>
                  <tr>
                    <th className="py-2 text-center border-b border-[#000000]">
                      รายการสินค้า
                    </th>
                    <th className="py-2 text-center border-b border-[#000000]">
                      จำนวน
                    </th>
                    <th className="px-1 py-2 border-b border-[#000000]">
                      ราคา
                    </th>
                    <th className="pr-5 py-2 text-center border-b border-[#000000]">
                      หมวดหมู่
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDataDetail.map((item, index) => (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <td className="text-center border-b border-[#F1F4F7]">
                        {item.name}
                      </td>
                      <td className="py-2 text-center border-b border-[#F1F4F7]">
                        {item.quantity}
                      </td>
                      <td className="py-2 text-center border-b border-[#F1F4F7]">
                        {item.price} บาท
                      </td>
                      <td className="py-2 flex justify-center text-center border-b border-[#F1F4F7]">
                        <div className="border border-[#70AB8E] text-[#70AB8E] rounded-full w-24">
                          {item.category}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <p className="col-span-1">เวลาที่สั่งซื้อ </p>
              <p className="col-span-3">{selectedOrder.dateTime} </p>
              <p className="col-span-1">ราคาสุทธิ </p>
              <p className="col-span-3">{selectedOrder.totalPrice} บาท</p>
              <p className="col-span-1">ช่องทางการชำระเงิน </p>
              <p className="col-span-3">{selectedOrder.paymentMethod}</p>
              <div className="col-span-1 flex">
                <p>สถานะ </p>
                <div className="px-2">
                  <button
                    className="border border-[#C6B399] text-[#C6B399] rounded-full px-2 hover:bg-[#C6B399] hover:text-white"
                    onClick={openEditModal}
                  >
                    แก้ไข
                  </button>
                </div>
              </div>
              <p className="col-span-3 border border-[#7AAC72] text-[#7AAC72] rounded-full flex justify-center max-w-24">
                {selectedOrder.status}
              </p>
              <p className="col-span-1">ช่องทางการติดต่อลูกค้า </p>
              <p className="col-span-3">{selectedOrder.tel} </p>
            </div>
            <div className="flex justify-center mt-3">
              <button
                className="px-6 py-1 w-[200px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
                onClick={closeModal}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-lg font-bold mb-4 text-center">สถานะ</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="pending"
                  name="status"
                  value="รอคืนเงิน"
                  checked={selectedStatus === "รอคืนเงิน"}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="pending">รอคืนเงิน</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="completed"
                  name="status"
                  value="คืนเงินสำเร็จ"
                  checked={selectedStatus === "คืนเงินสำเร็จ"}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-4 h-4"
                />
                <label htmlFor="completed">คืนเงินสำเร็จ</label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="w-32 py-1 border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors"
                onClick={() => setIsEditModalOpen(false)}
              >
                ย้อนกลับ
              </button>
              <button
                className="w-32 py-1 bg-[#D4B28C] text-white rounded-full hover:bg-[#c4a27c] transition-colors"
                onClick={handleStatusChange}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelOrderSummary;
