import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteProduct from "./deleteProduct";

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const menuItems = ["กาแฟดำ", "ชาเขียว", "นมชมพู", "นมเย็น", "โกโก้"];

  const filteredItems = menuItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSuccess = () => {
    navigate("/main-menu");
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    // DELETE PRODUCT API PATH
    console.log("Deleting:", productToDelete);
    setIsDeletePopupOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  const handleEditClick = (product) => {
    // EDIT PRODUCT => FLOW ADD BUT HAVE DATA OF EACH PRODUCT
    navigate("/add-product");
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-white">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">รายการสินค้า</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">เมนูทั้งหมด</h1>
        </div>

        <div className="w-full flex justify-start text-lg mb-8">
          <div className="relative flex items-center w-full">
            <FaSearch
              style={{ color: "#D4B28C" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อสินค้า..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border border-[#D4B28C] rounded-full p-3 pl-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </div>
        </div>

        {/* RENDER MENU */}
        <div className="w-full">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <div key={index} className="w-full mb-4">
                <div className="flex justify-between items-start">
                  <p className="text-lg">{item}</p>
                  <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                    <button
                      className="hover:underline font-bold"
                      onClick={() => handleEditClick(item)}
                    >
                      แก้ไข
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      className="hover:underline font-bold"
                      onClick={() => handleDeleteClick(item)}
                    >
                      ลบ
                    </button>
                  </div>
                </div>
                <div className="w-full h-[1px] bg-gray-300 mt-2"></div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">ไม่พบสินค้า</p>
          )}
        </div>

        <div className="flex mt-[40px] w-full space-x-8 justify-between">
          <button
            className="px-6 py-3 w-[250px] rounded-full border border-[#D4B28C] text-[#D4B28C] font-bold"
            onClick={handleSuccess}
          >
            เสร็จสิ้น
          </button>
          <button
            className="px-6 py-3 w-[250px] rounded-full bg-[#D4B28C] text-white font-bold"
            onClick={handleAddProduct}
          >
            เพิ่มรายการสินค้า
          </button>
        </div>
      </div>

      {/* DELETE PRODUCT POPUP */}
      <DeleteProduct
        isOpen={isDeletePopupOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </>
  );
};

export default ProductList;
