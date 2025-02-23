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

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [groupsData, setGroupsData] = useState({
    sweetness_groups: [],
    size_groups: [],
    menu_type_groups: [],
    add_ons: [],
  });

  const fetchGroupsData = async () => {
    try {
      const response = await fetchApi(
        `${URL}/owner/menus/options/groups`,
        "GET"
      );
      const data = await response.json();
      setGroupsData(data);
    } catch (error) {
      console.error("Error fetching groups data:", error);
    }
  };

  useEffect(() => {
    fetchGroupsData();
  }, [URL]);

  // Group items by type
  const groupedItems = {
    ขนาดแก้ว: groupsData.size_groups || [],
    ความหวาน: groupsData.sweetness_groups || [],
    ...(groupsData.add_ons?.length > 0 && { ท็อปปิ้ง: ["ท็อปปิ้ง"] }),
    ชนิด: groupsData.menu_type_groups || [],
  };

  // Add console log to check the data structure
  console.log("Groups Data:", groupsData);
  console.log("Grouped Items:", groupedItems);

  // Filter items based on search term
  const getFilteredItems = (items, type) => {
    // Ensure items is an array
    if (!Array.isArray(items)) {
      console.warn(`Items for type ${type} is not an array:`, items);
      return [];
    }

    return items
      .filter((name) => {
        if (typeof name !== "string") {
          console.warn(`Non-string name found in ${type}:`, name);
          return false;
        }
        return name.toLowerCase().includes(searchTerm.toLowerCase());
      })
      .map((name) => ({ name, type }));
  };

  // Render section if it has items
  const renderSection = (title, items) => {
    // Skip if items is undefined (which will happen for ท็อปปิ้ง when there's no data)
    if (!items) return null;

    const filteredItems = getFilteredItems(items, title);
    if (filteredItems.length === 0) return null;

    return (
      <div key={title} className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#D4B28C]">{title}</h2>
        {filteredItems.map((item, index) => (
          <div key={index} className="w-full mb-4">
            <div className="flex justify-between items-center">
              <p className="text-xl">{item.name}</p>
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
        ))}
      </div>
    );
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSuccess = () => {
    navigate("/main-menu");
  };

  const handleAddChoice = () => {
    navigate("/choice-option");
  };

  const handleDeleteClick = (item) => {
    setProductToDelete({
      name: item.name,
      type: item.type, // This will help us determine which endpoint to use
    });
    setIsDeletePopupOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    let endpoint;
    switch (productToDelete.type) {
      case "ขนาดแก้ว":
        endpoint = `${URL}/owner/menus/options/size/${productToDelete.name}`;
        break;
      case "ความหวาน":
        endpoint = `${URL}/owner/menus/options/sweetness/${productToDelete.name}`;
        break;
      case "ท็อปปิ้ง":
        endpoint = `${URL}/owner/menus/options/add-ons`;
        break;
      case "ชนิด":
        endpoint = `${URL}/owner/menus/options/menu_type/${productToDelete.name}`;
        break;
      default:
        console.error("Unknown option type");
        return;
    }

    try {
      const response = await fetchApi(endpoint, "DELETE");

      if (response.ok) {
        await fetchGroupsData();
        setIsDeletePopupOpen(false);
        setProductToDelete(null);
      } else {
        const errorData = await response.json();
        console.error("Error deleting option:", errorData);
        alert("Failed to delete option");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting");
    }
  };

  const handleCancelDelete = () => {
    setIsDeletePopupOpen(false);
    setProductToDelete(null);
  };

  const handleEditClick = (item) => {
    switch (item.type) {
      case "ขนาดแก้ว":
        navigate("/glass-choice", {
          state: {
            mode: "edit",
            groupName: item.name,
          },
        });
        break;
      case "ความหวาน":
        navigate("/sweet-level-choice", {
          state: {
            mode: "edit",
            groupName: item.name,
          },
        });
        break;
      case "ท็อปปิ้ง":
        navigate("/topping-choice", {
          state: {
            mode: "edit",
            groupName: item.name,
          },
        });
        break;
      case "ชนิด":
        navigate("/type-choice", {
          state: {
            mode: "edit",
            groupName: item.name,
          },
        });
        break;
    }
  };

  const handleMenuClick = (item) => {
    navigate("/choice-menu", {
      state: {
        groupName: item.name,
        groupType: item.type,
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

        {/* Search Bar */}
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

        {/* Render Groups */}
        <div className="w-full">
          {Object.entries(groupedItems).some(
            ([_, items]) => items.length > 0
          ) ? (
            Object.entries(groupedItems).map(([type, items]) =>
              renderSection(type, items)
            )
          ) : (
            <p className="text-gray-500 text-center">ไม่มีกลุ่มรายการสินค้า</p>
          )}
        </div>

        {/* Buttons */}
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
