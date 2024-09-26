import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Owner/SetupShop/login";
import GuideLine from "./Pages/Owner/SetupShop/guideLine";
import ForgotPassword from "./Pages/Owner/SetupShop/forgotPassword/forgotPassword";
import MainMenu from "./Pages/Owner/SetupShop/mainMenu";
import AddProductForm from "./Pages/Owner/SetupShop/addProduct/addProductForm";
import EnterOTP from "./Pages/Owner/SetupShop/forgotPassword/enterOTP";
import EnterNewPassword from "./Pages/Owner/SetupShop/forgotPassword/enterNewpassword";
import ProductList from "./Pages/Owner/SetupShop/addProduct/productList";

function App() {
  return (
    <Router>
      <div className="p-10 border-[40px] border-white min-h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guideline" element={<GuideLine />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/enter-new-password" element={<EnterNewPassword />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/product-list" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
