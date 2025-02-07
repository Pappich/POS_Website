import React, { useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import fetchApi from "../Config/fetchApi";
import configureAPI from "../Config/configureAPI";

const CancelOrderButtonEm = ({ order }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [contact, setContact] = useState("");

  console.log("cancel order", order);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cancelOrder = async () => {
    const customerData = {
      order_id: order,
      customer_name: customerName,
      contact: contact,
    };

    try {
      const response = await fetchApi(
        `${URL}/employee/orders/${order}/cancel`,
        "PATCH",
        customerData
      );

      if (response.ok) {
        console.log("Order cancel successfully!");
        closeModal();
      } else {
        console.log(response);
        console.log("Failed to cancel the order.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        className="w-full border border-[#C6B399] hover:bg-[#a89982] hover:text-white text-[#C6B399] font-bold py-2 px-4 rounded-full"
        onClick={openModal}
      >
        ยกเลิกออเดอร์
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] h-auto rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold text-center mb-1">
              ยกเลิกออเดอร์
            </h2>
            <hr className="h-0.5 bg-[#DD9F52] border-0" />

            <div className="mt-2">
              <label>หมายเลขออเดอร์</label>
              <input
                type="text"
                value={order}
                disabled
                className="w-full border border-[#D4B28C] rounded-full px-3 py-1.5 text-gray-600 bg-gray-100"
              />
            </div>

            <div className="mt-2">
              <label>ชื่อลูกค้า</label>
              <input
                type="text"
                placeholder="กรอกชื่อของลูกค้า..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-[#D4B28C] rounded-full px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
            </div>

            <div className="mt-2">
              <label>เบอร์โทรศัพท์ลูกค้า</label>
              <input
                type="text"
                placeholder="กรอกเบอร์โทรศัพท์ของลูกค้า..."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full border border-[#D4B28C] rounded-full px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
            </div>

            <div className="flex justify-between space-x-4 mt-10">
              <button
                className="w-full text-[#C6B399] border border-[#C6B399]   hover:bg-[#afafaf] hover:text-white font-bold py-2 px-4 rounded-full"
                onClick={closeModal}
              >
                ยกเลิก
              </button>
              <button
                className="w-full bg-[#C6B399] hover:bg-[#a69781] text-white font-bold py-2 px-4 rounded-full"
                onClick={cancelOrder}
              >
                ยกเลิกออเดอร์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelOrderButtonEm;
