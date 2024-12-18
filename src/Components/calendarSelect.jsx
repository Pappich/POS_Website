import React from "react";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
const CalendarSelect = () => {
  return (
    <div>
      <button
        type="button"
        class="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-1 py-0.2 me-2 mb-2 "
      >
        <div className="flex">
          <CiCalendar size={17} />
          <span className="pl-1 pr-1">15 มกราคม พ.ศ. 2567</span>
          <span className="pt-0.5">
            <IoIosArrowDown size={17} />
          </span>
        </div>
      </button>
    </div>
  );
};

export default CalendarSelect;
