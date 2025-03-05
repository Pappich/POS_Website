import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { useSelector } from "react-redux";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";

const Menu = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};
  const cartItems = useSelector((state) => state.cart.items);

  const navigate = useNavigate();
  const [menuData, setMenuData] = useState({
    categories: [],
  });
  const { categories } = menuData;
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [loading, setLoading] = useState(false);

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    fetchApi(`${URL}/customer/menus`, "GET")
      .then((response) => response.json())
      .then((data) => {
        // Set categories from the fetched data
        setMenuData({
          categories: data.categories || [],
        });
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, [URL, owner_id]);

  console.log("Menu Data:", menuData);

  // Group menus by category, filtering out null or empty categories
  const groupedMenus = (categories || [])
    .filter((category) => category.category_name) // Filter out null or empty category names
    .map((category) => {
      return {
        category_name: category.category_name,
        menus: category.menus || [], // Ensure menus is an array
      };
    });

  // Add a group for "ทั้งหมด" with unique menus
  const allMenus = categories.flatMap((category) => category.menus || []);
  const uniqueMenus = Array.from(new Set(allMenus.map(menu => menu.menu_id)))
    .map(id => allMenus.find(menu => menu.menu_id === id));

  groupedMenus.unshift({
    category_name: "ทั้งหมด",
    menus: uniqueMenus,
  });

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory("");
    } else {
      setActiveCategory(category);
    }
  };

  const filteredMenus =
    activeCategory === ""
      ? uniqueMenus // Show all unique menus if no category is selected
      : groupedMenus
          .filter((group) => group.category_name === activeCategory)
          .flatMap((group) => group.menus);

  const handleMenuClick = (menuId) => {
    console.log("menu id click:", menuId);
    navigate("/menu-detail", {
      state: { menuId },
    });
  };

  const handleAddToCart = () => {
    navigate("/summary");
  };

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white">
      {/* Cart */}
      <div className="flex justify-end items-center mb-6 relative">
        <button onClick={handleAddToCart} className="relative">
          <PiShoppingCart className="w-[40px] h-[40px] text-[#DD9F52]" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {getCartItemCount()}
          </span>
        </button>
      </div>

      {/* Category Buttons */}
      <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 ml-2 space-x-4 mb-4">
        {groupedMenus.map((group) => (
          <button
            key={group.category_name}
            onClick={() => handleCategoryClick(group.category_name)}
            className={`px-4 py-2 rounded-full border border-[#D4B28C] ${
              activeCategory === group.category_name
                ? "bg-[#D4B28C] text-white"
                : "border-[#D4B28C] text-[#D4B28C]"
            }`}
          >
            {group.category_name}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredMenus.map((menu, index) => {
          const imageUrl = `${URL}/${menu.image_url.replace(/\\/g, "/")}`;
          return (
            <button
              className="px-6 py-3 rounded-md border border-[#D4B28C] shadow-md ml-2"
              key={index}
              onClick={() => handleMenuClick(menu.menu_id)}
            >
              <img
                className="w-full aspect-[4/3] object-cover rounded-md mb-2 border border-gray-200 shadow-sm"
                src={imageUrl}
                alt={menu.menu_name}
              />
              <div className="font-bold text-lg">{menu.menu_name}</div>
              <div className="text-gray-600">{menu.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
