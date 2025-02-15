import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocation } from "react-router-dom";

const TypeChoice = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};

  const navigate = useNavigate();
  const groupedMenus = [];
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [choices, setChoices] = useState([{ name: "", price: "" }]);
  const [typeData, setTypeData] = useState([]);
  const [isRequired, setIsRequired] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  const [menuData, setMenuData] = useState({
    available_category: [],
    available_menus: [],
  });
  const [errors, setErrors] = useState({
    price: "",
    choiceName: "",
    menuSelection: "",
  });
  const location = useLocation();
  const { mode } = location.state || {
    mode: "add",
    choices: {},
  };

  useEffect(() => {
    fetchApi(`${URL}/customer/menus`, "GET")
      .then((response) => response.json())
      .then((data) => {
        setMenuData(data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  useEffect(() => {
    if (mode === "edit") {
      fetchApi(`${URL}/owner/menus/options/menu-type`, "GET")
        .then((response) => response.json())
        .then((data) => {
          setTypeData(data);

          const uniqueNames = new Set();

          const updatedChoices = data
            .filter((item) => {
              if (!uniqueNames.has(item.name)) {
                uniqueNames.add(item.name);
                return true;
              }
              return false;
            })
            .map((item) => ({
              id: item.id,
              name: item.name,
              price: item.price_difference,
            }));

          setChoices(updatedChoices);
        })
        .catch((error) => {
          console.error("Error fetching glass size data:", error);
        });
    }
  }, [mode]);

  useEffect(() => {
    if (mode !== "edit") {
      setChoices([{ name: "", price: "" }]);
    }
  }, [mode]);

  menuData.available_menus.forEach((menu) => {
    menu.category.forEach((category) => {
      let group = groupedMenus.find(
        (g) => g.category_name === category.category_name
      );

      if (!group) {
        // If the group doesn't exist, create a new one
        groupedMenus.push({
          category_name: category.category_name,
          category_id: category.category_id,
          menus: [
            {
              menu_id: menu.menu_id,
              menu_name: menu.menu_name,
            },
          ],
        });
      } else {
        // If the group exists, add the menu to the existing group
        group.menus.push({
          menu_id: menu.menu_id,
          menu_name: menu.menu_name,
        });
      }
    });
  });

  console.log(groupedMenus);

  const handleNext = async () => {
    console.log("choices:", choices);

    let valid = true;
    const newErrors = { price: "", choiceName: "", menuSelection: "" };

    // case price
    choices.forEach((choice, index) => {
      if (!choice.price || isNaN(choice.price)) {
        valid = false;
        newErrors.price = "กรุณากรอกเฉพาะตัวเลขเท่านั้น";
      } else {
        newErrors.price = "";
      }

      if (!choice.name) {
        valid = false;
        newErrors.choiceName = "กรุณากรอกชื่อช้อยส์";
      } else if (index === choices.length - 1 && !choice.name) {
        valid = false;
        newErrors.choiceName = "กรุณากรอกชื่อช้อยส์";
      } else {
        newErrors.choiceName = "";
      }
    });

    // case select menu
    if (step === 2 && selectedMenus.length === 0) {
      valid = false;
      newErrors.menuSelection = "กรุณาเลือกอย่างน้อย 1 เมนู";
    } else {
      newErrors.menuSelection = "";
    }

    setErrors(newErrors);
    console.log("ERROR:", errors);

    if (valid) {
      if (step === 3) {
        const formattedOptions = choices.map((option) => ({
          [option.name]: parseFloat(option.price),
        }));

        const requestData = {
          options: formattedOptions,
          menu_id: selectedMenus,
          is_required: isRequired,
        };

        console.log("requestData:", requestData);

        try {
          if (owner_id) {
            const response = await fetchApi(
              `${URL}/owner/menus/options/menu-type`,
              "POST",
              requestData
            );

            if (response.ok) {
              const data = await response.json();
              console.log("Response JSON:", data);
              navigate("/choice-list");
            } else {
              console.error("Error:", response.statusText);
            }
          }
        } catch (error) {
          console.error("Request failed:", error);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const handleBack = () => {
    if (step === 1) {
      if (mode === "edit") {
        navigate("/choice-list");
      } else {
        navigate("/choice-option");
      }
    } else {
      setStep(step - 1);
    }
  };

  const handleChoiceChange = (index, field, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index][field] = value;
    setChoices(updatedChoices);
  };

  const addChoice = () => {
    setChoices((prev) => [...prev, { name: "", price: "" }]);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSelectMenu = (menuId) => {
    setSelectedMenus((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSelectAllInGroup = (group) => {
    const groupMenuIds = group.menus.map((menu) => menu.menu_id);
    const allSelected = groupMenuIds.every((id) => selectedMenus.includes(id));

    if (allSelected) {
      setSelectedMenus((prev) =>
        prev.filter((id) => !groupMenuIds.includes(id))
      );
    } else {
      setSelectedMenus((prev) => [...new Set([...prev, ...groupMenuIds])]);
    }
  };

  const filteredGroups = groupedMenus.map((group) => ({
    ...group,
    menus: group.menus.filter((menu) =>
      menu.menu_name.normalize("NFD").includes(searchTerm.normalize("NFD"))
    ),
  }));

  const toggleGroup = (categoryId) => {
    setExpandedGroups((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

  const removeChoice = (index) => {
    setChoices((prev) => prev.filter((_, i) => i !== index));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              1. เพิ่มช้อยส์ในตัวเลือก:
              <span className="text-[#D4B28C] ml-2">ชนิด</span>
            </div>

            <div className="flex mb-4 w-full items-center">
              <div className="mr-12">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isRequired}
                    onChange={() => setIsRequired(!isRequired)}
                    className="form-checkbox h-5 w-5 accent-[#DD9F52] mr-2"
                  />
                  ลูกค้าจำเป็นต้องเลือก
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 mb-4 w-full">
              <div className="font-bold mb-2">ชื่อช้อยส์</div>
              <div className="font-bold mb-2 ml-4">
                ส่วนต่างของราคาที่คิดเพิ่ม (บาท)
              </div>
            </div>

            {/* Form Section */}
            {choices.map((choice, index) => (
              <div
                key={index}
                className="grid grid-cols-[1fr_1fr_auto] gap-4 mb-6 w-full items-center"
              >
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="กรอกชื่อช้อยส์ที่ต้องการ..."
                    value={choice.name}
                    onChange={(e) =>
                      handleChoiceChange(index, "name", e.target.value)
                    }
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                  />
                  {errors.choiceName && (
                    <div className="absolute text-red-500 text-sm mt-1">
                      {errors.choiceName}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="ยังไม่มีข้อมูล..."
                    value={choice.price}
                    onChange={(e) =>
                      handleChoiceChange(index, "price", e.target.value)
                    }
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                  />
                  {errors.price && (
                    <div className="absolute text-red-500 text-lg mt-1">
                      {errors.price}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeChoice(index)}
                  className="font-bold border border-red-300 text-red-300 w-14 h-8 flex items-center justify-center rounded-full hover:bg-red-500 hover:text-white"
                >
                  <AiOutlineDelete size={36} />
                </button>
              </div>
            ))}

            <button
              onClick={addChoice}
              className="w-full py-2 bg-[#F0ECE3] text-[#C6B399] rounded-full font-semibold mt-4"
            >
              + เพิ่มช้อยส์
            </button>
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              2. เลือกเมนูที่ต้องการใช้ตัวเลือก:
              <span className="text-[#D4B28C] ml-2">ชนิด</span>
            </div>

            <div className="w-full flex justify-start text-xl mb-8">
              <div className="relative flex items-start w-full">
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

            <label
              htmlFor="selectedMenus"
              className="text-2xl w-full text-start font-bold"
            >
              เมนูทั้งหมด
            </label>

            {filteredGroups.map((group) => (
              <div
                className="w-full flex justify-start mt-2"
                key={group.category_id}
              >
                <div className="w-full mb-8">
                  <div
                    className="flex items-center justify-between w-full px-3 py-2 border border-gray-100 rounded-full cursor-pointer"
                    onClick={() => toggleGroup(group.category_id)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={group.menus.every((menu) =>
                          selectedMenus.includes(menu.menu_id)
                        )}
                        onChange={() => handleSelectAllInGroup(group)}
                        className="form-checkbox h-5 w-5 accent-[#DD9F52] mr-3"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="font-bold text-2xl">
                        {group.category_name}
                      </span>
                    </div>
                    <button className="ml-auto focus:outline-none">
                      {expandedGroups[group.category_id] ? (
                        <FaChevronUp className="text-[#DD9F52]" />
                      ) : (
                        <FaChevronDown className="text-[#DD9F52]" />
                      )}
                    </button>
                  </div>

                  {/* Render menus only if the group is expanded */}
                  {expandedGroups[group.category_id] && (
                    <div className="ml-8 grid grid-cols-4 gap-4 mt-2">
                      {group.menus.map((menu) => (
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
                  )}
                </div>
              </div>
            ))}
            {errors.menuSelection && (
              <div className="text-red-500 text-lg mt-2">
                {errors.menuSelection}
              </div>
            )}
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full flex justify-start text-2xl mb-5 font-bold">
              3. สรุปตัวเลือก:
              <span className="text-[#D4B28C] ml-2">ชนิด</span>
            </div>

            <div className="w-full ml-16">
              <label
                htmlFor="selectedMenus"
                className="text-2xl w-full text-start font-bold"
              >
                เมนูทั้งหมดที่ใช้ในตัวเลือก
              </label>
              <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
                {selectedMenus.map((menuId) => {
                  const menu = menuData.available_menus.find(
                    (m) => m.menu_id === menuId
                  );

                  return (
                    <div
                      key={menu.menu_id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={true}
                        className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                        readOnly
                      />
                      <span>{menu.menu_name}</span>
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
    <div className="flex flex-col items-center bg-white">
      {/* Header */}
      <div className="text-center mb-10 mt-[40px]">
        <h1 className="text-3xl font-bold mb-2">เพิ่มตัวเลือก</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      {/* Render step content using switch */}
      {renderStepContent()}

      {/* Buttons */}
      <div className="flex fixed bottom-4 left-0 px-4 py-4 bg-white w-full space-x-8 justify-between">
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
  );
};

export default TypeChoice;
