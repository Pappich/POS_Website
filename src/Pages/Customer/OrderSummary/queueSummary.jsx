import React from "react";
import { useEffect, useState } from "react";
import configureAPI from "../../../Config/configureAPI";
import fetchApi from "../../../Config/fetchApi";

const QueueSummary = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;
  const [queueSummary, setQueueSummary] = useState([]);

  useEffect(() => {
    const fetchQueueSummary = async () => {
      try {
        const response = await fetchApi(`${URL}/customer/menus/queue`, "GET");
        const data = await response.json();
        console.log("Fetched queue summary:", data);
        setQueueSummary(data);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchQueueSummary();
  }, [URL]);

  return (
    <div className="w-full h-[800px] font-noto flex flex-col justify-center items-center">
      <div className="w-[720px] bg-white p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl text-black mb-2 text-left">
          ขอบคุณที่ใช้บริการ
        </h2>
        <p className="text-gray-500 mb-2 text-left">
          กรุณารอเรียกคิวเพื่อรับสินค้า
        </p>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>

        <div className="mb-4 relative">
          <div className="justify-between items-center grid grid-cols-2 gap-6 mb-4">
            <span className="text-black text-left font-bold">
              หมายเลขออเดอร์
            </span>
            <div
              id="order-id"
              className="w-full py-2 px-3 bg-transparent text-black font-bold border border-[#D4B28C] rounded-full"
            >
              {queueSummary.order_id}
            </div>
          </div>

          <div className="justify-between items-center grid grid-cols-2 gap-6 mb-4">
            <span className="text-black text-left font-bold">บัตรคิวที่</span>
            <div
              id="order-id"
              className="w-full py-2 px-3 bg-transparent text-black font-bold border border-[#D4B28C] rounded-full"
            >
              {queueSummary.queue_number}
            </div>
          </div>
        </div>

        <div>
          <span className="flex justify-center font-bold">
            โปรดรับใบเสร็จรับเงินที่ช่องทางด้านซ้าย
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueSummary;
