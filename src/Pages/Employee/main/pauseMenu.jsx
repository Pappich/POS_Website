import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import HomeEmButton from "../../../Components/Employee/homeEmButton";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";
import { useEffect } from "react";
import ThaiVirtualKeyboardInput from "../../../Components/Common/ThaiVirtualKeyboardInput";

const PauseMenu = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenuItems, setSelectedMenuItems] = useState([]);
  const [filter, setFilter] = useState("ทั้งหมด");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetchApi(`${URL}/employee/pause/menus`, "GET");
        const data = await response.json();
        setMenuItems(data);
        setSelectedMenuItems(data.filter((item) => item.paused));
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  console.log("MenuItems", menuItems);

  const unpausedMenus = menuItems.filter(
    (menu) => !selectedMenuItems.includes(menu) && !menu.paused
  );

  const getFilteredMenuItems = () => {
    if (filter === "ทั้งหมด") return menuItems;

    if (filter === "วัตถุดิบที่พัก") {
      return menuItems.filter(
        (menu) => menu.paused || selectedMenuItems.includes(menu)
      );
    }

    if (filter === "วัตถุดิบที่ไม่พัก") {
      return menuItems.filter(
        (menu) => !menu.paused && !selectedMenuItems.includes(menu)
      );
    }

    return menuItems;
  };

  const filteredMenuItems = getFilteredMenuItems().filter((menu) =>
    menu.menu_name.normalize("NFD").includes(searchTerm.normalize("NFD"))
  );

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleBackButton = () => navigate("/pause-section");

  const handleSaveButton = async () => {
    if (menuItems.length === 0) {
      console.warn("No menus available.");
      return;
    }

    const payload = menuItems.map((menu) => ({
      menu_id: menu.menu_id,
      paused: selectedMenuItems.some(
        (selected) => selected.menu_id === menu.menu_id
      ),
    }));

    try {
      const response = await fetchApi(
        `${URL}/employee/pause/menus`,
        "PATCH",
        payload
      );

      if (!response.ok) {
        throw new Error(`Failed to update menus: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Menus updated successfully:", data);
      setSelectedMenuItems([]);
    } catch (error) {
      console.error("Error updating Menus:", error);
    }
  };

  const handleSelectMenu = (menu) => {
    setSelectedMenuItems((prev) => {
      const isSelected = prev.find((item) => item.menu_id === menu.menu_id);
      if (isSelected) {
        return prev.filter((item) => item.menu_id !== menu.menu_id);
      } else {
        return [...prev, { ...menu, paused: !menu.paused }];
      }
    });

    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.menu_id === menu.menu_id ? { ...item, paused: !item.paused } : item
      )
    );
  };

  const handleFilterChange = (filterName) => {
    setFilter(filterName);
  };

  return (
    <>
      {/* <div className="flex justify-end">
        <HomeEmButton />
      </div> */}
      <div className="w-full flex justify-center text-lg font-bold">
        <div className="text-center mb-10 mt-[40px]">
          <h1 className="text-3xl font-bold mb-2">วัตถุดิบที่ต้องการพัก</h1>
          <div className="w-20 h-1 bg-[#D4B28C]"></div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center mb-8">
        <div className="relative flex items-center w-full">
          <FaSearch
            style={{ color: "#D4B28C" }}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <ThaiVirtualKeyboardInput
            placeholder="ค้นหาด้วยชื่อวัตถุดิบ..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-[#D4B28C] rounded-full p-3 pl-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="productDetails"
            className="text-2xl font-bold text-start"
          >
            เมนูทั้งหมด
          </label>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "ทั้งหมด"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("ทั้งหมด")}
          >
            ทั้งหมด
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "วัตถุดิบที่ไม่พัก"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("วัตถุดิบที่ไม่พัก")}
          >
            วัตถุดิบที่ไม่พัก
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              filter === "วัตถุดิบที่พัก"
                ? "bg-[#D4B28C] text-white"
                : "border border-[#D4B28C] text-[#D4B28C]"
            }`}
            onClick={() => handleFilterChange("วัตถุดิบที่พัก")}
          >
            วัตถุดิบที่พัก
          </button>
        </div>
      </div>

      <div className="w-full ml-2">
        <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
          {filteredMenuItems.map((menu, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMenuItems.includes(menu) || menu.paused}
                onChange={() => handleSelectMenu(menu)}
                className="form-checkbox h-5 w-5 accent-[#DD9F52]"
              />
              <span>{menu.menu_name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 flex justify-center">
        {selectedMenuItems.length === 0 &&
        menuItems.filter((item) => item.paused).length === 0 &&
        filter === "วัตถุดิบที่พัก"
          ? "ไม่มีวัตถุดิบที่พักในขณะนี้"
          : null}
      </div>

      <div className="flex fixed bottom-4 left-0 px-4 py-4 w-full space-x-8 justify-between">
        <button
          onClick={handleBackButton}
          className="px-14 py-4 w-[300px] rounded-full border text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
        >
          ย้อนกลับ
        </button>

        <button
          onClick={handleSaveButton}
          className="px-14 py-4 w-[300px] rounded-full bg-[#D4B28C] text-white hover:bg-[#cda777] transition-colors font-bold"
        >
          บันทึก
        </button>
      </div>
    </>
  );
};

export default PauseMenu;
