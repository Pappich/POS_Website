import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">SHOP NAME</h1>
      <div className="flex flex-grow justify-end items-center space-x-4">
        <div className="relative w-1/2 max-w-sm">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            className="w-full p-2 pl-10 rounded-lg border"
            placeholder="Search product..."
          />
          <div className="absolute inset-y-0 left-2 flex items-center text-gray-500">
            <FaSearch />
          </div>
        </div>
        <button className="p-2 rounded-full bg-gray-200">
          <FiShoppingCart />
        </button>
      </div>
    </header>
  );
};

export default Header;
