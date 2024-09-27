import React from "react";

const DeleteGroup = ({ isOpen, onClose, onConfirm, product }) => {
  if (!isOpen) return null;
  console.log("PRODUCT: ", product);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-1">
      <div className="bg-white p-8 rounded-lg w-[700px] h-[300px] shadow-lg flex flex-col justify-center items-center text-center">
        <h2 className="text-xl mb-4">
          ลบกลุ่ม <span className="font-bold">{product}</span> หรือไม่ ?
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
            onClick={onConfirm}
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
