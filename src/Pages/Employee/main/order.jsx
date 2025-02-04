import React from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdStopwatch } from "react-icons/io";
import { MdDone } from "react-icons/md";
import DoneOrderButton from "../../../Components/doneOrderButton";
import CancelOrderButtonEm from "../../../Components/cancelOrderButtonEm";
import LogoutButton from "../../../Components/logoutButton";
import { useState, useEffect } from "react";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";

const Order = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const handlePauseSection = () => {
    navigate("/pause-section");
  };
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/employee/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        const formattedOrders = data
          .filter((order) => order.status === "processing") // Filter only 'processing' orders
          .map((order) => {
            const formattedDate = new Date(order.order_date).toLocaleString(
              "th-TH",
              {
                timeZone: "Asia/Bangkok",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              }
            );

            return {
              ...order,
              order_date: formattedDate,
              order_items: order.order_items || [],
            };
          });
        setOrders(formattedOrders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orders]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("ORDER DATA:", orders);

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-[#FFFFFF] rounded-2xl shadow-md col-span-1">
        {orders.length > 0 && orders[0]?.order_id ? (
          <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
            <h1 className="flex items-center justify-center font-bold border bg-[#F0ECE3] w-full rounded-full py-2 px-4 text-xl">
              ออเดอร์คิวที่ {orders[0]?.order_id}
            </h1>

            <div className="flex justify-between items-center">
              <span>
                <FaRegClock className="text-[#DD9F52]" />
              </span>
              <span className="pl-1">{orders[0].order_date} น.</span>
            </div>

            {/* <div className="flex justify-between items-center">
            <span>
              <MdOutlineTableBar className="text-[#DD9F52]" size={19} />
            </span>
            <span className="pl-1 font-bold text-[#FF5555]">ทานที่ร้าน</span>
          </div> */}

            <div className="flex justify-between">
              <span className="pr-1">ช่องทางการชำระเงิน</span>
              <span className="border border-[#70AB8E] text-[#70AB8E] rounded-full px-5 ">
                {/* add payment method */}
                QR CODE
              </span>
            </div>
          </div>
        ) : (
          <div>Loading orders...</div>
        )}
        <hr className="mt-2 h-0.5 mx-4 bg-[#DD9F52] border-0" />
        <div className="pl-4 pr-4 pt-2">
          <span className="font-bold flex justify-center">
            รายการคำสั่งซื้อ
          </span>
          <div className="flex justify-between font-bold">
            <div>รายการสินค้า</div>
            <div>จำนวน</div>
          </div>
          {orders[0]?.order_items && orders[0].order_items.length > 0 ? (
            <div className="h-[200px] overflow-y-auto">
              {orders[0].order_items.map((item, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex justify-between">
                    <div>{item.menu.menu_name}</div>
                    <div>{item.quantity}</div>
                  </div>
                  <span className="text-[#5B5B5B] text-sm">
                    ชนิด: {item.menu_type.type_name} | หวาน:{" "}
                    {item.sweetness.level_name} | ขนาด: {item.size.size_name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>ไม่มีสินค้าในคำสั่งซื้อ</p>
          )}
          <div className="space-y-2 w-full pt-2 pb-2 mb-auto">
            <CancelOrderButtonEm order={orders[0].order_id} />
            <DoneOrderButton order={orders[0].order_id} />
          </div>
        </div>
      </div>

      {/* Loop through other orders */}
      <div className="col-span-2 w-full">
        <div className="grid grid-cols-2 gap-2 my-2 w-full">
          {/* Calendar */}
          <div className="py-1 flex justify-center items-center border bg-[#F0ECE3] rounded-full w-full">
            <CiCalendar className="text-[#000000]" size={24} />
            <span className="pl-1 text-[#000000]">17 ธันวาคม พ.ศ. 2567</span>
          </div>

          {/* Button */}
          <button
            onClick={handlePauseSection}
            className="py-1 bg-[#C6B399] hover:bg-[#a69781] text-white rounded-full w-full"
          >
            <div className="flex justify-center items-center">
              <MdOutlinePauseCircleOutline size={24} />
              พักวัตถุดิบ / รายการสินค้า
            </div>
          </button>
        </div>
        {/* <LogoutButton className="w-full" /> */}

        <div className="flex justify-around">
          <div className="flex max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <MdOutlineShoppingCart color="white" size={24} />
            </div>
            <div className="ml-3">
              <p>ออเดอร์วันนี้</p>
              <p className="font-bold">15 ออเดอร์</p>
            </div>
          </div>
          <div className="flex max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <IoMdStopwatch className="font-bold" color="white" size={30} />
            </div>
            <div className="ml-3">
              <p>ออเดอร์ที่รอ</p>
              <p className="font-bold">17 ออเดอร์</p>
            </div>
          </div>
          <div className="flex block max-w-sm py-2 px-4 w-full mr-2 bg-white border rounded-lg ">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
              <MdDone color="white" size={28} />
            </div>
            <div className="ml-3">
              <p>ออเดอร์ที่เสร็จ</p>
              <p className="font-bold">10 ออเดอร์</p>
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {orders.length > 0 &&
              orders.slice(1).map((order, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-[#FFFFFF] rounded-2xl shadow-md ml-0.5"
                >
                  {/* ข้างบน */}
                  <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
                    <h1 className="flex items-center justify-center font-bold w-full py-2 px-4 text-xl">
                      ออเดอร์คิวที่ {order?.order_id}
                    </h1>

                    <div className="flex justify-between items-center">
                      <span>
                        <FaRegClock className="text-[#DD9F52]" />
                      </span>
                      <span className="pl-1">{order.order_date} น.</span>
                    </div>
                  </div>
                  <hr className="mt-2 h-0.5 mx-4 bg-[#DD9F52] border-0" />
                  {/* ข้างล่าง */}
                  <div className="pl-4 pr-4 pt-2">
                    <span className="font-bold flex justify-center">
                      รายการคำสั่งซื้อ
                    </span>
                    <div className="flex justify-between font-bold">
                      <div>รายการสินค้า</div>
                      <div>จำนวน</div>
                    </div>
                    {/* ชื่อเมนู */}
                    <div className="h-[200px] overflow-y-auto">
                      {order.order_items && order.order_items.length > 0 ? (
                        order.order_items.map((item, idx) => (
                          <div key={idx} className="mb-2">
                            <div className="flex justify-between">
                              <div>{item.menu.menu_name}</div>
                              <div>{item.quantity}</div>
                            </div>
                            <span className="text-[#5B5B5B] text-sm">
                              {item.sweetness.level_name} -{" "}
                              {item.size.size_name}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p>ไม่มีสินค้าในคำสั่งซื้อ</p>
                      )}
                    </div>
                    <div className="space-y-2 w-full pt-2 pb-2">
                      <CancelOrderButtonEm order={order?.order_id} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
