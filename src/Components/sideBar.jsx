import React from "react";
import { IoMdCart } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { FaThLarge } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
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

  return (
    <div>
      {/* <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
     <span class="sr-only">Open sidebar</span>
     <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
     <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
     </svg>
  </button> */}

      <aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-50 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-[#DD9F52]">
          {/* LOGO */}
          <div class="flex items-center ps-2.5 mb-5">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="h-6 me-3 sm:h-7"
              alt="Flowbite Logo"
            />
          </div>
          <ul class="space-y-8 font-medium ml-0.5 ">
            {/* OverView Section*/}
            <li>
              <a
                onClick={handleDashBoard}
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#DEBB90]"
              >
                <FaThLarge
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </a>
            </li>

            {/* View Orders*/}
            <li>
              <a
                onClick={handleOrderSummary}
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#DEBB90]"
              >
                <IoMdCart
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </a>
            </li>

            {/* Stat Section*/}
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#DEBB90]"
              >
                <IoStatsChart
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </a>
            </li>

            {/* Stock Section*/}
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#DEBB90]"
              >
                <FaBox
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </a>
            </li>

            {/* Noti Section*/}
            <li>
              <a
                href="#"
                class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-[#DEBB90]"
              >
                <IoNotifications
                  size={30}
                  style={{
                    color: "white",
                  }}
                />
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
