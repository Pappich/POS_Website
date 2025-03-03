import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the CSS
import { registerLocale, setLocale } from "react-datepicker";
import th from "date-fns/locale/th"; // Import Thai locale from date-fns
import AddCategoryButton from "../../../../Components/Owner/addCategoryButton";
import { LuInfo } from "react-icons/lu";
import { IoMdTime } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi"; // Import magnifier icon
import { FaPlus, FaRegCalendar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaMinus } from "react-icons/fa";
import SideBar from "../../../../Components/Owner/sideBar";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";
const thLocaleWithMondayStart = {
  ...th,
  options: {
    ...th.options,
    weekStartsOn: 1, // Start the week on Monday (0 = Sunday, 1 = Monday)
  },
};

const Stock = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [ingredientHistory, setIngredientHistory] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    quantity_in_stock: "",
    total_volume: "",
    net_volume: "",
    expiration_date: "",
  });
  const [isEditingNetVolume, setIsEditingNetVolume] = useState(false);
  const [isEditingTotalVolume, setIsEditingTotalVolume] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetchApi(`${URL}/owner/stock-ingredients`, "GET");
      const data = await response.json();

      const processedData = data.map((category) => {
        if (category.category_id === null) {
          return {
            ...category,
            ingredients: category.ingredients.filter(
              (ingredient, index, self) =>
                index ===
                self.findIndex(
                  (i) => i.ingredient_id === ingredient.ingredient_id
                )
            ),
          };
        }
        return category;
      });

      setIngredients(processedData);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
    }
  };
  console.log("Ingredient: ", ingredients);
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi(
          `${URL}/owner/stock-ingredients/categories`,
          "GET"
        );
        if (response.ok) {
          const data = await response.json();
          setCategories(data.categories);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [URL]);

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

  const filteredIngredients = ingredients.flatMap((category) => {
    if (
      selectedCategory === null ||
      category.category_id === selectedCategory
    ) {
      return category.ingredients.map((ingredient) => ({
        ...ingredient,
        category_name: category.category_name || "-",
      }));
    }
    return [];
  });

  console.log("Filter Ingredient", filteredIngredients);
  // Fetch ingredient history
  const handleShowHistory = async (ingredientId) => {
    try {
      const response = await fetchApi(
        `${URL}/owner/stock-ingredients/sub-ingredient/${ingredientId}`,
        "GET"
      );
      const data = await response.json();
      setIngredientHistory(data);
      setHistoryModalVisible(true);
    } catch (error) {
      console.error("Error fetching ingredient history:", error);
    }
  };

  // Fetch product details when clicking อัปเดต button
  const handleUpdate = async (updateId) => {
    console.log("Update ID", updateId);
    try {
      const response = await fetchApi(
        `${URL}/owner/update-stock-ingredients/${updateId}`,
        "GET"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch product details");
      }

      const data = await response.json();

      // แปลงวันที่จาก string เป็น Date object
      const expDate = data.expiration_date
        ? new Date(data.expiration_date + "T00:00:00") // เพิ่มเวลาเพื่อให้ parse ถูกต้อง
        : new Date();

      setSelectedDate(expDate);
      setSelectedProduct(data);
      setUpdateFormData({
        quantity_in_stock: data.quantity || "",
        total_volume: data.total_volume || "",
        net_volume: data.net_volume || "",
        expiration_date: data.expiration_date || "", // เก็บวันที่ในรูปแบบ YYYY-MM-DD
      });
      setIsUpdateMode(true);
      setModalVisible(true);

      console.log("Update Form Data", updateFormData);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Handle form submission for update
  const handleUpdateSubmit = async () => {
    try {
      // ถ้าไม่มี update_id แสดงว่าเป็นการเพิ่มใหม่
      if (!selectedProduct.update_id) {
        // ตรวจสอบว่ามีวันที่หรือไม่ ถ้าไม่มีให้ใช้วันที่ปัจจุบัน
        const expDate =
          updateFormData.expiration_date ||
          new Date().toISOString().split("T")[0];

        const payload = {
          image_url: selectedProduct.image_url,
          ingredient_name: selectedProduct.ingredient_name,
          net_volume: parseInt(updateFormData.net_volume),
          unit: selectedProduct.unit,
          quantity_in_stock: parseInt(updateFormData.quantity_in_stock),
          category_name: selectedProduct.category_name,
          expiration_date: expDate,
        };

        console.log("payload POST", payload);

        const response = await fetchApi(
          `${URL}/owner/create-stock-ingredients`,
          "POST",
          payload
        );

        if (!response.ok) {
          throw new Error("Failed to create product");
        }
      } else {
        // ถ้ามี update_id แสดงว่าเป็นการอัพเดต
        console.log("update_id", selectedProduct.update_id);

        // ตรวจสอบว่ามีวันที่หรือไม่ ถ้าไม่มีให้ใช้วันที่ปัจจุบัน
        const expDate =
          updateFormData.expiration_date ||
          new Date().toISOString().split("T")[0];

        const payload = {
          updates: [
            {
              update_id: selectedProduct.update_id,
              quantity_in_stock: parseInt(updateFormData.quantity_in_stock),
              total_volume: parseInt(updateFormData.total_volume),
              net_volume: parseInt(updateFormData.net_volume),
              expiration_date: expDate,
            },
          ],
        };

        console.log("payload", payload);

        const response = await fetchApi(
          `${URL}/owner/update-stock-ingredients/${selectedProduct.update_id}`,
          "PATCH",
          payload
        );

        if (!response.ok) {
          throw new Error("Failed to update product");
        }
      }

      await fetchProducts();
      setModalVisible(false);
    } catch (error) {
      console.error("Error updating/creating product:", error);
    }
  };

  console.log("ingredient history", ingredientHistory);

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
                      {item.total_volume && item.net_volume
                        ? `${item.total_volume / item.net_volume} ชิ้น`
                        : "-"}
                    </td>
                    <td className="py-2 pl-10 text-center border-b border-[#F1F4F7]">
                      {item.category_name}
                    </td>
                    <td className="py-2 pl-16 pr-5 text-center border-b border-[#F1F4F7]">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the row click handler from firing
                          handleShowHistory(item.ingredient_id);
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

        {/* Update/Create Product Modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
            {/* Modal Container */}
            <div className="bg-white rounded-2xl p-8 flex flex-col h-auto max-h-[90vh] w-[90%] max-w-[700px] relative shadow-xl border border-gray-300">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>

              {/* Product Name */}
              <h2 className="text-xl font-bold text-center mb-6">
                {selectedProduct?.ingredient_name}
              </h2>

              {/* Modal Content */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  {selectedProduct?.image_url && (
                    <img
                      src={`${URL}/${selectedProduct?.image_url.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={selectedProduct?.image_url}
                      className="w-[240px] h-[240px] object-cover rounded-lg border border-gray-300 shadow-md"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4 text-gray-700">
                  {/* Category */}
                  <p className="flex items-center">
                    <span className="font-bold text-gray-800">หมวดหมู่:</span>
                    <span className="ml-2 px-3 py-1 border border-purple-600 rounded-full text-purple-600">
                      {selectedProduct?.category_name || "ไม่ระบุ"}
                    </span>
                  </p>

                  {/* Expiry Date */}
                  <div>
                    <div className="font-bold text-gray-800 mb-1">
                      วันหมดอายุของสินค้า
                    </div>
                    <div className="relative">
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          const formattedDate = date
                            .toISOString()
                            .split("T")[0];
                          setUpdateFormData((prev) => ({
                            ...prev,
                            expiration_date: formattedDate,
                          }));
                        }}
                        dateFormat="dd / MM / yyyy"
                        placeholderText="DD / MM / YYYY"
                        locale={thLocaleWithMondayStart}
                        className="pl-10 py-2 border border-gray-300 rounded-full w-full"
                      />
                      <FaRegCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  {/* Net Volume */}
                  <div>
                    <div className="font-bold text-gray-800 mb-1">
                      ปริมาตรสุทธิต่อหน่วย
                    </div>
                    <div className="flex items-center">
                      <input
                        value={
                          isEditingNetVolume
                            ? updateFormData.net_volume || ""
                            : `${updateFormData.net_volume || ""} ${
                                selectedProduct?.unit
                              }`
                        }
                        type={isEditingNetVolume ? "number" : "text"}
                        readOnly={!isEditingNetVolume}
                        onChange={(e) => {
                          if (isEditingNetVolume) {
                            setUpdateFormData((prev) => ({
                              ...prev,
                              net_volume: e.target.value,
                            }));
                          }
                        }}
                        className="border border-gray-300 rounded-full p-2 text-gray-600 focus:outline-none w-full mr-3"
                      />
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-full font-medium ${
                          isEditingNetVolume
                            ? "bg-orange-300 text-white"
                            : "border border-orange-300 text-orange-300"
                        } hover:bg-orange-300 hover:text-white`}
                        onClick={() =>
                          setIsEditingNetVolume(!isEditingNetVolume)
                        }
                      >
                        {isEditingNetVolume ? "บันทึก" : "แก้ไข"}
                      </button>
                    </div>
                  </div>

                  {/* Stock Quantity */}
                  <div>
                    <div className="font-bold text-gray-800 mb-1">
                      จำนวนคงเหลือในสต็อค
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="px-3 py-3 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600"
                        onClick={() =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            quantity_in_stock:
                              parseInt(prev.quantity_in_stock || 0) + 1,
                          }))
                        }
                      >
                        <FaPlus />
                      </button>
                      <span className="px-6 font-bold text-gray-800">
                        {updateFormData.quantity_in_stock || 0}
                      </span>
                      <button
                        type="button"
                        className="px-3 py-3 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                        onClick={() =>
                          setUpdateFormData((prev) => ({
                            ...prev,
                            quantity_in_stock: Math.max(
                              0,
                              parseInt(prev.quantity_in_stock || 0) - 1
                            ),
                          }))
                        }
                      >
                        <FaMinus />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-3 w-full border rounded-full text-gray-700 border-gray-400 hover:bg-gray-100 transition-colors font-bold"
                  onClick={closeModal}
                >
                  ย้อนกลับ
                </button>
                <button
                  className="px-6 py-3 w-full  bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
                  onClick={handleUpdateSubmit}
                >
                  บันทึก
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ingredient History Modal */}
        {historyModalVisible && ingredientHistory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 flex flex-col h-[600px] w-[800px] relative">
              {/* Modal Header */}
              <h2 className="text-lg font-bold text-center mb-4">
                ประวัติการอัปเดต {ingredientHistory.ingredient_name}
              </h2>

              {/* Table Section */}
              <div className="overflow-x-auto border rounded-lg p-5 flex-grow">
                <table className="border-collapse table-auto w-full">
                  <thead>
                    <tr>
                      <th className="py-2 pr-5 text-center border-b border-[#000000]">
                        ลำดับที่
                      </th>
                      <th className="py-2 text-center border-b border-[#000000]">
                        จำนวนคงเหลือ
                      </th>
                      <th className="py-2 text-center border-b border-[#000000]">
                        ปริมาณรวม
                      </th>
                      <th className="py-2 text-center border-b border-[#000000]">
                        ปริมาณสุทธิ
                      </th>
                      <th className="py-2 text-center border-b border-[#000000]">
                        วันหมดอายุ
                      </th>
                      <th className="py-2 text-center border-b border-[#000000]">
                        การดำเนินการ
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientHistory.updates.map((update, index) => (
                      <tr key={update.update_id}>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          {index + 1}
                        </td>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          {update.quantity_in_stock} ชิ้น
                        </td>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          {update.total_volume}
                        </td>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          {update.net_volume}
                        </td>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          {new Date(update.expiration_date).toLocaleDateString(
                            "th-TH"
                          )}
                        </td>
                        <td className="py-2 text-center border-b border-[#F1F4F7]">
                          <button
                            onClick={() => {
                              setHistoryModalVisible(false);
                              handleUpdate(update.update_id);
                            }}
                            className="text-[#C6B399] bg-white border border-[#C6B399] focus:outline-none hover:bg-[#C6B399] hover:text-white focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-4 py-1"
                          >
                            อัปเดต
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Button */}
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => setHistoryModalVisible(false)}
                  className="px-6 py-2 border rounded-full text-[#D4B28C] border-[#D4B28C] hover:bg-[#f5e9dc] transition-colors font-bold"
                >
                  ปิด
                </button>
                <button
                  onClick={() => {
                    setHistoryModalVisible(false);
                    // เซ็ตค่าเริ่มต้นสำหรับการเพิ่มใหม่
                    setUpdateFormData({
                      quantity_in_stock: "",
                      total_volume: "",
                      net_volume: ingredientHistory.net_volume || "", // เก็บค่า net_volume เดิม
                      expiration_date: "", // วันที่เป็นค่าว่าง
                    });
                    setSelectedProduct({
                      ...ingredientHistory,
                      update_id: null, // ส่ง update_id เป็น null เพื่อบอกว่าเป็นการเพิ่มใหม่
                    });
                    setModalVisible(true);
                  }}
                  className="px-6 py-2 bg-[#D4B28C] text-white rounded-full hover:bg-[#cda777] transition-colors font-bold"
                >
                  เพิ่มการอัปเดต
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
