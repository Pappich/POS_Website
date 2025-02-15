import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { registerLocale, setLocale } from "react-datepicker";
import th from "date-fns/locale/th"; // Import Thai locale from date-fns
import SideBar from "../../../../Components/sideBar";
import AddCategoryButton from "../../../../Components/addCategoryButton";
import { LuInfo } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi"; // Import magnifier icon
import { FaPlus, FaRegCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import { useEffect } from "react";

const thLocaleWithMondayStart = {
  ...th,
  options: {
    ...th.options,
    weekStartsOn: 1, // Start the week on Monday (0 = Sunday, 1 = Monday)
  },
};

const Stock = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/owner/stock-ingredients"
        );
        const data = await response.json();
        setIngredients(data); // Store the data in state
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/owner/stock-ingredients/categories"
        );
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [selectedCategory]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddOwnerProduct = () => {
    navigate("/add-owner-product");
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredIngredients = ingredients.filter((item) =>
    selectedCategory ? item.category_id === selectedCategory : true
  );

  return (
    <div>
      <SideBar menuTab={"stock"} />
      <div className="px-10 mt-[40px]">
        <h1 className="font-bold text-3xl ">คลังสินค้า</h1>
        <div className="flex justify-between items-center">
          <span className="flex items-center">
            <span className="font-bold mt-2">หมวดหมู่</span>
            <span className="pl-2 text-[#DD9F52]">
              <LuInfo size={24} />
            </span>
          </span>
          <AddCategoryButton />
        </div>
        {/* category Section */}
        <div className="my-3">
          <div className="flex overflow-x-auto space-x-4 scrollbar-hide whitespace-nowrap">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-4 py-1 ${
                selectedCategory === null
                  ? "bg-[#C6B399] text-white rounded-full border"
                  : "bg-white border-[#C6B399]"
              }`}
            >
              ทั้งหมด
            </button>

            {/* Category buttons */}
            {categories.map((category) => (
              <button
                key={category.category_id}
                onClick={() => handleCategoryChange(category.category_id)}
                className={`px-4 py-1 ${
                  selectedCategory === category.category_id
                    ? "bg-[#C6B399] text-white rounded-full border"
                    : "bg-white border-[#C6B399]"
                }`}
              >
                {category.category_name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex">
            {/* รายรับทั้งหมด */}
            <div className="flex py-2 px-4 w-3/4 mr-2 bg-white border rounded-lg ">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DC9494]">
                <div className="pb-1">
                  <IoWarningOutline color="white" size={32} />
                </div>
              </div>
              <div className="ml-3">
                <p>สินค้าที่ใกล้จะหมด</p>
                <div className="flex">
                  <p className="font-bold">แก้วขนาด M</p>
                  <p className="pl-1">จำนวน 16 ใบ</p>
                </div>
              </div>
            </div>

            {/* สินค้าที่ใกล้จะหมดอายุ */}
            <div className="flex py-2 px-4 w-full bg-white border rounded-lg ">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#DCC894]">
                <IoMdTime color="white" size={32} />
              </div>
              <div className="ml-3">
                <p>สินค้าที่ใกล้จะหมดอายุ วันที่ 16 มกราคม พ.ศ. 2567</p>
                <p className="font-bold">ไข่มุกแบบต้ม</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="my-4 relative flex">
            <div className="mr-5 flex items-center bg-white border-[#C6B399] border rounded-full px-4 py-1 w-full">
              <FiSearch className="text-[#C6B399] mr-2" size={36} />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="ค้นหาสินค้า..."
                className="w-full focus:outline-none"
              />
            </div>
            {/* เพิมรายการสินค้า */}
            <button
              type="button"
              className="flex justify-center items-center w-1/4 text-white border border-[#C6B399] bg-[#C6B399] hover:bg-[#b8a78f] focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-2xl px-3 py-1"
              onClick={handleAddOwnerProduct}
            >
              <div className="flex items-center whitespace-nowrap">
                <span className="pl-1">
                  <FaPlus size={12} />
                </span>
                <span className="pl-2">เพิ่มรายการสินค้า</span>
              </div>
            </button>
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
                    จำนวนคงเหลือ
                  </th>
                  <th className="pl-10 py-2 border-b border-[#000000]">
                    หมวดหมู่
                  </th>
                  <th className="pl-16 pr-5 py-2 border-b border-[#000000]">
                    อัปเดต
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIngredients.map((item, index) => (
                  <tr
                    key={item.ingredient_id}
                    onClick={() =>
                      navigate(`/product-detail?id=${item.ingredient_id}`)
                    }
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="pr-5 text-center border-b border-[#F1F4F7]">
                      {index + 1}
                    </td>
                    <td className="py-2 break-words border-b border-[#F1F4F7]">
                      {item.ingredient_name}
                    </td>
                    <td className="py-2 text-center border-b border-[#F1F4F7]">
                      {item.quantity_in_stock}
                    </td>
                    <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                      {categories.find(
                        (category) => category.category_id === item.category_id
                      )?.category_name || "-"}
                    </td>
                    <td className="py-2 pl-16 pr-5 text-center border-b border-[#F1F4F7]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the row click handler from firing
                          handleUpdateClick(item);
                        }}
                        className="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xl px-2 py-0"
                      >
                        อัปเดต
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 flex just flex-col h-[500px] w-[700px] relative">
              {/* Product Name */}
              <h2 className="text-lg font-bold text-center mb-4 absolute top-4 w-full">
                ผงชานมใต้หวัน
              </h2>

              {/* Modal Content */}
              <div className="flex mt-10">
                <div className="flex-shrink-0">
                  <img
                    src="https://sordaotieam.com/cdn/shop/files/200.webp?v=1687934958"
                    alt="product"
                    className="object-cover w-auto h-[310px] rounded-md border-solid border-4 border-[#848484]"
                  />
                </div>
                <div className="pl-8 flex-1">
                  {/* Category */}
                  <p className="mb-4">
                    <span className="font-bold pr-2">หมวดหมู่</span>
                    <span className="px-3 border border-[#613080] rounded-full text-[#613080]">
                      น้ำชา
                    </span>
                  </p>

                  {/* Expiry Date */}
                  <div className="mb-4">
                    <div className="font-bold mb-2">วันหมดอายุของสินค้า</div>
                    <div className="relative">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat="dd / MM / yyyy"
                        placeholderText="DD / MM / YYYY"
                        locale={thLocaleWithMondayStart}
                        className="pl-10 py-2 border border-[#C6B399] rounded-full "
                      />
                      <FaRegCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#C6B399] w-5 h-5" />
                    </div>
                  </div>

                  {/* Net Volume */}
                  <div className="mb-4">
                    <div className="font-bold mb-2">ปริมาตรสุทธิต่อหน่วย</div>
                    <div className="flex items-center">
                      <input
                        value="1000 กรัม"
                        type="text"
                        readOnly
                        className="border border-[#D4B28C] rounded-full p-2 text-gray-600 focus:outline-none pr-8 mr-3"
                      />
                      <button
                        type="button"
                        className="px-4 text-[#C6B399] border border-[#C6B399] bg-white hover:bg-[#C6B399] hover:text-white rounded-full font-medium"
                      >
                        แก้ไข
                      </button>
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div className="mb-4">
                    <div className="font-bold mb-2">
                      จำนวนคงเหลือในสต็อคสินค้า
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-3 py-3 text-white bg-[#A2DC94] border border-[#A2DC94] hover:bg-white hover:text-[#A2DC94] rounded-full flex items-center justify-center"
                      >
                        <FaPlus />
                      </button>
                      <div className="px-8 relative inline-block">
                        <span className="font-bold">
                          {selectedProduct.quantity}
                        </span>
                        <span className="absolute left-[10%] right-[10%] bottom-0 h-[1px] bg-[#848484]"></span>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-3 text-white bg-[#DC9494] border border-[#DC9494] hover:bg-white hover:text-[#DC9494] rounded-full flex items-center justify-center"
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-auto">
                <button
                  className="px-14 py-4 w-[300px] border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
                  onClick={closeModal}
                >
                  ย้อนกลับ
                </button>
                <button
                  className="px-14 py-4 w-[300px] bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
                  onClick={closeModal}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;
