import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";

const GlassChoice = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState({});

  const handleNext = () => {
    if (step === 3) {
      // Add handle send to backend
      navigate("/choice-list");
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/choice-option");
    } else {
      setStep(step - 1);
    }
  };

  const groupedMenus = [
    {
      group: "กาแฟ",
      menus: ["กาแฟดำ", "เอสเปรสโซ่", "อเมริกาโน่", "มอคค่า"],
    },
    {
      group: "ชา",
      menus: [
        "ชานมไต้หวัน",
        "ชานมไข่มุก",
        "ชานมสตรอเบอรี่",
        "ชานมบลูเบอรี่",
        "ชานมแอปเปิ้ล",
        "ชานมกีวี่",
      ],
    },
    {
      group: "โซดา",
      menus: [
        "สตอเบอรี่โซดา",
        "บลูเบอรี่โซดา",
        "แอปเปิ้ลโซดา",
        "กีวี่โซดา",
        "พีชโซดา",
      ],
    },
    {
      group: "ชาผลไม้",
      menus: [
        "ชาพีช",
        "ชาสตรอเบอร์รี่",
        "ชาบลูเบอร์รี่",
        "ชากีวี่",
        "ชาแอปเปิ้ล",
      ],
    },
  ];

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSelectMenu = (menu) => {
    setSelectedMenus((prev) =>
      prev.includes(menu)
        ? prev.filter((item) => item !== menu)
        : [...prev, menu]
    );
  };

  const handleSelectAllInGroup = (group) => {
    const groupMenus = group.menus;
    const allSelected = groupMenus.every((menu) =>
      selectedMenus.includes(menu)
    );

    if (allSelected) {
      // Deselect all in group
      setSelectedMenus((prev) =>
        prev.filter((menu) => !groupMenus.includes(menu))
      );
    } else {
      // Select all in group
      setSelectedMenus((prev) => [
        ...prev,
        ...groupMenus.filter((menu) => !prev.includes(menu)),
      ]);
    }
  };

  const filteredGroups = groupedMenus.map((group) => ({
    ...group,
    menus: group.menus.filter((menu) =>
      menu.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  const toggleGroup = (groupName) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              1. เพิ่มช้อยส์ในตัวเลือก:
              <span className="text-[#D4B28C] ml-2"> ขนาดแก้ว</span>
            </div>

            {/* Form Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <label className="block font-bold mb-2">ชื่อช้อยส์</label>
                  <input
                    type="text"
                    placeholder="กรอกชื่อช้อยส์ที่ต้องการ..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400 mb-2"
                  />
                  <input
                    type="text"
                    placeholder="กรอกชื่อช้อยส์ที่ต้องการ..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400  mb-2"
                  />
                  <input
                    type="text"
                    placeholder="กรอกชื่อช้อยส์ที่ต้องการ..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400  mb-2"
                  />
                </div>

                {/* Right Column */}
                <div>
                  <label className="block font-bold mb-2">
                    ส่วนต่างของราคาที่คิดเพิ่ม (บาท)
                  </label>
                  <input
                    type="text"
                    placeholder="ยังไม่มีข้อมูล..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400  mb-2"
                  />
                  <input
                    type="text"
                    placeholder="ยังไม่มีข้อมูล..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400  mb-2"
                  />
                  <input
                    type="text"
                    placeholder="ยังไม่มีข้อมูล..."
                    className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400  mb-2"
                  />
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              2. เลือกเมนูที่ต้องการใช้ตัวเลือก:
              <span className="text-[#D4B28C] ml-2"> ขนาดแก้ว</span>
            </div>

            <div className="w-full flex justify-start text-lg mb-8">
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
              className="text-lg w-full text-start font-bold"
            >
              เมนูทั้งหมด
            </label>

            {/* Render grouped menus */}
            {filteredGroups.map((group, groupIndex) => (
              <div className="w-full flex justify-start mt-4">
                <div key={groupIndex} className="w-full mb-8">
                  <div className="flex items-center justify-between space-x-2 mb-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={group.menus.every((menu) =>
                          selectedMenus.includes(menu)
                        )}
                        onChange={() => handleSelectAllInGroup(group)}
                        className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                      />
                      <span className="font-bold text-lg ml-4">
                        {group.group}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleGroup(group.group)}
                      className="ml-auto focus:outline-none"
                    >
                      {expandedGroups[group.group] ? (
                        <FaChevronUp className="text-[#DD9F52]" />
                      ) : (
                        <FaChevronDown className="text-[#DD9F52]" />
                      )}
                    </button>
                  </div>

                  {/* Conditionally render menus if group is expanded */}
                  {expandedGroups[group.group] && (
                    <div className="ml-8 grid grid-cols-4 gap-4">
                      {group.menus.map((menu, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2"
                        >
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
                  )}
                </div>
              </div>
            ))}
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              3. สรุปตัวเลือก:
              <span className="text-[#D4B28C] ml-2"> ขนาดแก้ว</span>
            </div>

            <div className="w-full ml-16">
              <label
                htmlFor="selectedMenus"
                className="text-lg w-full text-start font-bold"
              >
                เมนูทั้งหมดที่ใช้ในตัวเลือก
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
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">เพิ่มตัวเลือก</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      {/* Render step content using switch */}
      {renderStepContent()}

      {/* Buttons */}
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
  );
};

export default GlassChoice;
