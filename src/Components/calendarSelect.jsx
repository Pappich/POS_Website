import React, { useState } from "react";
import { CiCalendar } from "react-icons/ci";
import {
  IoIosArrowDown,
  IoIosArrowBack,
  IoIosArrowForward,
} from "react-icons/io";

const CalendarSelect = () => {
  // State to track if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track the selected month
  const [selectedMonth, setSelectedMonth] = useState("มกราคม"); // Default to "มกราคม"
  // State to track the selected year
  const [selectedYear, setSelectedYear] = useState(2567); // Default to 2567
  // State to track if the modal is in Year Selector Mode
  const [isYearSelector, setIsYearSelector] = useState(false);

  // List of months
  const months = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  // List of years (example: 2560-2569)
  const years = Array.from({ length: 10 }, (_, i) => 2560 + i);

  // Function to toggle modal visibility
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Function to handle clicks outside the modal
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-1 py-0.2 mb-2"
        onClick={toggleModal}
      >
        <div className="flex">
          <CiCalendar size={17} />
          <span className="pl-1 pr-1">{`${selectedMonth} พ.ศ. ${selectedYear}`}</span>
          <span className="pt-0.5">
            <IoIosArrowDown size={17} />
          </span>
        </div>
      </button>

      {/* Modal Popup */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOutsideClick} // Close modal when clicking outside
        >
          <div
            className="bg-white p-6 rounded-lg w-[685px] shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {isYearSelector ? (
              // Year Selector Mode
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-lg">เลือกปี</span>
                  <button
                    onClick={() => setIsYearSelector(false)}
                    className="text-[#C6B399] hover:text-gray-700 font-medium"
                  >
                    กลับไปเลือกเดือน
                  </button>
                </div>
                <ul className="grid grid-cols-3 gap-4 max-h-48 overflow-y-auto">
                  {years.map((year) => (
                    <li
                      key={year}
                      className={`px-4 py-1 cursor-pointer text-center ${
                        selectedYear === year
                          ? "bg-[#C6B399] rounded-full text-white"
                          : "hover:bg-[#F1EBE1] hover:rounded-full"
                      }`}
                      onClick={() => {
                        setSelectedYear(year);
                        setIsYearSelector(false); // Go back to Month Selector Mode after selecting a year
                      }}
                    >
                      {year}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              // Month Selector Mode
              <div>
                <div className="flex justify-between items-center mb-4">
                  <button
                    type="button"
                    className="font-bold"
                    onClick={() => setIsYearSelector(true)}
                  >
                    <div className="flex">
                      <span className="pl-1 pr-1 text-[#737373] hover:text-gray-700">
                        {selectedYear}
                      </span>
                      <span className="pt-0.5 text-[#CCCCCC] hover:text-gray-700">
                        <IoIosArrowDown size={17} />
                      </span>
                    </div>
                  </button>
                  <div>
                    <button
                      className="text-xl font-bold text-[#CCCCCC] hover:text-gray-700"
                      onClick={() => setSelectedYear((prev) => prev - 1)}
                    >
                      <IoIosArrowBack />
                    </button>
                    <button
                      className="text-xl font-bold text-[#CCCCCC] hover:text-gray-700"
                      onClick={() => setSelectedYear((prev) => prev + 1)}
                    >
                      <IoIosArrowForward />
                    </button>
                  </div>
                </div>

                {/* Month Selector */}
                <ul className="grid grid-cols-3 gap-4">
                  {months.map((month) => (
                    <li
                      key={month}
                      className={`px-4 py-1 cursor-pointer text-center ${
                        selectedMonth === month
                          ? "bg-[#C6B399] rounded-full text-white"
                          : "hover:bg-[#F1EBE1] hover:rounded-full"
                      }`}
                      onClick={() => setSelectedMonth(month)}
                    >
                      {month}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="text-[#C6B399] mt-6 bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-1 py-0.2 mb-2"
              onClick={toggleModal}
            >
              <div className="flex ">
                <span className="px-16 font-bold text-2xl">ย้อนกลับ</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarSelect;
