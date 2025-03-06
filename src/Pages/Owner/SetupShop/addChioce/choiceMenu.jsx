import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChoiceMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { groupName, selectedMenus = [] } = location.state || {
    groupName: "",
    selectedMenus: [],
  };

  const handleBack = () => {
    navigate("/choice-list");
  };

  return (
    <>
      <div className="flex flex-col items-center bg-[#F5F5F5] h-screen-navbar pb-24">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 mt-[40px]">
            ตัวเลือกรายการสินค้า
          </h1>
          <div className="w-20 h-1 bg-[#DD9F52] my-6"></div>
        </div>

        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            ตัวเลือก:
            <span className="text-[#DD9F52] ml-2">{groupName}</span>
          </h1>
        </div>
        <div className="w-full ml-16">
          <label
            htmlFor="selectedMenus"
            className="text-2xl w-full text-start font-bold"
          >
            เมนูทั้งหมดที่ใช้ตัวเลือก
          </label>
          <div className="w-full grid grid-cols-3 gap-4 mb-8 mt-4">
            {selectedMenus?.map((menu, index) => (
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

        <div className="fixed bottom-0 left-0 w-full bg-[#F5F5F5] px-4 py-4 shadow-md">
          <button
            className="px-14 py-4 w-[300px] border rounded-full text-[#DD9F52] border-[#DD9F52] hover:bg-[#f5e9dc] transition-colors font-bold"
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </>
  );
};

export default ChoiceMenu;
