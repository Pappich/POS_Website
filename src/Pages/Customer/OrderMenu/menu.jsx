import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useEffect } from "react";
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
    available_category: [],
    available_menus: [],
  });
  const { available_category, available_menus } = menuData;
  const [activeCategory, setActiveCategory] = useState("");

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

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

  console.log("MENU DATA:", menuData);

  const groupedMenus = available_menus.reduce((acc, menu) => {
    menu.category.forEach((category) => {
      let group = acc.find((g) => g.category_name === category.category_name);
      if (!group) {
        acc.push({
          category_name: category.category_name,
          category_id: category.category_id,
          menus: [menu],
        });
      } else {
        group.menus.push(menu);
      }
    });
    return acc;
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
        // If the group exists, check if the menu is already added to the category
        const existingMenu = group.menus.find(
          (m) => m.menu_id === menu.menu_id
        );
        if (!existingMenu) {
          group.menus.push({
            menu_id: menu.menu_id,
            menu_name: menu.menu_name,
          });
        }
      }
    });
  });

  console.log("GROUP MENU:", groupedMenus);

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory("");
    } else {
      setActiveCategory(category);
    }
  };

  const filteredMenus =
    activeCategory === ""
      ? available_menus.filter(
          (menu, index, self) =>
            index === self.findIndex((m) => m.menu_id === menu.menu_id)
        ) // Show all menus without if no category is selected
      : groupedMenus
          .filter((group) => group.category_name === activeCategory)
          .flatMap((group) =>
            group.menus.filter(
              (menu, index, self) =>
                index === self.findIndex((m) => m.menu_id === menu.menu_id)
            )
          );

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
      {/* cart */}
      <div className="flex justify-end items-center mb-6 relative">
        <button onClick={handleAddToCart} className="relative">
          <PiShoppingCart className="w-[40px] h-[40px] text-[#DD9F52]" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
            {getCartItemCount()}
          </span>
        </button>
      </div>

      <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 ml-2 space-x-4 mb-4">
        {available_category.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-full border border-[#D4B28C] ${
              activeCategory === category
                ? "bg-[#D4B28C] text-white"
                : "border-[#D4B28C] text-[#D4B28C]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredMenus.map((menu, index) => (
          <button
            className="px-6 py-3 rounded-md border border-[#D4B28C] shadow-md ml-2"
            key={index}
            onClick={() => handleMenuClick(menu.menu_id)}
          >
            <img
              className="w-full aspect-[4/3] object-cover rounded-md mb-2 border border-gray-200 shadow-sm"
              src={menu.image_url}
              alt={menu.menu_name}
            />
            <div className="font-bold text-lg">{menu.menu_name}</div>
            <div className="text-gray-600">{menu.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
