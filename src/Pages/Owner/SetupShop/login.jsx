import React, { useRef, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ThaiVirtualKeyboard from "../../../Components/thaiVirtualKeyboard";
import VirtualKeyboard from "../../../Components/virtualKeyboard";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [keyboardLayout, setKeyboardLayout] = useState("default");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/guideline");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleFocus = (field) => {
    setShowKeyboard(field);
  };

  const handleBlur = (event) => {
    if (
      event.relatedTarget &&
      event.relatedTarget.closest(".keyboard-container")
    ) {
      return;
    }
    setShowKeyboard(false);
  };

  return (
    <div className="font-noto flex flex-col justify-center items-center min-h-screen">
    <div className="font-noto flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-black mb-2 text-left">
          ยินดีต้อนรับสู่ระบบการขายหน้าร้าน
        </h2>
        <p className="text-primaryRegular text-gray-500 mb-6 text-left">
          โปรดลงทะเบียนเพื่อเข้าสู่ระบบ
        </p>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>

        {/* Username Input */}
        <div className="mb-4 relative">
          <label className="block text-black mb-2 text-left" htmlFor="username">
            ชื่อผู้ใช้
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaUserAlt style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type="text"
              id="username"
              value={usernameInput}
              placeholder="กรอกชื่อผู้ใช้..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
              onFocus={() => handleFocus("username")}
              onBlur={handleBlur}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-6 relative">
          <label className="block text-black mb-2 text-left" htmlFor="password">
            รหัสผ่าน
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaLock style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={passwordInput}
              placeholder="กรอกรหัสผ่าน..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
              onFocus={() => handleFocus("password")}
              onBlur={handleBlur}
              onChange={(e) => setPasswordInput(e.target.value)}
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
            onClick={handleForgotPassword}
            style={{ color: "#D4B28C" }}
            className="block mb-6"
          >
            ลืมรหัสผ่าน?
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 bg-[#D4B28C] text-white rounded-full font-semibold hover:bg-[#c9a07e] transition"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div className="keyboard-container absolute z-50 mt-4">
          <ThaiVirtualKeyboard
            input={showKeyboard === "username" ? usernameInput : passwordInput}
            setInput={
              showKeyboard === "username" ? setUsernameInput : setPasswordInput
            }
            layout={keyboardLayout}
            setLayout={setKeyboardLayout}
          />
        </div>
      )}
    </div>
  );
};
export default Login;
