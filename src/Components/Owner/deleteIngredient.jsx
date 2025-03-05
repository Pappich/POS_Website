import React, { useState } from "react";
import LoadingPopup from "../General/loadingPopup";

const DeleteIngredientModal = ({ isOpen, onClose, onConfirm, ingredient }) => {
  if (!isOpen || !ingredient) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-[700px] h-[300px] shadow-lg flex flex-col justify-center items-center text-center">
        <h2 className="text-3xl mb-4">
          ลบส่วนผสม{" "}
          <span className="font-bold">{ingredient.ingredient_name}</span>{" "}
          หรือไม่?
        </h2>
        <p className="text-gray-600 mb-8">
          การลบส่วนผสมจะไม่สามารถย้อนกลับมาแก้ไขได้อีก
        </p>
        <div className="w-full flex justify-between space-x-8">
          <button
            onClick={onClose}
            className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={() => {
              onConfirm(ingredient.ingredient_id);
            }}
            className="px-14 py-4 w-[300px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors"
          >
            ลบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIngredientModal;
