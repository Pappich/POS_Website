import React, { useState, useEffect } from "react";
import { IoChevronBack, IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PaymentMethod from "./paymentMethod";
import { useSelector } from "react-redux";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../Config/redux/cartSlice";
import { AiOutlineDelete } from "react-icons/ai";

const Summary = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qr");
  const [menuData, setMenuData] = useState([]);
  const [orders, setOrders] = useState([]);

  const items = useSelector((state) => state.cart.items);

  console.log("cart item:", items);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetchApi(`${URL}/customer/menus`, "GET");
        const data = await response.json();

        const selectedMenus = items.map((item) => {
          return data.available_menus.find(
            (menuItem) => menuItem.menu_id === item.menuId
          );
        });

        console.log("selectedMenus:", selectedMenus);

        if (selectedMenus) {
          setMenuData(selectedMenus);
          console.log(menuData);
        } else {
          console.error("Menu item not found");
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

  const subtotal = items.reduce((acc, item) => acc + item.price, 0);
  const tax = 0;
  const total = subtotal + parseFloat(tax);

  const handleBack = () => navigate("/menu");

  const handlePaymentClick = () => setShowPaymentPopup(true);

  const closePaymentPopup = () => setShowPaymentPopup(false);

  const handleSelectPayment = (method) => setSelectedPayment(method);

  const handleConfirmPayment = () => {
    // Prepare order details to pass to the payment method
    const orderDetails = {
      total,
      items,
      selectedPayment, // Pass the items array if needed
    };
    console.log("orderDetails: ", orderDetails);

    // Navigate to the payment method page with order details
    navigate("/payment-method", { state: { orderDetails } });
  };

  const handleRemove = (item) => {
    console.log("ITEM TO DELETE:", item);
    dispatch(
      removeFromCart({
        menuId: item.menuId,
        selectedSize: item.selectedSize,
        selectedSweetness: item.selectedSweetness,
        selectedType: item.selectedType,
        selectedAddOn: item.selectedAddOn,
      })
    );
  };

  return (
    <div className="w-full font-noto flex flex-col items-center bg-white">
      <div className="w-full flex justify-start items-center mb-6">
        <button onClick={handleBack} className="text-[#DD9F52] text-4xl">
          <IoChevronBack className="w-[40px] h-[40px] text-[#DD9F52]" />
        </button>
      </div>

      <div className="flex flex-col mb-2 mt-[40px]">
        <h1 className="text-3xl font-bold">สรุปรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-300 text-2xl">
            <th className="text-left py-2">เมนู</th>
            <th className="text-center py-2">จำนวน</th>
            <th className="text-center py-2">ราคาทั้งหมด</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-gray-500 text-2xl"
              >
                ยังไม่มีสินค้าในตระกร้าขณะนี้
              </td>
            </tr>
          ) : (
            items.map((item, index) => {
              const selectedMenu = menuData.find(
                (menu) => menu.menu_id === item.menuId
              );

              return (
                <tr key={index} className="border-b border-gray-200">
                  <td className="flex items-center py-2">
                    <img
                      src={`${URL}/${item.menu_img.replace(/\\/g, "/")}`}
                      alt={item.menuName}
                      className="mr-2 rounded flex items-center h-[72px] w-[72px] mb-2"
                    />
                    <div>
                      <p className="font-semibold text-xl">{item.menuName}</p>
                      <div className="text-xl text-gray-500">
                        {item.selectedSize && (
                          <span>ขนาด: {item.selectedSize.name} </span>
                        )}
                        {item.selectedSweetness && (
                          <span>| หวาน: {item.selectedSweetness.name} </span>
                        )}
                        {item.selectedType && (
                          <span>| ชนิด: {item.selectedType.name} </span>
                        )}
                        {item.selectedAddOn.length > 0 && (
                          <span>
                            | ท็อปปิ้ง:{" "}
                            {item.selectedAddOn
                              .map((addOn) => addOn.name)
                              .join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">{item.price} บาท</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item)}
                      className="font-bold border border-red-300 text-red-300 w-16 h-10 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white"
                    >
                      <AiOutlineDelete size={36} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {/* Order summary */}
      <div className="w-full fixed bottom-32 border-t border-gray-300 pt-4 text-2xl px-12">
        <div className="flex justify-between mb-2 font-bold">
          <span>รวมเป็นเงิน</span>
          <span>{subtotal} บาท</span>
        </div>
        <div className="flex font-bold justify-between mb-2">
          <span>ภาษีมูลค่าเพิ่ม 7%</span>
          <span>{tax} บาท</span>
        </div>
        <div className="flex justify-between text-3xl font-bold">
          <span>รวมทั้งหมด</span>
          <span className="text-[#DD9F52]">{total} บาท</span>
        </div>
      </div>

      <button
        onClick={handlePaymentClick}
        className="fixed bottom-4 py-3 w-full px-8 bg-[#D4B28C] text-white rounded-full font-bold"
      >
        จ่ายเงิน
      </button>

      {/* Payment popup */}
      {showPaymentPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-10 w-[800px] relative">
            <h2 className="text-3xl font-bold mb-4 flex justify-center">
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
              <label htmlFor="qr-code" className="text-2xl">
                QR Code
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
              <label htmlFor="cash" className="text-2xl">
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

export default Summary;
