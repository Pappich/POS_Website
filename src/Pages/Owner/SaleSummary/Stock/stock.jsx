import React from "react";
import SideBar from "../../../../Components/sideBar";
import AddCategoryButton from "../../../../Components/addCategoryButton";

const Stock = () => {
  return (
    <div>
      <SideBar menuTab={"stock"} />
      <h1 className="font-bold text-xl">คลังสินค้า</h1>
      <div className="flex justify-between">
        <span>หมวดหมู่</span>
        <AddCategoryButton/>
      </div>
    </div>
  );
};

export default Stock;
