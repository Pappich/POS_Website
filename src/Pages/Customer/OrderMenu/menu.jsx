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

  const navigate = useNavigate();
  const handleCart = () => navigate("/summary");
  const [menuData, setMenuData] = useState({
    available_category: [],
    available_menus: [],
  });
  const { available_category, available_menus } = menuData;
  const [activeCategory, setActiveCategory] = useState("");

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

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white">
      {/* cart */}
      <button
        onClick={handleCart}
        className="flex justify-end p-2 text-[#DD9F52] hover:text-orange-500 transition-all duration-300"
      >
        <PiShoppingCart size={36} />
      </button>

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
      <div className="grid grid-cols-3 gap-6">
        {filteredMenus.map((menu, index) => (
          <button
            className={"px-6 py-3 rounded-md border border-[#D4B28C] ml-2"}
            key={index}
            onClick={() => handleMenuClick(menu.menu_id)}
          >
            <img
              className="w-full h-40 object-cover rounded-md mb-2"
              src={menu.image_url}
              alt={menu.menu_name}
            />
            <div className="font-bold">{menu.menu_name}</div>
            <div>{menu.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
