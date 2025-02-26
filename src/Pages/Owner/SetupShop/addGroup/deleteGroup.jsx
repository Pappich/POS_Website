import React from "react";
import configureAPI from "../../../../Config/configureAPI";
import fetchApi from "../../../../Config/fetchApi";

const DeleteGroup = ({ isOpen, onClose, onConfirm, deleteCategory }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await fetchApi(
        `${URL}/owner/categories/${deleteCategory.category_id}`,
        "DELETE"
      );

      if (response.ok) {
        console.log("category deleted successfully");
        onConfirm();
      } else {
        console.error("Failed to delete the category");
      }
    } catch (error) {
      console.error("An error occurred while deleting the category:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-1">
      <div className="bg-white p-8 rounded-lg w-[700px] h-[300px] shadow-lg flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl mb-4">
          ลบกลุ่ม{" "}
          <span className="font-bold">{deleteCategory.category_name}</span>{" "}
          หรือไม่ ?
        </h2>
        <p className="text-gray-600 mb-8">
          การลบกลุ่มจะไม่สามารถย้อนกลับมาแก้ไขได้อีก
        </p>
        <div className="w-full flex justify-between space-x-8">
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

export default DeleteGroup;
