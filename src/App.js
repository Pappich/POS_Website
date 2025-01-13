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
import GroupList from "./Pages/Owner/SetupShop/addGroup/groupList";
import AddGroupForm from "./Pages/Owner/SetupShop/addGroup/addGroupForm";
import GroupMenu from "./Pages/Owner/SetupShop/addGroup/groupMenu";
import ChoiceList from "./Pages/Owner/SetupShop/addChioce/choiceList";
import ChoiceOptions from "./Pages/Owner/SetupShop/addChioce/choiceOption";
import GlassChoice from "./Pages/Owner/SetupShop/addChioce/glassChoice";
import TypeChoice from "./Pages/Owner/SetupShop/addChioce/typeChoice";
import ToppingChoice from "./Pages/Owner/SetupShop/addChioce/toppingChoice";
import SweetLevelChoice from "./Pages/Owner/SetupShop/addChioce/sweetLevelChoice";
import ChoiceMenu from "./Pages/Owner/SetupShop/addChioce/choiceMenu";
import StockList from "./Pages/Owner/SetupShop/addStock/stockList";
import AddStockForm from "./Pages/Owner/SetupShop/addStock/addStockForm";
import Order from "./Pages/Employee/main/order";
import Menu from "./Pages/Customer/OrderMenu/menu";
import MenuDetail from "./Pages/Customer/OrderMenu/menuDetail";
import OrderSummary from "./Pages/Customer/OrderSumary/orderSummary";
import PaymentMethod from "./Pages/Customer/OrderSumary/paymentMethod";
import QueueSummary from "./Pages/Customer/OrderSumary/queueSummary";
import UserRole from "./Pages/Owner/SetupShop/userRole";
import OwnerMenu from "./Pages/Owner/SetupShop/ownerMenu";
import PauseSection from "./Pages/Employee/main/pauseSection";

function App() {
  return (
    <Router>
      <div className="p-10 border-[20px] border-white min-h-screen">
        <Routes>
          {/* main flow */}
          <Route path="/" element={<Login />} />
          <Route path="/guideline" element={<GuideLine />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/enter-new-password" element={<EnterNewPassword />} />

          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/role" element={<UserRole />} />
          <Route path="/owner" element={<OwnerMenu />} />

          {/* add product flow */}
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/product-list" element={<ProductList />} />

          {/* add group flow */}
          <Route path="/group-list" element={<GroupList />} />
          <Route path="/add-group" element={<AddGroupForm />} />
          <Route path="/group-menu" element={<GroupMenu />} />

          {/* add choice flow */}
          <Route path="/choice-list" element={<ChoiceList />} />
          <Route path="/choice-option" element={<ChoiceOptions />} />
          <Route path="/glass-choice" element={<GlassChoice />} />
          <Route path="/topping-choice" element={<ToppingChoice />} />
          <Route path="/type-choice" element={<TypeChoice />} />
          <Route path="/sweet-level-choice" element={<SweetLevelChoice />} />
          <Route path="/choice-menu" element={<ChoiceMenu />} />

          {/* add stock flow */}
          <Route path="/stock-list" element={<StockList />} />
          <Route path="/add-stock" element={<AddStockForm />} />
          <Route path="/order-list" element={<Order />} />

          {/* Customer flow */}
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu-detail" element={<MenuDetail />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/payment-method" element={<PaymentMethod />} />
          <Route path="/queue-summary" element={<QueueSummary />} />

          {/* Employee */}
          <Route path="/pause-section" element={<PauseSection />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
