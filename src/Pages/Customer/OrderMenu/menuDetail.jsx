import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { IoChevronBack } from "react-icons/io5";
import fetchApi from "../../../Config/fetchApi";
import configureAPI from "../../../Config/configureAPI";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../Config/redux/cartSlice";

const MenuDetail = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  const userData = useSelector((state) => state.user.userData);
  const cartItems = useSelector((state) => state.cart.items);
  const { owner_id } = userData || {};

  const location = useLocation();
  const { menuId } = location.state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menu, setMenu] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [selectedSweetness, setSelectedSweetness] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedAddOn, setSelectedAddOn] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await fetchApi(
          `${URL}/customer/menus/${menuId}`,
          "GET"
        );
        const data = await response.json();

        setMenu(data);

        console.log("DATA:", data);
        setSelectedType(data.type_name[0]?.menu_type_name || "");
        setSelectedSweetness(data.level_name[0]?.sweetness_level_name || "");
        setSelectedSize(data.size_name[0]?.size_name || "");
        setSelectedAddOn([]);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, [menuId]);

  const handleBack = () => navigate("/menu");

  const handleAddToCart = () => {
    const newErrors = {};
    if (menu.type_name[0]?.menu_type_is_required && !selectedType) {
      newErrors.type = "โปรดเลือกชนิดเครื่องดื่มที่ต้องการ";
    }

    if (menu.level_name[0]?.sweetness_level_is_required && !selectedSweetness) {
      newErrors.sweetness = "โปรดเลือกระดับความหวานที่ต้องการ";
    }

    if (menu.size_name[0]?.size_is_required && !selectedSize) {
      newErrors.size = "โปรดเลือกขนาดที่ต้องการ";
    }

    if (
      menu.add_on_name[0]?.add_on_is_required &&
      (selectedAddOn.length === 0 ||
        selectedAddOn.some((id) => id === null || id === undefined))
    ) {
      newErrors.addOn = "โปรดเลือกตัวเลือกที่ต้องการอย่างน้อย 1 ตัวเลือก";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const selectedMenuDetails = {
      menuId: menuId,
      menuName: menu,
      selectedType,
      selectedSweetness,
      selectedSize,
      selectedAddOn,
      price: calculatePrice(),
      quantity,
    };

    dispatch(addToCart(selectedMenuDetails));

    navigate("/summary");
  };

  const handleSelection = (setter, value, current, isMultiple = false) => {
    if (isMultiple) {
      setter((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setter(current === value ? null : value);
    }
  };

  const handleAdd = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const OptionGroup = ({
    title,
    options,
    selected,
    onSelect,
    isMultiple,
    isRequired,
    errorMessage,
  }) => (
    <div>
      <div className="font-bold mb-2">{title}</div>
      <div className="flex flex-wrap gap-4 mb-4">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            aria-selected={selected.includes(option.id)}
            className={`px-6 py-3 flex-1 max-w-[250px] text-center rounded-full border border-[#D4B28C] font-bold ${
              selected.includes(option.id)
                ? "bg-[#D4B28C] text-white"
                : "bg-white text-[#D4B28C]"
            }`}
            disabled={
              isRequired &&
              !selected.length &&
              !isMultiple &&
              !selected.includes(option.id)
            }
          >
            {option.name}
          </button>
        ))}
      </div>
      {errorMessage && (
        <div className="text-red-600 text-sm mb-2">{errorMessage}</div>
      )}
    </div>
  );

  console.log("ERROR:", errors);

  const calculatePrice = () => {
    let price = parseFloat(menu.price) || 0;

    if (selectedSize) {
      const selectedSizeOption = menu.size_name.find(
        (size) => size.size_id === selectedSize
      );
      price += parseFloat(selectedSizeOption?.size_price_addition || "0");
    }

    if (selectedAddOn.length > 0) {
      selectedAddOn.forEach((addon) => {
        const selectedAddOnOption = menu.add_on_name.find(
          (addonOption) => addonOption.add_on_id === addon
        );
        price += parseFloat(
          selectedAddOnOption?.add_on_name_price_addition || "0"
        );
      });
    }

    if (selectedSweetness) {
      const selectedSweetnessOption = menu.level_name.find(
        (level) => level.sweetness_level_id === selectedSweetness
      );
      price += parseFloat(
        selectedSweetnessOption?.sweetness_level_price_addition || "0"
      );
    }

    if (selectedType) {
      const selectedTypeOption = menu.type_name.find(
        (type) => type.menu_type_id === selectedType
      );
      price += parseFloat(selectedTypeOption?.menu_type_price_addition || "0");
    }

    return price * quantity;
  };

  if (!menu) return <div>Loading...</div>;

  return (
    <div className="font-noto flex flex-col min-h-screen bg-white">
      <div className="flex justify-between items-center mb-6">
        <button onClick={handleBack}>
          <IoChevronBack className="w-[40px] h-[40px] text-[#DD9F52]" />
        </button>
        <button onClick={handleAddToCart}>
          <PiShoppingCart className="w-[40px] h-[40px] text-[#DD9F52]" />
          <span>{getCartItemCount()}</span>
        </button>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={menu.image_url}
          alt={menu.menu_name}
          className="rounded-md border border-[#AD8B73] h-[250px] w-[350px]"
        />
      </div>

      <div className="text-center mb-6">
        <h1 className="text-xl font-bold text-yellow-600">{menu.menu_name}</h1>
        <p className="text-gray-500">{menu.description}</p>
      </div>

      <div className="mt-4">
        <OptionGroup
          title="ชนิดเครื่องดื่ม"
          options={menu.type_name.map((item) => ({
            id: item.menu_type_id, // Assuming `menu_type_id` is present
            name: item.menu_type_name,
          }))}
          selected={selectedType ? [selectedType] : []}
          onSelect={(option) =>
            handleSelection(setSelectedType, option, selectedType, false)
          }
          isRequired={menu.type_name[0]?.menu_type_is_required}
          errorMessage={errors.type}
        />

        <OptionGroup
          title="ระดับความหวาน"
          options={menu.level_name.map((item) => ({
            id: item.sweetness_level_id,
            name: item.sweetness_level_name,
          }))}
          selected={selectedSweetness ? [selectedSweetness] : []}
          onSelect={(option) =>
            handleSelection(
              setSelectedSweetness,
              option,
              selectedSweetness,
              false
            )
          }
          isRequired={menu.level_name[0]?.sweetness_level_is_required}
          errorMessage={errors.sweetness}
        />

        <OptionGroup
          title="ขนาด"
          options={menu.size_name.map((item) => ({
            id: item.size_id,
            name: item.size_name,
          }))}
          selected={selectedSize ? [selectedSize] : []}
          onSelect={(option) =>
            handleSelection(setSelectedSize, option, selectedSize, false)
          }
          isRequired={menu.size_name[0]?.size_is_required}
          errorMessage={errors.size}
        />

        <OptionGroup
          title="ตัวเลือก"
          options={menu.add_on_name.map((item) => ({
            id: item.add_on_id,
            name: `${item.add_on_name} + ${item.add_on_name_price_addition} ฿`,
          }))}
          selected={selectedAddOn}
          onSelect={(option) =>
            handleSelection(setSelectedAddOn, option, selectedAddOn, true)
          }
          isMultiple={menu.add_on_name[0]?.add_on_is_multiple}
          isRequired={menu.add_on_name[0]?.add_on_is_required}
          errorMessage={errors.addOn}
        />
      </div>

      <div className="mt-4 flex flex-col items-center space-y-4">
        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-bold">จำนวน</span>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDelete}
              className="w-10 h-10 font-bold text-white bg-[#DC9494] rounded-full flex items-center justify-center"
            >
              -
            </button>
            <div className="w-20 h-10 font-bold text-center border border-[#AD8B73] rounded-full flex items-center justify-center">
              {quantity}
            </div>
            <button
              onClick={handleAdd}
              className="w-10 h-10 text-white bg-[#A2DC94] rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full flex flex-row items-center justify-between">
          <span className="font-bold">ราคา</span>
          <div className="w-40 text-center border border-[#AD8B73] text-black font-bold text-xl px-6 py-2 rounded-full">
            {calculatePrice().toFixed(2)} บาท
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#D4B28C] text-white rounded-full font-semibold"
        >
          + เพิ่มเข้าตระกร้า
        </button>
      </div>
    </div>
  );
};

export default MenuDetail;
