import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteChoice from "./deleteChoice";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ChoiceList = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urls = {
          ขนาดแก้ว: `${URL}/owner/menus/options/size`,
          ความหวาน: `${URL}/owner/menus/options/sweetness`,
          ท็อปปิ้ง: `${URL}/owner/menus/options/add-ons`,
          ชนิด: `${URL}/owner/menus/options/menu-type`,
        };

        const results = await Promise.all(
          Object.entries(urls).map(async ([key, url]) => {
            const response = await fetch(url);
            const data = await response.json();
            return data.length > 0 ? key : null;
          })
        );

        setMenuItems(results.filter(Boolean));
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredItems = menuItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSuccess = () => {
    navigate("/main-menu");
  };

  const handleAddChoice = () => {
    navigate("/choice-option");
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
    switch (product) {
      case "ขนาดแก้ว":
        navigate("/glass-choice", { state: { mode: "edit" } });
        break;
      case "ความหวาน":
        navigate("/sweet-level-choice", { state: { mode: "edit" } });
        break;
      case "ท็อปปิ้ง":
        navigate("/topping-choice", { state: { mode: "edit" } });
        break;
      case "ชนิด":
        navigate("/type-choice", { state: { mode: "edit" } });
        break;
    }
  };

  const handleMenuClick = (option) => {
    console.log(option);
    navigate("/choice-menu", {
      // CHANGE TO SEND MENU IN EACH GROUP
      // EXAMPLE
      state: {
        groupName: option,
        selectedMenus: ["กาแฟดำ", "เอสเปรสโซ่", "อเมริกาโน่", "มอคค่า"],
      },
    });
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 mt-[40px]">
            ตัวเลือกรายการสินค้า
          </h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ตัวเลือกรายการสินค้าทั้งหมด</h1>
        </div>

        <div className="w-full flex justify-start text-xl mb-8">
          <div className="relative flex items-center w-full">
            <FaSearch
              style={{ color: "#D4B28C" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อตัวเลือก..."
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
                  <p className="text-2xl">{item}</p>
                  <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                    <button
                      className="hover:underline font-bold"
                      onClick={() => handleMenuClick(item)}
                    >
                      สินค้าที่ใช้ตัวเลือก
                    </button>
                    <span className="text-gray-300">|</span>
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
            <p className="text-gray-500 text-center">ไม่มีกลุ่มรายการสินค้า</p>
          )}
        </div>

        <div className="flex fixed bottom-4 left-0 px-4 py-4 w-full space-x-8 justify-between">
          <button
            className="px-14 py-4 w-[300px] rounded-full border text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
            onClick={handleSuccess}
          >
            ย้อนกลับ
          </button>
          <button
            className="px-14 py-4 w-[300px] rounded-full bg-[#D4B28C] text-white hover:bg-[#cda777] transition-colors font-bold"
            onClick={handleAddChoice}
          >
            เพิ่มตัวเลือก
          </button>
        </div>
      </div>

      {/* DELETE PRODUCT POPUP */}
      <DeleteChoice
        isOpen={isDeletePopupOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        product={productToDelete}
      />
    </>
  );
};

export default ChoiceList;
