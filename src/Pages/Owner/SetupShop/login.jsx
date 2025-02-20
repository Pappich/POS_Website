import React, { useRef, useState, useEffect } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ThaiVirtualKeyboard from "../../../Components/thaiVirtualKeyboard";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";
import bcrypt from "bcryptjs";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Config/redux/userSlice";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [keyboardLayout, setKeyboardLayout] = useState("default");

  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  console.log("URL: ", URL);

  const formRef = useRef(null);
  const keyboardContainerRef = useRef(null);
  const inputContainerRef = useRef(null);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetchApi(`${URL}/auth/login`, "POST", {
        email,
        password,
      });

      if (response.ok) {
        const userData = await response.json();
        console.log("USER DATA FROM JWT:", userData);
        const decodedToken = jwtDecode(userData.token);
        console.log("JWT PAYLOAD:", decodedToken);

        // Save JWT token and user data to sessionStorage
        sessionStorage.setItem("token", userData.token);
        sessionStorage.setItem("owner_id", decodedToken.owner_id);
        sessionStorage.setItem("branch_id", decodedToken.branch_id);
        sessionStorage.setItem("role", decodedToken.role);

        const passwordReset = sessionStorage.getItem("password_reset");

        if (passwordReset === "true") {
          navigate("/role");
        } else {
          navigate("/enter-new-password");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleFocus = (field) => {
    setFocusedField(field);
    setShowKeyboard(true);
  };

  const handleBlur = (e) => {
    if (
      keyboardContainerRef.current &&
      !keyboardContainerRef.current.contains(e.target) &&
      inputContainerRef.current &&
      !inputContainerRef.current.contains(e.target)
    ) {
      setShowKeyboard(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleBlur);
    return () => {
      document.removeEventListener("mousedown", handleBlur);
    };
  }, []);

  return (
    <div className="w-full font-noto flex flex-col justify-center items-center min-h-screen">
      <div
        ref={formRef}
        className="max-w-md w-full bg-white p-8 rounded-lg shadow-md"
      >
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
              type="password"
              id="password"
              value={passwordInput}
              placeholder="กรอกรหัสผ่าน..."
              className="w-full py-2 px-3 bg-transparent outline-none text-gray-700"
              onFocus={() => handleFocus("password")}
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
          onClick={() => handleLogin(usernameInput, passwordInput)}
          className="w-full py-2 bg-[#D4B28C] text-white rounded-full font-semibold hover:bg-[#c9a07e] transition"
        >
          เข้าสู่ระบบ
        </button>
      </div>

      {/* Virtual Keyboard */}
      {showKeyboard && (
        <div
          className="keyboard-container fixed bottom-0 left-0 w-full z-50"
          ref={keyboardContainerRef}
        >
          <ThaiVirtualKeyboard
            input={focusedField === "username" ? usernameInput : passwordInput}
            setInput={
              focusedField === "username" ? setUsernameInput : setPasswordInput
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
