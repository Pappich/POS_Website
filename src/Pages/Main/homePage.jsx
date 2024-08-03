import React from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../Components/categoryCard";

//change style cart
const CartIcon = () => {
  return (
    <div className="relative bounce">
      <button className="bg-orange-500 text-white p-2 rounded-full">🛒</button>
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
        0
      </span>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    if (category === "Drinks") {
      navigate("/menu");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="text-3xl font-bold mb-8">
        <span className="text-orange-500">R</span>estaurant
      </header>
      <div className="flex space-x-8">
        <CategoryCard
          icon="🍷"
          title="Drinks"
          onClick={() => handleCategoryClick("Drinks")}
        />
        <CategoryCard icon="🍔" title="Food" />
        <CategoryCard icon="🍨" title="Dessert" />
      </div>
      <div className="fixed top-4 right-4">
        <CartIcon />
      </div>
    </div>
  );
};

export default HomePage;
