import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../../Components/header";

const MenuDetail = () => {
  const { id } = useParams();

  const item = {
    title: "Caramel Frappuccino",
    img: "path-to-your-image",
    description: "Caramel syrup with coffee, milk, and whipped cream",
    price: "$3.95",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
      <Header />
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={item.img}
          alt={item.title}
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-gray-600">{item.description}</p>
          <div className="mt-4 text-xl font-bold">{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetail;
