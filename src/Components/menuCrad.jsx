import React from "react";

const MenuCard = ({ title, price, img }) => {
  return (
    <div
      className="p-4 bg-white rounded-lg shadow-lg flex flex-col justify-between transform transition-transform duration-300 hover:scale-105"
      style={{ width: "250px", height: "300px" }}
    >
      <img
        src={img}
        alt={title}
        className="w-full object-cover mb-4 rounded-lg"
      />
      <div className="flex flex-col justify-between h-1/3">
        <h3 className="font-semibold mb-2 text-center">{title}</h3>
        {/* <p className="text-blue-600 text-lg text-center">
          {price.toFixed(2)} ฿
        </p> */}
      </div>
    </div>
  );
};

export default MenuCard;
