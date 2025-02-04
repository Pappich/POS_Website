import React, { useState } from "react";
import "react-simple-keyboard/build/css/index.css";
import fetchApi from "../Config/fetchApi";
import configureAPI from "../Config/configureAPI";

const DoneOrderButton = ({ order }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("order", order);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const completeOrder = async () => {
    const orderData = {
      order_id: order,
      status: "success",
    };

    try {
      const response = await fetchApi(
        `${URL}/employee/orders/${order}/complete`,
        "PATCH",
        orderData
      );

      if (response.ok) {
        console.log("Order completed successfully!");
        closeModal();
      } else {
        console.log(response);
        console.log("Failed to complete the order.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative">
      <button
        className="w-full bg-[#C6B399] hover:bg-[#a69781] text-white font-bold py-2 px-4 rounded-full"
        onClick={openModal}
      >
        เสร็จสิ้นออเดอร์
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] h-auto rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-bold text-center mb-4">
              ออเดอร์เสร็จสิ้นครบทุกรายการ ใช่หรือไม่
            </h2>
            <p className="text-gray-700 text-center mb-6">
              การกดเสร็จสิ้นออเดอร์จะไม่สามารถย้อนกลับมาแก้ไขได้อีก
            </p>
            <div className="flex justify-between space-x-4 mt-12">
              <button
                className="w-full text-[#C6B399] border border-[#C6B399]   hover:bg-[#afafaf] hover:text-white font-bold py-2 px-4 rounded-full"
                onClick={closeModal}
              >
                ยกเลิก
              </button>
              <button
                className="w-full bg-[#C6B399] hover:bg-[#a69781] text-white font-bold py-2 px-4 rounded-full"
                onClick={completeOrder}
              >
                เสร็จสิ้นออเดอร์
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoneOrderButton;
