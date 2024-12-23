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
import Home from "./Pages/Owner/SaleSummary/OverView/home";
import OrderSummary from "./Pages/Owner/SaleSummary/OrderSummary/orderSummary";
import SaleSummaryGraph from "./Pages/Owner/SaleSummary/SaleSummaryGraph/saleSummaryGraph";
import Stock from "./Pages/Owner/SaleSummary/Stock/stock";
import NotificationSummary from "./Pages/Owner/SaleSummary/NotificationSummary/notificationSummary";
import AddOwnerProduct from "./Pages/Owner/SaleSummary/Stock/addOwnerProduct";
import ProductDetail from "./Pages/Owner/SaleSummary/Stock/productDetail";
import CancelOrderSummary from "./Pages/Owner/SaleSummary/OrderSummary/cancelOrderSummary";

function App() {
  return (
    <Router>
      <div className="p-10 border-[40px] border-white min-h-screen">
        <Routes>
          {/* main flow */}
          <Route path="/" element={<Login />} />
          <Route path="/guideline" element={<GuideLine />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/enter-otp" element={<EnterOTP />} />
          <Route path="/enter-new-password" element={<EnterNewPassword />} />

          <Route path="/main-menu" element={<MainMenu />} />

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

          {/* sale summary */}
          <Route path="/overview" element={<Home />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/sale-summary-graph" element={<SaleSummaryGraph />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/notification-summary" element={<NotificationSummary />} />
          <Route path="/add-owner-product" element={<AddOwnerProduct />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cancel-order-summary" element={<CancelOrderSummary />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
