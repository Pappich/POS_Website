import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AddCategoryButton = () => {
  // State to track if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  // Function to handle clicks outside the modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-3 py-1"
        onClick={toggleModal}
      >
        <div className="flex items-center">
          <span className="pl-1">
            <FaPlus size={12} />
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
            className="bg-white rounded-lg w-[600px] p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-center text-xl font-bold mb-4">
              เพิ่มหมวดหมู่
            </h1>

            <div className="mb-6">
              <label
                htmlFor="categoryName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                ชื่อหมวดหมู่
              </label>
              <input
                type="text"
                id="categoryName"
                placeholder="กรอกชื่อหมวดหมู่..."
                className="w-full border border-[#C6B399] rounded-full p-2 focus:outline-none focus:ring-1 focus:ring-[#C6B399]"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-[#C6B399] w-40 bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-4 py-2"
                onClick={toggleModal}
              >
                ย้อนกลับ
              </button>

              <button
                type="button"
                className="text-white  w-40 bg-[#C6B399] focus:outline-none hover:bg-[#A38B70] focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-4 py-2"
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
