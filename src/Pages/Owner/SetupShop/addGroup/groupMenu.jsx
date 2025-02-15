import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GroupMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { groupName = "", selectedMenus = [] } = location.state || {};

  // console.log("Location state:", location.state);
  // console.log("Group Name:", groupName);
  // console.log("Selected Menus:", selectedMenus);
  // console.log(groupName, selectedMenus);

  const handleBack = () => {
    navigate("/group-list");
  };

  return (
    <>
      <div className="flex flex-col items-center bg-white mt-[40px]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">กลุ่มรายการสินค้า</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            สรุปกลุ่มรายการสินค้า
            <span className="text-[#DD9F52] ml-2">{groupName}</span>
          </h1>
        </div>
        <div className="w-full ml-16">
          <label
            htmlFor="selectedMenus"
            className="text-2xl w-full text-start font-bold"
          >
            เมนูทั้งหมดในหมวดหมู่
          </label>
          <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
            {selectedMenus.map((menu, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={true}
                  className="form-checkbox h-5 w-5 accent-[#DD9F52]"
                />
                <span>{menu.menu_name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex fixed bottom-4 left-0 px-4 py-4 mt-8 w-full space-x-8 justify-between">
          <button
            className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupMenu;
