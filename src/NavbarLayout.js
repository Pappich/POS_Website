import { Outlet } from "react-router-dom";
import Navbar from "./Components/navBar";

function NavbarLayout() {
  return (
    <div className="border-white min-h-screen">
      <Navbar />
      <div className="border-l-[40px] border-r-[40px] border-white min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarLayout;
