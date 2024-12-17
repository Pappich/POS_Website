import React from "react";

const Order = () => {
  const myName = [
    { name: "Tot", age: 5 },
    { name: "T", age: 51 },
    { name: "O", age: 52 },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* {myName.map((item, index) => (
        <div key={index} className="bg-slate-600">
          Hello {item.name}, age {item.age}
        </div>
      ))} */}
      <div className="col-span-2">
        LOGO
        <div>Date: 05/09/2024</div>
        <div className="flex justify-around">
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10  py-2 rounded-full font-bold">
            00 Orders
          </div>
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10 py-2 rounded-full font-bold">
            00 Process
          </div>
          <div className="border-solid border-2 border-[#D4B28C] bg-[#D4B28C] px-10 py-2 rounded-full font-bold">
            00 Served
          </div>
        </div>
        {/* ตัวCard */}
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] shadow-md rounded-2xl bg-[#F6F6F6]">
              <div className="bg-[#D8D8D8] flex flex-col items-center justify-center p-4 rounded-2xl">
                <div className="font-bold">Queue 03</div>
                <div>⌛: 15 นาที</div>
              </div>
              <div className="flex items-center justify-center font-bold">
                Order Summary
              </div>
              <div className="flex justify-between px-4 pt-2 font-bold">
                <div>Menu Name</div>
                <div>Pending</div>
              </div>
              {/* ชื่อเมนู */}
              <div className="h-[200px] overflow-y-auto px-4">
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
              </div>
              <div className="space-y-2 w-full p-4">
                <button className="w-full bg-[#C6B399] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
            {/* คิวหัวน้อย */}
            <div className="min-w-[300px] shadow-md rounded-2xl bg-[#F6F6F6]">
              <div className="bg-[#D8D8D8] flex flex-col items-center justify-center p-4 rounded-2xl">
                <div className="font-bold">Queue 03</div>
                <div>⌛: 15 นาที</div>
              </div>
              <div className="flex items-center justify-center font-bold">
                Order Summary
              </div>
              <div className="flex justify-between px-4 pt-2 font-bold">
                <div>Menu Name</div>
                <div>Pending</div>
              </div>
              {/* ชื่อเมนู */}
              <div className="h-[200px] overflow-y-auto px-4">
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
                <div className="flex justify-between">
                  <div>Strawberry Cake</div>
                  <div>1</div>
                </div>
                <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
              </div>
              <div className="space-y-2 w-full p-4">
                <button className="w-full bg-[#C6B399] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Cancel Order
                </button>
              </div>
            </div>

            {/* Add more cards as needed */}
          </div>
        </div>
      </div>

      <div className="bg-[#F6F6F6] rounded-2xl shadow-md">
        {/* ข้างบน */}
        <div className="bg-[#F6F6F6] flex flex-col items-center justify-center rounded-2xl">
          <div className="font-bold">QUEUE 02</div>
          <div className="flex justify-between">
            <span className="font-bold">Payment Method:&nbsp;</span>
            <span>เงินสด</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Status:&nbsp;</span>
            <span>กำลังรอเครื่องดื่ม</span>
          </div>
          <div className="flex justify-between">
            <span>⌛:&nbsp;</span>
            <span>15 นาที</span>
          </div>
          <div className="font-bold">Order Summary</div>
        </div>
        {/* ข้างล่าง */}
        <div className="p-4">
          <div className="flex justify-between font-bold">
            <div>Menu Name</div>
            <div>Pending</div>
          </div>
          {/* ชื่อเมนู */}
          <div className="h-[200px] overflow-y-auto">
            <div className="flex justify-between">
              <div>Strawberry Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
            <div className="flex justify-between">
              <div>Chocolate Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
            <div className="flex justify-between">
              <div>Cheese Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
            <div className="flex justify-between">
              <div>Strawberry Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
            <div className="flex justify-between">
              <div>Strawberry Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
            <div className="flex justify-between">
              <div>Strawberry Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>

            <div className="flex justify-between">
              <div>Strawberry Cake</div>
              <div>1</div>
            </div>
            <span className="ml-4 text-[#FF5555]">ทานที่ร้าน</span>
          </div>
          <div class="space-y-2 w-full pt-2">
            <button class="w-full bg-[#C6B399] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Cancel Order
            </button>
            <button class="w-full bg-[#DD9F52] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
              Order Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
