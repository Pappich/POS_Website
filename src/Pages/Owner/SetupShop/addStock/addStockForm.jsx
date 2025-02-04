import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import configureAPI from "../../../../Config/configureAPI";
import { useSelector } from "react-redux";
import fetchApi from "../../../../Config/fetchApi";

const AddStockForm = () => {
  const location = useLocation();
  const { menu, menu_id } = location.state || {};
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;
  const userData = useSelector((state) => state.user.userData);
  const { owner_id } = userData || {};

  console.log("MENU", menu, menu_id);

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [rows, setRows] = useState([{ material: "", unit: "" }]);
  const [selectedType, setSelectedType] = useState("ร้อน");
  const [stockData, setStockData] = useState([]);

  // List options
  const unitOptions = [
    { value: "กรัม", label: "กรัม (g)" },
    { value: "กิโลกรัม", label: "กิโลกรัม (kg)" },
    { value: "มิลลิลิตร", label: "มิลลิลิตร (ml)" },
    { value: "ลิตร", label: "ลิตร (l)" },
    { value: "ชิ้น", label: "ชิ้น (unit)" },
  ];

  const typeItems = ["ร้อน", "เย็น", "ปั่น"];
  const sizeItems = ["เล็ก", "กลาง", "ใหญ่"];

  //store data for each type
  const [typeData, setTypeData] = useState({
    ร้อน: [],
    เย็น: [],
    ปั่น: [],
  });

  const handleTypeClick = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const handleAddRow = () => {
    setRows([...rows, { material: "", unit: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  // select each typ data ex. ร้อน เย็น ปั่น ให้ข้อมูลมันเป็น set
  const handleSizeDataChange = (index, size, value) => {
    const updatedTypeData = { ...typeData };
    if (!updatedTypeData[selectedType][index]) {
      updatedTypeData[selectedType][index] = {};
    }
    updatedTypeData[selectedType][index][size] = value;
    setTypeData(updatedTypeData);
  };

  const handleNext = async () => {
    if (step === 3) {
      const data = {
        owner_id: owner_id,
        branch_id: 2,
        menuData: rows.map((row) => ({
          ingredient_name: row.material,
          unit: row.unit,
          ingredientListForStock: sizeItems.map((size, sizeIndex) => ({
            size_id: sizeIndex + 1,
            menu_type_id: typeItems.indexOf(selectedType) + 1,
            quantity_used: parseInt(
              typeData[selectedType]?.[sizeIndex]?.[size] || 0
            ),
          })),
        })),
      };

      console.log("stock data to send:", data);

      try {
        const response = await fetchApi(`${URL}/owner/menus/stock/10`, "POST", {
          body: JSON.stringify(data),
        });

        if (response.ok) {
          console.log("stock saved successfully!");
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
        <>
          <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="mb-2">รายการวัตถุดิบ</div>
              <div className="mb-2">หน่วย</div>
            </div>

            {rows.map((row, index) => (
              <div key={index} className="grid grid-cols-2 gap-6 mb-4">
                {/* Left Column */}
                <div>
                  <input
                    type="text"
                    placeholder="รายการวัตถุดิบ"
                    value={row.material}
                    onChange={(e) =>
                      handleInputChange(index, "material", e.target.value)
                    }
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                  />
                </div>

                {/* Right Column */}
                <div>
                  <select
                    value={row.unit}
                    onChange={(e) =>
                      handleInputChange(index, "unit", e.target.value)
                    }
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
          </div>

          <button
            onClick={handleAddRow}
            className="w-full py-2 bg-[#F0ECE3] text-[#C6B399] rounded-full font-semibold transition mt-4"
          >
            + เพิ่มวัตถุดิบ
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4 items-start w-full flex">
            <div className="w-[300px] font-bold text-xl mt-4">
              ตัวเลือก:
              <span className="text-[#DD9F52]">ชนิดเครื่องดื่ม</span>
            </div>
            <div className="w-full flex items-start overflow-x-auto whitespace-nowrap pb-2 ml-2">
              {typeItems.map((TypeItem, index) => (
                <button
                  key={index}
                  onClick={() => handleTypeClick(TypeItem)}
                  className={`px-6 py-3 rounded-full border border-[#DD9F52] font-bold ml-2 ${
                    selectedType === TypeItem
                      ? "bg-[#D4B28C] text-white"
                      : "bg-white text-[#DD9F52]"
                  }`}
                >
                  {TypeItem}
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
                {sizeItems.map((size, index) => (
                  <th
                    key={index}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    {size}
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
                  {sizeItems.map((size, sizeIndex) => (
                    <td
                      key={sizeIndex}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      <input
                        type="text"
                        value={typeData[selectedType]?.[index]?.[size] || ""}
                        onChange={(e) =>
                          handleSizeDataChange(index, size, e.target.value)
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
                {typeItems.map((type, typeIndex) => (
                  <th
                    key={typeIndex}
                    className="border border-gray-300 px-4 py-2 text-center"
                    colSpan={sizeItems.length} // Span across all sizes
                  >
                    {type}
                  </th>
                ))}
              </tr>

              {/* Second Header Row: Sizes under each Type */}
              <tr className="bg-gray-100">
                {typeItems.map(() =>
                  sizeItems.map((size, sizeIndex) => (
                    <th
                      key={sizeIndex}
                      className="border border-gray-300 px-4 py-2 text-center"
                    >
                      {size}
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
                    sizeItems.map((size, sizeIndex) => (
                      <td
                        key={sizeIndex}
                        className="border border-gray-300 px-4 py-2 text-center"
                      >
                        {typeData[type]?.[rowIndex]?.[size] || "-"}{" "}
                        {/* Read-only display */}
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
