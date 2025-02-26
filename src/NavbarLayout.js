import { Outlet } from "react-router-dom";
import Navbar from "./Components/General/navBar";

function NavbarLayout() {
  return (
    <div className="border-gray-100 w-full">
      <Navbar />
      <div className="px-10 border-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarLayout;
