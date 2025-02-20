import { Outlet } from "react-router-dom";
import NavbarCustomer from "./Components/navBarCustomer";

function NavbarCustomerLayout() {
  return (
    <div className="border-gray-100 w-full">
      <NavbarCustomer />
      <div className="px-10 border-gray-100">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarCustomerLayout;
