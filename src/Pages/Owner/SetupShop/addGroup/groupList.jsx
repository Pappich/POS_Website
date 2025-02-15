import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DeleteGroup from "./deleteGroup";
import fetchApi from "../../../../Config/fetchApi";
import { useEffect } from "react";
import configureAPI from "../../../../Config/configureAPI";

const GroupList = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const [categoryItems, setCategoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteCategory, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchApi(`${URL}/owner/categories`, "GET");
        const data = await response.json();
        setCategoryItems(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchCategory();
  }, [categoryItems]);

  const filteredItems = categoryItems.filter((item) =>
    item.category_name.normalize("NFD").includes(searchTerm.normalize("NFD"))
  );

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSuccess = () => {
    navigate("/main-menu");
  };

  const handleAddGroup = () => {
    navigate("/add-group", { state: { mode: "add" } });
  };

  const handleDeleteClick = (deleteCategory) => {
    setCategoryToDelete(deleteCategory);
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = () => {
    // DELETE PRODUCT API PATH
    setIsDeletePopupOpen(false);
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
  };

  const handleEditClick = (group) => {
    // EDIT PRODUCT => FLOW ADD BUT HAVE DATA OF EACH PRODUCT
    console.log("group click", group);
    navigate("/add-group", { state: { mode: "edit", groupData: group } });
  };

  const handleGroupClick = async (group) => {
    try {
      const categoryId = group.category_id;
      const response = await fetchApi(
        `${URL}/owner/categories/${categoryId}/menus`,
        "GET"
      );

      const data = await response.json();
      const menus = data;
      if (menus && menus.length > 0) {
        navigate("/group-menu", {
          state: {
            groupName: group.category_name,
            selectedMenus: menus,
          },
        });
      } else {
        console.error("API response does not contain any menus.");
      }
    } catch (error) {
      console.error("Error fetching group menus:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-[40px]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">กลุ่มรายการสินค้า</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">กลุ่มรายการสินค้าทั้งหมด</h1>
        </div>

        <div className="w-full flex justify-start text-xl mb-8">
          <div className="relative flex items-center w-full">
            <FaSearch
              style={{ color: "#D4B28C" }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            />
            <input
              type="text"
              placeholder="ค้นหาด้วยชื่อกลุ่ม..."
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
                  <p className="text-2xl">{item.category_name}</p>
                  <div className="flex items-center space-x-4 text-[#D4B28C] font-bold">
                    <button
                      className="hover:underline font-bold"
                      onClick={() => handleGroupClick(item)}
                    >
                      รายการสินค้าในกลุ่ม
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
            <p className="text-gray-500 text-center">ไม่กลุ่มรายการสินค้า</p>
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
            onClick={handleAddGroup}
          >
            เพิ่มกลุ่ม
          </button>
        </div>
      </div>

      {/* DELETE PRODUCT POPUP */}
      <DeleteGroup
        isOpen={isDeletePopupOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        deleteCategory={deleteCategory}
      />
    </>
  );
};

export default GroupList;
