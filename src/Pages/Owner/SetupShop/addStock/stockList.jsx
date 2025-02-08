import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";
import { useSelector } from "react-redux";

const StockList = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const groupedMenus = [];
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [menuData, setMenuData] = useState({
    available_category: [],
    available_menus: [],
  });
  const { available_category, available_menus } = menuData;

  useEffect(() => {
    fetchApi(`${URL}/customer/menus`, "GET")
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  menuData.available_menus.forEach((menu) => {
    menu.category.forEach((category) => {
      let group = groupedMenus.find(
        (g) => g.category_name === category.category_name
      );

      if (!group) {
        // If the group doesn't exist, create a new one
        groupedMenus.push({
          category_name: category.category_name,
          category_id: category.category_id,
          menus: [
            {
              menu_id: menu.menu_id,
              menu_name: menu.menu_name,
            },
          ],
        });
      } else {
        // If the group exists, add the menu to the existing group
        group.menus.push({
          menu_id: menu.menu_id,
          menu_name: menu.menu_name,
        });
      }
    });
  });

  console.log("GROUP MENU:", groupedMenus);

  const categoryItems = available_category;
  const allMenuItems = available_menus.map((menu) => ({
    menu_id: menu.menu_id,
    menu_name: menu.menu_name,
  }));

  console.log("MENU:", allMenuItems);
  console.log("categoryItems:", categoryItems);

  // filter by search
  const filteredItems = selectedCategory
    ? groupedMenus
        .find((group) => group.category_name === selectedCategory)
        ?.menus.filter((menu) =>
          menu.menu_name
            .toLowerCase()
            .normalize("NFC")
            .includes(searchTerm.toLowerCase().normalize("NFC"))
        ) || []
    : allMenuItems.filter((item) =>
        item.menu_name
          .toLowerCase()
          .normalize("NFC")
          .includes(searchTerm.toLowerCase().normalize("NFC"))
      );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleBack = () => {
    navigate("/main-menu");
  };

  const handleEditClick = (item) => {
    console.log("item click", item);
    navigate("/add-stock", {
      state: {
        menu: item.menu_name,
        menu_id: item.menu_id,
        // available_menus: available_menus,
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">รายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] mx-auto mt-6"></div>
      </div>

      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold">เมนูทั้งหมด</h1>
      </div>

      <div className="w-full mb-8">
        <div className="relative w-full">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#D4B28C]" />
          <input
            type="text"
            placeholder="ค้นหาด้วยชื่อสินค้า..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full border border-[#D4B28C] rounded-full py-3 pl-10 pr-4 text-gray-700 outline-none"
          />
        </div>
      </div>

      <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 mb-6">
        {groupedMenus.map((group, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(group.category_name)}
            className={`px-6 py-3 rounded-full border border-[#D4B28C] font-bold ml-2 ${
              selectedCategory === group.category_name
                ? "bg-[#D4B28C] text-white"
                : "bg-white text-[#DD9F52]"
            }`}
          >
            {group.category_name}
          </button>
        ))}
      </div>

      <div className="w-full">
        {selectedCategory ? (
          filteredItems.length > 0 ? (
            filteredItems.map((menu, menuIndex) => (
              <div key={menuIndex} className="w-full mb-4">
                <div className="flex justify-between items-start">
                  <p className="text-lg">{menu.menu_name}</p>
                  <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                    <button
                      className="hover:underline font-bold"
                      onClick={() => handleEditClick(menu)}
                    >
                      แก้ไข
                    </button>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">ไม่พบสินค้า</p>
          )
        ) : filteredItems.length > 0 ? (
          filteredItems.map((menu, index) => (
            <div key={index} className="w-full mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg">{menu.menu_name}</p>
                <button
                  onClick={() => handleEditClick(menu)}
                  className="text-[#D4B28C] font-bold"
                >
                  แก้ไข
                </button>
              </div>
              <div className="w-full h-px bg-gray-300 mt-2"></div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center">ไม่พบสินค้า</p>
        )}
      </div>

      <div className="flex mt-10 w-full justify-start">
        <button
          onClick={handleBack}
          className="px-6 py-3 w-64 rounded-full border border-[#D4B28C] text-[#D4B28C] bg-transparent font-bold transition duration-300 hover:bg-[#D4B28C] hover:text-white"
        >
          ย้อนกลับ
        </button>
      </div>
    </div>
  );
};

export default StockList;
