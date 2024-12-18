import React from "react";
import { IoMdCart } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = ({ menuTab }) => {
  const navigate = useNavigate();
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];
  const handleDashBoard = () => {
    navigate("/overview");
  };
  const handleOrderSummary = () => {
    navigate("/order-summary");
  };
  const handleSaleSummaryGraph = () => {
    navigate("/sale-summary-graph");
  };
  const handleStock = () => {
    navigate("/stock");
  };
  const handleNotificationSummary = () => {
    navigate("/notification-summary");
  };

  return (
    <div>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#DD9F52]">
          {/* LOGO */}
          <div className="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
          </div>
          <ul className="space-y-8 font-medium ml-0.5 ">
            {/* OverView Section*/}
            <li>
              <div
                onClick={handleDashBoard}
                className={`flex items-center p-2 text-gray-900 rounded-lg  ${
                  menuTab === "overview"
                    ? "bg-[#DEBB90]"
                    : "hover:bg-transparent"
                }
            `}
              >
                <FaThLarge
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </li>

            {/* View Orders*/}
            <li>
              <div
                onClick={handleOrderSummary}
                className={`flex items-center p-2 text-gray-900 rounded-lg  ${
                  menuTab === "orderSummary"
                    ? "bg-[#DEBB90]"
                    : "hover:bg-transparent"
                }
              `}
              >
                <IoMdCart
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </li>

            {/* Stat Section*/}
            <li>
              <div
                onClick={handleSaleSummaryGraph}
                className={`flex items-center p-2 text-gray-900 rounded-lg  ${
                  menuTab === "saleSummaryGraph"
                    ? "bg-[#DEBB90]"
                    : "hover:bg-transparent"
                }
              `}
              >
                <IoStatsChart
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </li>

            {/* Stock Section*/}
            <li>
              <div
                onClick={handleStock}
                className={`flex items-center p-2 text-gray-900 rounded-lg  ${
                  menuTab === "stock" ? "bg-[#DEBB90]" : "hover:bg-transparent"
                }
              `}
              >
                <FaBox
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </li>

            {/* Noti Section*/}
            <li>
              <div
                onClick={handleNotificationSummary}
                className={`flex items-center p-2 text-gray-900 rounded-lg  ${
                  menuTab === "notificationSummary"
                    ? "bg-[#DEBB90]"
                    : "hover:bg-transparent"
                }
              `}
              >
                <IoNotifications
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
