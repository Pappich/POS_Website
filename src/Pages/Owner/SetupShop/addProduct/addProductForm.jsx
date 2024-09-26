import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProductForm = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productPrice, setProductPrice] = useState("");

  const handleNext = () => {
    if (step === 5) {
      //ADD HANDLE SEND TO BACKEND
      navigate("/product-list");
    }
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigate("/product-list");
    }
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImage(URL.createObjectURL(file));
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              1. กรอกชื่อสินค้าที่ต้องการ
            </div>
            <label
              htmlFor="productName"
              className="text-lg mb-2 w-full text-center"
            >
              ชื่อสินค้า
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="กรอกชื่อสินค้า..."
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </>
        );
      case 2:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              2. กรอกรายละเอียดของสินค้า
            </div>
            <label
              htmlFor="productDetails"
              className="text-lg mb-2 w-full text-center"
            >
              รายละเอียดสินค้า
            </label>
            <input
              type="text"
              id="productDetails"
              value={productDetails}
              onChange={(e) => setProductDetails(e.target.value)}
              placeholder="กรอกรายละเอียดสินค้า..."
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              3. อัปโหลดรูปภาพสินค้า
            </div>
            <label
              htmlFor="productDetails"
              className="text-lg mb-2 w-full text-center"
            >
              รูปภาพสินค้า
            </label>

            <div className="w-full flex justify-center">
              <label className="w-full h-[400px] border-2 border-dashed border-[#D4B28C] rounded-lg flex flex-col items-center justify-center cursor-pointer">
                {productImage ? (
                  <img
                    src={productImage}
                    alt="Uploaded"
                    className="h-80 object-contain"
                  />
                ) : (
                  <>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2716/2716054.png"
                      alt="Upload Icon"
                      className="w-40 h-40"
                    />
                  </>
                )}
                <p className="text-center text-brown-500 mb-2 mt-2">
                  <span className="text-[#D4B28C] font-bold">คลิก</span>
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
          </>
        );
      case 4:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              4. กรอกราคาของสินค้า
            </div>
            <label
              htmlFor="productPrice"
              className="text-lg mb-2 w-full text-center"
            >
              ราคาสินค้า (บาท)
            </label>
            <input
              type="text"
              id="productPrice"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="กรอกราคาสินค้า..."
              className="w-full border border-[#D4B28C] rounded-full p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-brown-400"
            />
          </>
        );
      case 5:
        return (
          <>
            <div className="w-full flex justify-start text-lg mb-5 font-bold">
              5. สรุปรายการสินค้า
            </div>
            <div className="flex w-full space-x-8 justify-between mb-2">
              <p className="font-bold">ชื่อสินค้า {productName}</p>
              <p className="font-bold">ราคาสินค้า {productPrice} บาท</p>
            </div>
            <div className="font-bold text-left mb-2 w-full">รูปภาพสินค้า</div>
            <div className="w-full h-[400px] border border-[#D4B28C] rounded-lg flex flex-col items-center justify-center mb-4">
              {productImage && (
                <img
                  src={productImage}
                  alt="Uploaded"
                  className="h-[380px] object-contain"
                />
              )}
            </div>
            <div className="w-full">
              <p className="font-bold">รายละเอียดสินค้า</p>
              <div className=" h-[40px] border border-[#D4B28C] rounded-full p-3 text-gray-600 flex items-center">
                {productDetails}
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold mb-2">เพิ่มรายการสินค้า</h1>
        <div className="w-20 h-1 bg-[#D4B28C] my-6"></div>
      </div>

      <div className="w-full">
        <div className="flex flex-col items-center w-full">
          {renderStepContent()}
        </div>

        <div className="flex mt-8 w-full space-x-8 justify-between">
          <button
            className={`px-6 py-3 w-[250px] rounded-full border border-[#D4B28C] text-[#D4B28C] font-bold`}
            onClick={handleBack}
          >
            ย้อนกลับ
          </button>
          <button
            className="px-6 py-3 w-[250px] rounded-full bg-[#D4B28C] text-white font-bold"
            onClick={handleNext}
          >
            {step < 5 ? "ถัดไป" : "บันทึก"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;
