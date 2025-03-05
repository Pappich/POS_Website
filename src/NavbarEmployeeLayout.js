import { Outlet } from "react-router-dom";
import Navbar from "./Components/General/navBar";

function NavbarEmployeeLayout() {
  return (
    <div className="w-full bg-white">
      <Navbar />
      <div className="px-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarEmployeeLayout;
