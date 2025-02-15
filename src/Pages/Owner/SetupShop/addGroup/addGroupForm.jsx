import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import fetchApi from "../../../../Config/fetchApi";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import configureAPI from "../../../../Config/configureAPI";
import LoadingPopup from "../../../../Components/loadingPopup";

const AddGroupForm = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const location = useLocation();
  const { mode, groupData } = location.state || {
    mode: "add",
    groupData: {},
  };

  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { owner_id } = userData || {};
  const [errors, setErrors] = useState("");
  const [selectedMenuErrors, setSelectedMenuErrors] = useState("");

  const handleSearch = (e) => setSearchTerm(e.target.value);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetchApi(`${URL}/owner/menus`, "GET");
        const data = await response.json();

        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  console.log("selectedMenus:", selectedMenus);
  console.log("mode:", mode);
  console.log("owner id:", owner_id);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const categoryId = groupData.category_id;
        const response = await fetchApi(
          `${URL}/owner/categories/${categoryId}/menus`,
          "GET"
        );
        const group = await response.json();
        console.log("Group data:", group);

        if (mode === "edit" && groupData) {
          const menuNames = group.map((menu) => menu.menu_id);

          setGroupName(groupData.category_name || null);
          setSelectedMenus(menuNames || []);
        }
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, []);

  console.log("groupData", groupData);
  console.log("selectedMenus", selectedMenus);

  const handleAddGroup = async () => {
    setLoading(true);
    try {
      if (step === 3) {
        if (owner_id) {
          const endpoint =
            mode === "add"
              ? `${URL}/owner/categories`
              : `${URL}/owner/categories/${groupData.category_id}`;
          const method = mode === "add" ? "POST" : "PATCH";

          const response = await fetchApi(endpoint, method, {
            category_name: groupName,
            menu_id: selectedMenus,
          });

          if (response.ok) {
            navigate("/group-list");
          }
        }
      }
    } catch (error) {
      console.error("Error create category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!validateForm()) return;
    }
    if (step === 2) {
      if (!validateMenuSelect()) return;
    }
    if (step === 3) {
      //ADD HANDLE SEND TO BACKEND
      console.log("save button click");
      handleAddGroup();
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/group-list");
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSelectMenu = (menuId) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const validateForm = () => {
    const newErrors = {};

    if (!groupName.trim()) {
      newErrors.groupName = "กรุณากรอกชื่อกลุ่มสินค้า";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateMenuSelect = () => {
    const newErrors = {};

    if (selectedMenus.length === 0) {
      newErrors.selectedMenus = "กรุณาเลือกอย่างน้อย 1 เมนู";
    }

    setSelectedMenuErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const filteredMenus = menuItems.filter((menu) =>
    menu.menu_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              1. กรอกชื่อกลุ่มรายการสินค้าที่ต้องการ
            </div>
            <label
              htmlFor="groupName"
              className="text-2xl mb-2 w-full text-center"
            >
              ชื่อกลุ่ม
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="กรอกชื่อกลุ่ม..."
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
            {errors.groupName && (
              <p className="text-red-500 text-sm mt-2">{errors.groupName}</p>
            )}
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              2. เลือกเมนูที่ต้องการเพิ่มในกลุ่มรายการสินค้า
              <span className="text-[#DD9F52] ml-2"> {groupName}</span>
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
            <div className="w-full ml-16">
              <label
                htmlFor="productDetails"
                className="text-2xl w-full text-start font-bold"
              >
                เมนูทั้งหมด
              </label>
              <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
                {filteredMenus.map((menu) => (
                  <label
                    key={menu.menu_id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMenus.includes(menu.menu_id)}
                      onChange={() => handleSelectMenu(menu.menu_id)}
                      className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                    />
                    <span>{menu.menu_name}</span>
                  </label>
                ))}
              </div>
            </div>
            {selectedMenuErrors.selectedMenus && (
              <p className="text-red-500 text-sm mt-2">
                {selectedMenuErrors.selectedMenus}
              </p>
            )}
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              3. สรุปกลุ่มรายการสินค้า
              <span className="text-[#DD9F52] ml-2"> {groupName}</span>
            </div>
            <div className="w-full ml-16">
              <label
                htmlFor="selectedMenus"
                className="text-2xl w-full text-start font-bold"
              >
                เมนูทั้งหมดในหมวดหมู่
              </label>
              <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
                {selectedMenus.map((menuId) => {
                  const menu = menuItems.find((m) => m.menu_id === menuId);
                  return (
                    <div key={menuId} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked
                        readOnly
                        className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                      />
                      <span>{menu?.menu_name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">เพิ่มกลุ่มรายการสินค้า</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-center w-full">
            {renderStepContent()}
          </div>

          <div className="flex fixed bottom-4 left-0 px-4 py-4 mt-8 w-full space-x-8 justify-between">
            <button
              className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
              onClick={handleBack}
            >
              ย้อนกลับ
            </button>
            <button
              className="px-14 py-4 w-[300px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
              onClick={handleNext}
            >
              {step < 3 ? "ถัดไป" : "บันทึก"}
            </button>
          </div>
        </div>
      </div>

      <LoadingPopup loadingStatus={loading} />
    </>
  );
};

export default AddGroupForm;
