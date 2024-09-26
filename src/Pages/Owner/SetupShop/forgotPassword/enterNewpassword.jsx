import React from "react";
import { FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useState } from "react";

const EnterNewPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirm = () => {
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <div className="font-noto flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-black mb-2 text-left">ตั้งรหัสผ่านใหม่</h2>
        <p className="text-primaryRegular text-gray-500 mb-6 text-left">
          กรุณากรอกรหัสผ่านที่ต้องการเพื่อตั้งค่ารหัสผ่านใหม่
        </p>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        <div className="mb-4">
          <label className="block text-black mb-2 text-left" htmlFor="username">
            รหัสผ่าน
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaLock style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="กรอกรหัสผ่าน..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="ml-2"
            >
              {showPassword ? (
                <BsEyeSlash style={{ color: "#D4B28C" }} />
              ) : (
                <BsEye style={{ color: "#D4B28C" }} />
              )}
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-black mb-2 text-left" htmlFor="username">
            ยืนยันรหัสผ่าน
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaLock style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="กรอกรหัสผ่าน..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
            />
            <button
              type="button"
              onClick={handleTogglePassword}
              className="ml-2"
            >
              {showPassword ? (
                <BsEyeSlash style={{ color: "#D4B28C" }} />
              ) : (
                <BsEye style={{ color: "#D4B28C" }} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSignIn}
            style={{ color: "#D4B28C" }}
            className="block mb-6"
          >
            กลับไปเข้าสู่ระบบ
          </button>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full py-2 bg-[#D4B28C] text-white rounded-full font-semibold hover:bg-[#c9a07e] transition"
        >
          ยืนยัน
        </button>
      </div>
    </div>
  );
};

export default EnterNewPassword;
