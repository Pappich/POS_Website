import React, { useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import VirtualKeyboard from "../../../Components/virtualKeyboard";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [input, setInput] = useState("");
  const [keyboardLanguage, setKeyboardLanguage] = useState("th");

  useEffect(() => {
    if (showKeyboard) {
      // Center the page when keyboard is shown
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [showKeyboard]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    navigate("/guideline");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleKeyboardLanguageSwitch = () => {
    setKeyboardLanguage(keyboardLanguage === "th" ? "en" : "th");
  };

  return (
    <div className="font-noto flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl text-black mb-2 text-left">
          ยินดีต้อนรับสู่ระบบการขายหน้าร้าน
        </h2>
        <p className="text-primaryRegular text-gray-500 mb-6 text-left">
          โปรดลงทะเบียนเพื่อเข้าสู่ระบบ
        </p>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        <div className="mb-4">
          <label className="block text-black mb-2 text-left" htmlFor="username">
            ชื่อผู้ใช้
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaUserAlt style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type="text"
              id="username"
              value={input}
              placeholder="กรอกชื่อผู้ใช้..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
              onFocus={() => setShowKeyboard(true)}
              onBlur={() => setShowKeyboard(false)}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-black mb-2 text-left" htmlFor="password">
            รหัสผ่าน
          </label>
          <div className="flex items-center border rounded-full bg-gray-50 px-3">
            <FaLock style={{ color: "#D4B28C" }} className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="กรอกรหัสผ่าน..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
              onFocus={() => setShowKeyboard(true)}
              onBlur={() => setShowKeyboard(false)}
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
      {showKeyboard && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-50">
          <VirtualKeyboard
            input={input}
            setInput={setInput}
            language={keyboardLanguage}
          />
        </div>
      )}
    </div>
  );
};

export default Login;
