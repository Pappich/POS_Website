import { Outlet } from "react-router-dom";
import Navbar from "./Components/navBar";

function NavbarLayout() {
  return (
    <div className="border-white min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default NavbarLayout;
