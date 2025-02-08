import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import configureAPI from "../../../../Config/configureAPI";
import { useSelector } from "react-redux";
import fetchApi from "../../../../Config/fetchApi";
import { useEffect } from "react";

const AddStockForm = () => {
  const location = useLocation();
  const { menu, menu_id } = location.state || {};
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;
  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState([{ material: "", unit: "" }]);
  const [sizeItems, setSizeItems] = useState([]);
  const [typeItems, setTypeItems] = useState([]);
  const [addOnItems, setAddOnItems] = useState([]);
  const [selectedType, setSelectedType] = useState(typeItems[0]?.menu_type_id);
  const [typeData, setTypeData] = useState({ selectedType: [] });
  const [stockData, setStockData] = useState([]);
  const [ingredientData, setIngredientData] = useState([]);
  const [menuIngredientData, setMenuIngredientData] = useState([]);
  const [filterIngredientData, setFilterIngredientData] = useState([]);

  // List options
  const unitOptions = [
    { value: "กรัม", label: "กรัม (g)" },
    { value: "กิโลกรัม", label: "กิโลกรัม (kg)" },
    { value: "มิลลิลิตร", label: "มิลลิลิตร (ml)" },
    { value: "ลิตร", label: "ลิตร (l)" },
    { value: "ชิ้น", label: "ชิ้น (unit)" },
  ];

  // fetch ingredient
  useEffect(() => {
    fetchApi(`${URL}/owner/ingredient/${menu_id}`, "GET")
      .then((response) => response.json())
      .then((data) => {
        if (
          data.ingredients &&
          Array.isArray(data.ingredients) &&
          data.ingredients.length > 0
        ) {
          setIngredientData(
            data.ingredients.map((item) => ({
              ingredient_id: item.ingredient_id,
              ingredient_name: item.ingredient_name,
              ingredient_unit: item.ingredient_unit || "",
            }))
          );
        } else {
          console.error("Unexpected ingredient data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching ingredient data:", error);
      });
  }, []);

  console.log("ingredient data:", ingredientData);

  //fetch size
  useEffect(() => {
    fetchApi(`${URL}/owner/menus/options/size/${menu_id}`, "GET")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSizeItems(
            data.map((item) => ({
              size_id: item.size_id,
              size_name: item.size_name,
            }))
          );
        } else {
          console.error("Unexpected size data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching size data:", error);
      });
  }, []);

  //fetch type
  useEffect(() => {
    fetchApi(`${URL}/owner/menus/options/menu-type/${menu_id}`, "GET")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTypeItems(
            data.map((item) => ({
              menu_type_id: item.menu_type_id,
              menu_type_name: item.type_name,
            }))
          );
        } else {
          console.error("Unexpected type data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching type data:", error);
      });
  }, []);

  //set first select type
  useEffect(() => {
    if (typeItems.length > 0 && !selectedType) {
      setSelectedType(typeItems[0].menu_type_id);
    }
  }, [typeItems, selectedType]);

  //fetch add on
  useEffect(() => {
    fetchApi(`${URL}/owner/menus/options/add-ons/${menu_id}`, "GET")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAddOnItems(
            data.map((item) => ({
              add_on_id: item.add_on_id,
              add_on_name: item.add_on_name,
            }))
          );
        } else {
          console.error("Unexpected size data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching size data:", error);
      });
  }, []);

  //fetch menu ingredient
  useEffect(() => {
    fetchApi(`${URL}/owner/menus/options/add-ons/${menu_id}`, "GET")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMenuIngredientData(
            data.map((item) => ({
              add_on_id: item.add_on_id,
              add_on_name: item.add_on_name,
            }))
          );
        } else {
          console.error("Unexpected size data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching size data:", error);
      });
  }, []);

  console.log("typeItems:", typeItems);
  console.log("sizeItems:", sizeItems);
  console.log("AddOnItems:", addOnItems);

  // filter add on out of ingredient
  useEffect(() => {
    const addOnNames = addOnItems.map((item) => item.add_on_name);

    const filteredIngredients = ingredientData.filter(
      (ingredient) => !addOnNames.includes(ingredient.ingredient_name)
    );

    setFilterIngredientData(filteredIngredients);
  }, [addOnItems, ingredientData]);

  console.log("filter ingredientData:", filterIngredientData);

  //store data for each type
  const handleTypeClick = (type) => {
    setSelectedType(
      type.menu_type_id === selectedType ? null : type.menu_type_id
    );
  };

  const handleAddRow = () => {
    const newRow = { material: "", ingredient_id: null };

    if (filterIngredientData.length > 0) {
      setFilterIngredientData([...filterIngredientData, newRow]);
    } else {
      setRows([...rows, newRow]);
    }
  };

  const handleInputChange = (index, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row, idx) =>
        idx === index ? { ...row, [field]: value } : row
      )
    );
  };

  const handleInputChangeForFilter = (ingredientId, field, value) => {
    setFilterIngredientData((prevData) =>
      prevData.map((ingredient) =>
        ingredient.ingredient_id === ingredientId
          ? { ...ingredient, [field]: value }
          : ingredient
      )
    );
  };

  // select each typ data ex. ร้อน เย็น ปั่น ให้ข้อมูลมันเป็น set
  const handleSizeDataChange = (rowIndex, sizeId, value) => {
    setTypeData((prevData) => ({
      ...prevData,
      [selectedType]: {
        ...(prevData[selectedType] || {}),
        [rowIndex]: {
          ...(prevData[selectedType]?.[rowIndex] || {}),
          [sizeId]: value,
        },
      },
    }));
  };

  const handleNext = async () => {
    if (step === 3) {
      const data = {
        owner_id: 16,
        branch_id: 2,
        menuData: rows.map((row, index) => {
          return {
            ingredient_name: row.material,
            unit: row.unit,
            ingredientListForStock: sizeItems
              .map((size) => {
                return typeItems.map((menuType) => {
                  const size_id = size.size_id;
                  const menu_type_id = menuType.menu_type_id;

                  const quantityUsed = parseFloat(
                    typeData[menu_type_id]?.[index]?.[size_id]
                  );

                  return {
                    size_id,
                    menu_type_id,
                    quantity_used: quantityUsed,
                  };
                });
              })
              .flat(),
          };
        }),
      };

      console.log("DATA:", data);

      try {
        const response = await fetchApi(
          `${URL}/owner/menus/stock/${menu_id}`,
          "PATCH",
          data
        );

        if (response.ok) {
          console.log("stock saved successfully!");
          navigate("/stock-list");
        } else {
          console.error("Failed to link stock data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/stock-list");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">ระบบตัดคลังสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="flex items-start w-full font-bold text-xl">
        วัตถุดิบ และปริมาณที่ใช้: {menu}
      </div>

      {step === 1 && (
        <div className="space-y-4 w-full">
          <div className="grid grid-cols-2 gap-6 mt-4">
            <div className="mb-2">รายการวัตถุดิบ</div>
            <div className="mb-2">หน่วย</div>
          </div>

          {/* Conditional Rendering */}
          {(filterIngredientData.length === 0
            ? rows
            : filterIngredientData
          ).map((ingredient, index) => (
            <div
              key={ingredient.ingredient_id || index}
              className="grid grid-cols-2 gap-6 mb-4"
            >
              <div>
                <input
                  type="text"
                  placeholder="รายการวัตถุดิบ"
                  value={ingredient.material || ingredient.ingredient_name}
                  onChange={(e) => {
                    const field = "material";
                    if (ingredient.ingredient_id) {
                      handleInputChangeForFilter(
                        ingredient.ingredient_id,
                        field,
                        e.target.value
                      );
                    } else {
                      handleInputChange(index, field, e.target.value);
                    }
                  }}
                  className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                />
              </div>

              <div>
                <select
                  value={ingredient.unit || ingredient.ingredient_unit}
                  onChange={(e) => {
                    const field = "unit";
                    if (ingredient.ingredient_id) {
                      handleInputChangeForFilter(
                        ingredient.ingredient_id,
                        field,
                        e.target.value
                      );
                    } else {
                      handleInputChange(index, field, e.target.value);
                    }
                  }}
                  className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                >
                  <option value="">เลือกหน่วย</option>
                  {unitOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          {/* Button to add new row */}
          <button
            onClick={handleAddRow}
            className="w-full py-2 bg-[#F0ECE3] text-[#C6B399] rounded-full font-semibold transition mt-4"
          >
            + เพิ่มวัตถุดิบ
          </button>
        </div>
      )}
      {step === 2 && (
        <>
          <div className="mb-4 items-start w-full flex">
            <div className="w-[300px] font-bold text-xl mt-4">
              ตัวเลือก:
              <span className="text-[#DD9F52]">ชนิดเครื่องดื่ม</span>
            </div>
            <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 ml-2">
              {typeItems.map((type) => (
                <button
                  key={type.menu_type_id}
                  onClick={() => handleTypeClick(type)}
                  className={`px-6 py-3 rounded-full border border-[#DD9F52] font-bold ml-2 ${
                    selectedType === type.menu_type_id
                      ? "bg-[#D4B28C] text-white"
                      : "bg-white text-[#DD9F52]"
                  }`}
                >
                  {type.menu_type_name}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="border border-gray-300 px-4 py-2 text-center"
                  rowSpan={2}
                >
                  รายการวัตถุดิบ
                </th>
                <th
                  className="border border-gray-300 px-4 py-2 text-center"
                  colSpan={sizeItems.length}
                >
                  ขนาด
                </th>
              </tr>
              <tr className="bg-gray-100">
                {sizeItems &&
                  sizeItems.length > 0 &&
                  sizeItems.map((size) => (
                    <th
                      key={size.size_id}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {size.size_name}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="bg-white text-start">
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}. {row.material} ({row.unit})
                  </td>
                  {sizeItems.map((size) => (
                    <td
                      key={size.size_id}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      <input
                        type="text"
                        value={
                          typeData[selectedType]?.[index]?.[size.size_id] || ""
                        }
                        onChange={(e) =>
                          handleSizeDataChange(
                            index, // This is your row index for the outer loop
                            size.size_id,
                            e.target.value
                          )
                        }
                        className="w-full border rounded p-2"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {step === 3 && (
        <div className="w-full">
          <table className="w-full border-collapse border border-gray-200 mt-4">
            {/* Table Header */}
            <thead>
              {/* First Header Row: Group Types */}
              <tr className="bg-gray-100">
                <th
                  className="border border-gray-300 px-4 py-2 text-center"
                  rowSpan={2}
                >
                  รายการวัตถุดิบ
                </th>
                {typeItems.map((type) => (
                  <th
                    key={type.menu_type_id}
                    className="border border-gray-300 px-4 py-2 text-center"
                    colSpan={sizeItems.length}
                  >
                    {type.menu_type_name}
                  </th>
                ))}
              </tr>

              {/* Second Header Row: Sizes under each Type */}
              <tr className="bg-gray-100">
                {typeItems.map(() =>
                  sizeItems.map((size) => (
                    <th
                      key={size.size_id}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {size.size_name}
                    </th>
                  ))
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-white text-start">
                  <td className="border border-gray-300 px-4 py-2">
                    {rowIndex + 1}. {row.material} ({row.unit})
                  </td>
                  {typeItems.map((type) =>
                    sizeItems.map((size) => (
                      <td
                        key={`${type.menu_type_id}-${size.size_id}`}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {typeData[type.menu_type_id]?.[rowIndex]?.[
                          size.size_id
                        ] || "-"}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex mt-8 w-full space-x-8 justify-between">
        <button
          className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] font-bold"
          onClick={handleBack}
        >
          ย้อนกลับ
        </button>
        <button
          className="px-6 py-3 w-[250px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
          onClick={handleNext}
        >
          {step < 3 ? "ถัดไป" : "บันทึก"}
        </button>
      </div>
    </div>
  );
};

export default AddStockForm;
