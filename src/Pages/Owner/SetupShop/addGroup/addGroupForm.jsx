import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AddGroupForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleNext = () => {
    if (step === 3) {
      //ADD HANDLE SEND TO BACKEND
      navigate("/group-list");
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

  // SELECT MENU
  const menus = [
    "กาแฟดำ",
    "ชามบไต้หวัน",
    "ชามนไข่มุก",
    "ชามนสตรอเบอรี่",
    "ชามนบลูเบอรี่",
    "ชามนแอปเปิ้ล",
    "ชามกีวี",
    "เอสเปรสโซ่",
    "อเมริกาโน่",
    "การแฟโบราณ",
    "มอคค่า",
    "ลาเต้",
    "คาปูชิโน่",
    "สตอเบอรี่โซดา",
    "บลูเบอรี่โซดา",
    "แอปเปิ้ลโซดา",
    "กีวี่โซดา",
    "ชาพีช",
    "พีซโซดา",
  ];

  const handleSelectMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const filteredGroups = menus.filter((menu) =>
    menu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              1. กรอกชื่อกลุ่มรายการสินค้าที่ต้องการ
            </div>
            <label
              htmlFor="groupName"
              className="text-lg mb-2 w-full text-center"
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
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              2. เลือกเมนูที่ต้องการเพิ่มในกลุ่มรายการสินค้า
              <span className="text-[#DD9F52] ml-2"> {groupName}</span>
            </div>

            <div className="w-full flex justify-start text-lg mb-8">
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
                className="text-lg w-full text-start font-bold"
              >
                เมนูทั้งหมด
              </label>
              <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
                {filteredGroups.map((menu, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedMenus.includes(menu)}
                      onChange={() => handleSelectMenu(menu)}
                      className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                    />
                    <span>{menu}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              3. สรุปกลุ่มรายการสินค้า
              <span className="text-[#DD9F52] ml-2"> {groupName}</span>
            </div>
            <div className="w-full ml-16">
              <label
                htmlFor="selectedMenus"
                className="text-lg w-full text-start font-bold"
              >
                เมนูทั้งหมดในหมวดหมู่
              </label>
              <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
                {selectedMenus.map((menu, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={true}
                      className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                    />
                    <span>{menu}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">เพิ่มกลุ่มรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center w-full">
          {renderStepContent()}
        </div>

        <div className="flex mt-8 w-full space-x-8 justify-between">
          <button
            className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
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
    </div>
  );
};

export default AddGroupForm;
