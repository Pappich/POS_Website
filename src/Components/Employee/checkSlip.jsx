import React from "react";
import configureAPI from "../../Config/configureAPI";

const CheckSlip = ({ imageUrl }) => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const image_url = `${URL}/${imageUrl.replace(/\\/g, "/")}`;

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white w-[500px] h-auto rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold text-center mb-1">
            ตรวจสอบสลิปโอนเงิน
          </h2>
          <hr className="h-0.5 bg-[#DD9F52] border-0" />

          <img src={image_url} alt="Slip" className="w-full h-auto mb-4 mt-2" />

          <div className="flex justify-between space-x-4 mt-10">
            <button
              className="w-full text-[#C6B399] border border-[#C6B399] hover:bg-[#afafaf] hover:text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                //cancel
              }}
            >
              ยกเลิก
            </button>
            <button
              className="w-full text-[#C6B399] border border-[#C6B399] hover:bg-[#afafaf] hover:text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                //call retake slip
              }}
            >
              ถ่ายใหม่
            </button>
            <button
              className="w-full bg-[#C6B399] hover:bg-[#a69781] text-white font-bold py-2 px-4 rounded-full"
              onClick={() => {
                //send all order detail to backend
              }}
            >
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckSlip;
