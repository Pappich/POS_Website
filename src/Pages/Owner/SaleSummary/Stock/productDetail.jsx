import React, { useState, useEffect } from "react";
import SideBar from "../../../../Components/Owner/sideBar";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ingredientData, setIngredientData] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isVolumeUnitDropdownOpen, setIsVolumeUnitDropdownOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  // Get the ingredient_id from the query parameters
  const query = new URLSearchParams(location.search);
  const ingredientId = query.get("id");

  useEffect(() => {
    const fetchIngredientDetail = async () => {
      try {
        const response = await fetchApi(
          `${URL}/owner/stock-ingredients/${ingredientId}`,
          "GET"
        );
        const data = await response.json();
        setIngredientData(data);
      } catch (error) {
        console.error("Error fetching ingredient detail:", error);
      }
    };

    fetchIngredientDetail();
  }, [ingredientId, URL]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(window.URL.createObjectURL(file));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/stock");
  };

  const handleBack = () => {
    navigate("/stock");
  };

  return (
    <div>
      <SideBar menuTab={"stock"} />
      <h1 className="font-bold text-xl">คลังสินค้า</h1>
      <h1 className="font-bold">รายการวัตถุดิบ</h1>
      {ingredientData && (
        <div className="px-10">
          {/* Upload Product Image */}
          <div className="py-2">
            <span className="font-bold">รูปภาพสินค้า</span>
          </div>
          <div className="w-full flex justify-center">
            <label className="w-full border-2 border-dashed border-[#D4B28C] rounded-lg flex flex-col items-center justify-center cursor-pointer">
              {productImage ? (
                <img
                  src={productImage}
                  alt="Uploaded"
                  className="h-80 object-contain"
                />
              ) : (
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
                  alt="Upload Icon"
                  className="w-40 h-40"
                />
              )}
              <p className="text-center text-brown-500 mb-2 mt-2">
                <span className="text-[#D4B28C] font-bold">คลิก</span>{" "}
                เพื่ออัปโหลดรูปภาพ
              </p>
              <p className="text-gray-400 text-sm">
                ชนิดไฟล์ PNG, JPG, JPEG, WEBP
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/webp"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          {/* Product Details */}
          <div className="grid grid-cols-2 gap-20">
            <div className="w-full">
              <div className="py-2">
                <span className="font-bold">ชื่อสินค้า</span>
              </div>
              <input
                type="text"
                value={ingredientData.ingredient_name}
                readOnly
                className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
              <div className="py-2">
                <span className="font-bold">จำนวน</span>
              </div>
              <input
                type="text"
                // value={`${ingredientData.stock_data.quantity_in_stock} ${ingredientData.stock_data.unit}`}
                value="100 ถุง"
                readOnly
                className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
              />
              <div className="py-2">
                <span className="font-bold">การตัดคลังสินค้า</span>
              </div>
              <div className="flex items-center">
                <div className="text-nowrap pr-5">ปริมาณสุทธิต่อหน่วย</div>
                <input
                  type="text"
                  // value={`${ingredientData.stock_data.net_volume} ${ingredientData.stock_data.unit}`}
                  value="1000 กรัม"
                  readOnly
                  className="w-full bg-[#ECECEC] border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="py-2">
                <span className="font-bold">หมวดหมู่</span>
              </div>
              <div className="relative">
                <div className="border bg-[#ECECEC] border-[#D4B28C] rounded-full p-3 text-gray-600">
                  {/* {ingredientData.category_name || "ไม่ระบุหมวดหมู่"} */}
                  ท็อปปิ้ง
                </div>
              </div>
            </div>
          </div>

          <div className="py-2">
            <span className="font-bold">อัตราส่วนในแต่ละเมนู</span>
          </div>
          {/* Table Section */}
          <div className="overflow-x-auto border rounded-lg p-5">
            <table className="border-collapse table-auto w-full">
              <thead>
                <tr>
                  <th className="py-2 pr-5 text-center border-b border-[#000000]">
                    ลำดับที่
                  </th>
                  <th className="py-2 text-left border-b border-[#000000]">
                    รายการสินค้า
                  </th>
                  <th className="px-1 py-2 border-b border-[#000000]">
                    ขนาดแก้ว
                  </th>
                  <th className="px-1 py-2 border-b border-[#000000]">
                    ชนิดเครื่องดื่ม
                  </th>
                  <th className="pl-10 py-2 border-b border-[#000000]">
                    อัตราส่วน
                  </th>
                  <th className="pl-16 pr-5 py-2 border-b border-[#000000]">
                    กลุ่ม
                  </th>
                </tr>
              </thead>
              <tbody>
                {ingredientData?.menu_ingredients &&
                ingredientData.menu_ingredients.length > 0 ? (
                  ingredientData.menu_ingredients.map((item, index) => (
                    <tr key={index}>
                      <td className="pr-5 text-center border-b border-[#F1F4F7]">
                        {index + 1}
                      </td>
                      <td className="py-2 break-words border-b border-[#F1F4F7]">
                        {item?.menu_name || "-"}
                      </td>
                      <td className="py-2 text-center border-b border-[#F1F4F7]">
                        {item?.size_name || "-"}
                      </td>
                      <td className="py-2 text-center border-b border-[#F1F4F7]">
                        {item?.level_name || "-"}
                      </td>
                      <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                        {item?.quantity_used && item?.unit
                          ? `${item.quantity_used} ${item.unit}`
                          : "-"}
                      </td>
                      <td className="py-2 pl-9 text-center border-b border-[#F1F4F7]">
                        <div className="border border-[#70AB8E] rounded-full text-[#70AB8E] inline-flex items-center justify-center px-2">
                          {item?.category_name || "-"}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      ไม่มีข้อมูลการใช้วัตถุดิบในเมนู
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex mt-8 justify-between">
            <button
              className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
              onClick={handleBack}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
