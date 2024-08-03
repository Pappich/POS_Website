import React from "react";
import { FaMugHot } from "react-icons/fa";
import { RiDrinks2Line } from "react-icons/ri";
import { BiCoffeeTogo } from "react-icons/bi";
import { MdOutlineRecommend } from "react-icons/md";
import { BiDrink } from "react-icons/bi";
import MenuCard from "../../../Components/menuCrad";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import Header from "../../../Components/header";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const items = [
    {
      title: "Classic Chocolate",
      price: 25.98,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Espresso - Premium version",
      price: 30.15,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Double Espresso",
      price: 32.54,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Black Eye",
      price: 25.98,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Americano",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Long Black",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Macchiato",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Long Macchiato",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Cortado",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Breve",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Cappuccino",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Flat White",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Cafe Latte",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Mocha",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Vienna",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Affogato",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
    {
      title: "Cafe au Lait",
      price: 64.76,
      img: "https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080.png",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(items);

  const itemsCategory = [
    { title: "Recommend", icon: <MdOutlineRecommend /> },
    { title: "Hot", icon: <FaMugHot /> },
    { title: "Iced", icon: <RiDrinks2Line /> },
    { title: "Frappe", icon: <BiCoffeeTogo /> },
    { title: "Other", icon: <BiDrink /> },
  ];

  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      {/* HEADER */}
      <Header onSearch={handleSearch} />

      {/* MENU CATEGORY */}
      <div className="flex space-x-4 mb-4 overflow-x-auto">
        {itemsCategory.map((category, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded-lg cursor-pointer transform transition-transform duration-300 ${
              index === 0
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-200"
            } hover:scale-110`}
          >
            <div className="w-8 h-8 flex items-center justify-center mr-2 text-2xl">
              {category.icon}
            </div>
            <span className="flex-grow text-center">{category.title}</span>
          </div>
        ))}
      </div>

      {/* MENU */}
      <div className="flex-grow mt-4 flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {filteredProducts.map((item, index) => (
            <MenuCard
              key={index}
              title={item.title}
              price={item.price}
              img={item.img}
              onClick={() => handleCardClick(item.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
