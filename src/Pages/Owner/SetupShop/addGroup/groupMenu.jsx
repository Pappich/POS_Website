import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GroupMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { groupName, selectedMenus } = location.state || {
    groupName: "",
    selectedMenus: [],
  };

  const handleBack = () => {
    navigate("/group-list");
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-white">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">กลุ่มรายการสินค้า</h1>
          <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">
            สรุปกลุ่มรายการสินค้า
            <span className="text-[#DD9F52] ml-2">{groupName}</span>
          </h1>
        </div>
        <div className="w-full ml-16">
          <label
            htmlFor="selectedMenus"
            className="text-lg w-full text-start font-bold"
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
                <span>{menu}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex mt-8 w-full space-x-8 justify-between">
          <button
            className="px-6 py-3 w-[250px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
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
