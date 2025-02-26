import { Outlet } from "react-router-dom";
import Navbar from "./Components/General/navBar";

function NavbarEmployeeLayout() {
  return (
    <div className="w-full bg-gray-200">
      <Navbar />
      <div className="px-4 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarEmployeeLayout;
