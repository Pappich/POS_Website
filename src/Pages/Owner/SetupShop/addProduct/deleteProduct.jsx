import React from "react";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";

const DeleteProduct = ({ isOpen, onClose, onConfirm, product }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await fetchApi(
        `${URL}/owner/menus/${product.menu_id}`,
        "DELETE"
      );

      if (response.ok) {
        console.log("Product deleted successfully");
        onConfirm();
      } else {
        console.error("Failed to delete the product");
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-1">
      <div className="bg-white p-16 rounded-lg w-[700px] h-[300px] shadow-lg flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl mb-4">
          ลบเมนู <span className="font-bold">{product.menu_name}</span> หรือไม่
          ?
        </h2>
        <p className="text-gray-600 mb-8">
          การลบเมนูจะไม่สามารถย้อนกลับมาแก้ไขได้อีก
        </p>
        <div className="w-full flex justify-between space-x-8 fixed bottom-4 left-0 w-full px-4 py-4">
          <button
            onClick={onClose}
            className="px-8 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleDelete}
            className="px-8 py-3 w-[250px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
