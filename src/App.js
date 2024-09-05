import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Owner/SetupShop/login";
import GuideLine from "./Pages/Owner/SetupShop/guideLine";
import ForgotPassword from "./Pages/Owner/SetupShop/forgotPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/guideline" element={<GuideLine />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
