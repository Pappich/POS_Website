import { Outlet } from "react-router-dom";
import NavbarCustomer from "./Components/Customer/navBarCustomer";

function NavbarCustomerLayout() {
  return (
    <div className="border-white w-full">
      <NavbarCustomer />
      <div className="px-10 border-white">
        <Outlet />
      </div>
    </div>
  );
}

export default NavbarCustomerLayout;
