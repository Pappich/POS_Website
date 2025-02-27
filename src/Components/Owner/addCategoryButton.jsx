import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import configureAPI from "../../Config/configureAPI";
import fetchApi from "../../Config/fetchApi";

const AddCategoryButton = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  const handleAddIngredientCategory = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`${URL}/owner/stock-group`, "POST", {
        category_name: categoryName,
      });

      if (response.ok) {
        toggleModal();
      }
    } catch (error) {
      console.error("Error create ingredient category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xl px-3 py-1"
        onClick={toggleModal}
      >
        <div className="flex items-center">
          <span className="pl-1">
            <FaPlus size={24} />
          </span>
          <span className="pl-2">เพิ่มหมวดหมู่</span>
        </div>
      </button>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-white rounded-lg w-[800px] p-10 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-3xl font-bold mb-4">
              เพิ่มหมวดหมู่
            </h1>

            <div className="mb-6">
              <label
                htmlFor="categoryName"
                className="block text-2xl font-medium text-black mb-2"
              >
                ชื่อหมวดหมู่
              </label>
              <input
                type="text"
                id="categoryName"
                placeholder="กรอกชื่อหมวดหมู่..."
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-[#C6B399] rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-[#C6B399]"
              />
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                className="text-[#C6B399] w-40 bg-white border border-[#C6B399] hover:bg-[#C6B399] hover:text-white rounded-full text-xl px-4 py-2"
                onClick={toggleModal}
              >
                ย้อนกลับ
              </button>

              <button
                type="button"
                onClick={handleAddIngredientCategory}
                className="text-white  w-40 bg-[#C6B399] focus:outline-none hover:bg-[#A38B70] focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xl px-4 py-2"
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategoryButton;
