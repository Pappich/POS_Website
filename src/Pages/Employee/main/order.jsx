import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePauseCircleOutline } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdStopwatch } from "react-icons/io";
import { MdDone } from "react-icons/md";
import DoneOrderButton from "../../../Components/Employee/doneOrderButton";
import CancelOrderButtonEm from "../../../Components/Employee/cancelOrderButtonEm";
import LogoutButton from "../../../Components/General/logoutButton";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";
import CheckSlip from "../../../Components/Employee/checkSlip";

const Order = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const handlePauseSection = () => {
    navigate("/pause-section");
  };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderStats, setOrderStats] = useState({
    total_orders: 0,
    pending_orders: 0,
    completed_orders: 0,
  });
  const [checkSlipData, setCheckSlipData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //connect web socket
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = async (event) => {
      try {
        let messageData;
        if (event.data instanceof Blob) {
          const text = await event.data.text();
          messageData = JSON.parse(text);
        } else {
          messageData = JSON.parse(event.data);
        }

        switch (messageData.type) {
          case "NEW_SLIP":
            console.log("New slip received:", messageData.data);
            setCheckSlipData(messageData.data);
            break;

          case "CONFIRM_SLIP":
            handleSubmitOrder(messageData.data);
            break;

          default:
            break;
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const response = await fetchApi(`${URL}/employee/orders`, "GET");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        setOrderStats({
          total_orders: data.total_orders || 0,
          pending_orders: data.pending_orders || 0,
          completed_orders: data.completed_orders || 0,
        });

        if (data.orders && Array.isArray(data.orders)) {
          const formattedOrders = data.orders.map((order) => ({
            ...order,
            order_items: order.order_item || [],
            order_date: new Date(order.order_date).toLocaleString("th-TH", {
              timeZone: "Asia/Bangkok",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }),
          }));
          setOrders(formattedOrders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError(err.message);
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [URL]);

  const getTodayDate = () => {
    return new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Bangkok",
    });
  };

  const handleSubmitOrder = async (slipPath) => {
    // Logic to submit order with confirmed slip
    try {
      const response = await fetchApi(`${URL}/employee/orders`, "POST", {
        // ... order data
        slip_image: slipPath,
      });
      // ... handle response
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-red-500">เกิดข้อผิดพลาด: {error}</p>
      </div>
    );
  }

  console.log("ORDER DATA:", orders);
  console.log(orders[0]); // Check the first order
  console.log(orders[0].order_items); // Check order items

  return (
    <div className="grid grid-cols-3 gap-4 bg-white">
      <div className="bg-white rounded-2xl shadow-md col-span-1 flex flex-col border border-gray-200">
        {!isLoading && orders && orders.length > 0 ? (
          <>
            <div className="bg-white flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
              <h1 className="flex items-center justify-center font-bold w-full rounded-full py-2 px-4 text-3xl">
                ออเดอร์คิวที่ {orders[0]?.order_id}
              </h1>

              <div className="flex justify-between items-center mt-2">
                <span>
                  <FaRegClock className="text-[#DD9F52]" />
                </span>
                <span className="pl-1">{orders[0]?.order_date} น.</span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="pr-1">ช่องทางการชำระเงิน</span>
                <span className="border border-[#70AB8E] text-[#70AB8E] rounded-full px-5">
                  QR CODE
                </span>
              </div>
            </div>

            <hr className="mt-2 h-0.5 mx-4 bg-[#DD9F52] border-0" />
            <div className="pl-4 pr-4 mt-2 flex flex-col h-full">
              <span className="font-bold flex justify-center mt-4 text-2xl">
                รายการคำสั่งซื้อ
              </span>
              <div className="flex justify-between font-bold text-2xl">
                <div>รายการสินค้า</div>
                <div>จำนวน</div>
              </div>
              <div className="flex-grow">
                {orders[0]?.order_items && orders[0].order_items.length > 0 ? (
                  <div className="h-[400px] overflow-y-auto mt-4">
                    {orders[0].order_items.map((item, idx) => (
                      <div key={idx} className="mb-4">
                        <div className="flex justify-between text-2xl">
                          <div>
                            {item?.menu_name?.menu_name || "ไม่ระบุชื่อเมนู"}
                          </div>
                          <div>{item?.menu_name?.quantity || 0}</div>
                        </div>
                        <span className="text-[#5B5B5B] text-xl">
                          ชนิด: {item?.details?.[0]?.type_name || "เย็น"} |
                          หวาน: {item?.details?.[0]?.level_name || "-"} | ขนาด:{" "}
                          {item?.details?.[0]?.size_name || "กลาง"}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center mt-4">ไม่มีสินค้าในคำสั่งซื้อ</p>
                )}
              </div>
              <div className="space-y-2 w-full py-4 mt-auto">
                <CancelOrderButtonEm order={orders[0]} />
                <DoneOrderButton order={orders[0]} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-500">ไม่มีออเดอร์ที่รอดำเนินการ</p>
          </div>
        )}
      </div>

      <div className="col-span-2 w-full">
        <div className="grid grid-cols-2 gap-2 my-2 w-full">
          {/* Calendar */}
          <div className="py-2 flex justify-center items-center rounded-full w-full gap-2">
            <CiCalendar className="text-black" size={36} />
            <span className="pl-1 text-black text-2xl">{getTodayDate()}</span>
          </div>

          {/* Button */}
          <button
            onClick={handlePauseSection}
            className="py-2 bg-[#C6B399] hover:bg-[#a69781] text-white rounded-full w-full"
          >
            <div className="flex justify-center items-center gap-2 text-2xl">
              <MdOutlinePauseCircleOutline size={36} />
              พักวัตถุดิบ / รายการสินค้า
            </div>
          </button>
        </div>
        {/* <LogoutButton className="w-full" /> */}

        <div className="flex justify-between space-x-4 w-full mb-4 mt-4">
          <div className="flex py-4 px-6 w-full bg-white border rounded-lg">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DCC894]">
              <MdOutlineShoppingCart color="white" size={48} />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="text-gray-600 text-2xl">ออเดอร์วันนี้</p>
              <p className="font-bold text-2xl">
                {orderStats.total_orders} ออเดอร์
              </p>
            </div>
          </div>

          <div className="flex py-4 px-6 w-full bg-white border rounded-lg">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DCC894]">
              <IoMdStopwatch color="white" size={48} />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="text-gray-600 text-2xl">ออเดอร์ที่รอ</p>
              <p className="font-bold text-2xl">
                {orderStats.pending_orders} ออเดอร์
              </p>
            </div>
          </div>

          <div className="flex py-4 px-6 w-full bg-white border rounded-l">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#DCC894]">
              <MdDone color="white" size={48} />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="text-gray-600 text-2xl">ออเดอร์ที่เสร็จ</p>
              <p className="font-bold text-2xl">
                {orderStats.completed_orders} ออเดอร์
              </p>
            </div>
          </div>
        </div>

        {/* Order Cards */}
        <div className="overflow-x-auto">
          <div className="flex space-x-8">
            {!isLoading && orders && orders.length > 1
              ? orders
                  .sort((a, b) => a.order_id - b.order_id)
                  .slice(1)
                  .map((order, index) => (
                    <div
                      key={index}
                      className="min-w-[560px] bg-[#FFFFFF] rounded-2xl shadow-md ml-0.5 border border-gray-200"
                    >
                      <div className="bg-[#FFFFFF] flex flex-col items-center justify-center rounded-2xl pt-2 px-4">
                        <h1 className="flex items-center justify-center font-bold w-full py-2 px-4 text-2xl">
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
                      <div className="pl-4 pr-4 pt-2">
                        <span className="font-bold flex justify-center text-2xl">
                          รายการคำสั่งซื้อ
                        </span>
                        <div className="flex justify-between font-bold text-2xl">
                          <div>รายการสินค้า</div>
                          <div>จำนวน</div>
                        </div>

                        <div className="h-[620px] overflow-y-auto">
                          {order?.order_items &&
                          order.order_items.length > 0 ? (
                            order.order_items.map((item, idx) => (
                              <div key={idx} className="mb-2">
                                <div className="flex justify-between text-2xl">
                                  <div>
                                    {item?.menu_name?.menu_name ||
                                      "ไม่ระบุชื่อเมนู"}
                                  </div>
                                  <div>{item?.menu_name?.quantity || 0}</div>
                                </div>
                                <span className="text-[#5B5B5B] text-xl">
                                  ชนิด:{" "}
                                  {item?.details?.[0]?.type_name || "ปั่น"} |
                                  หวาน: {item?.details?.[0]?.level_name || "-"}{" "}
                                  | ขนาด:{" "}
                                  {item?.details?.[0]?.size_name || "เล็ก"}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-center mt-4">
                              ไม่มีสินค้าในคำสั่งซื้อ
                            </p>
                          )}
                        </div>
                        <div className="space-y-2 w-full pt-2 pb-2">
                          <CancelOrderButtonEm order={order} />
                        </div>
                      </div>
                    </div>
                  ))
              : null}
          </div>
        </div>
      </div>
      {checkSlipData && <CheckSlip imageUrl={checkSlipData} />}
    </div>
  );
};

export default Order;
