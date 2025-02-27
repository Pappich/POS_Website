import React, { useState, useEffect } from "react";
import CalendarSelect from "../../../../Components/Owner/calendarSelect";
import IncomeOrderCancel from "../../../../Components/Owner/incomeOrderCancel";
import BarChart from "../../../../Components/Owner/barChart";
import PieChart from "../../../../Components/Owner/pieChart";
import SideBar from "../../../../Components/Owner/sideBar";
import fetchApi from "../../../../Config/fetchApi";
import configureAPI from "../../../../Config/configureAPI";

const Home = () => {
  const environment = process.env.NODE_ENV || "development";
  const URL = configureAPI[environment].URL;

  // Set default date to today's date in the format YYYY-MM-DD
  const today = new Date();
  const options = {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = today.toLocaleDateString("en-CA", options);

  const [selectedDate, setSelectedDate] = useState(formattedDate); // Default date
  const [data, setData] = useState(null); // State to hold fetched data

  // Function to fetch data based on the selected date
  console.log("SELECTED DATE", selectedDate);

  const fetchData = async (selectedDate) => {
    try {
      const response = await fetchApi(
        `${URL}/owner/stock-summary/${selectedDate}`,
        "GET"
      );

      if (response.ok) {
        const result = await response.json();
        setData(result); // Set the fetched data
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("DATA IN HOME", data);

  // Fetch data when the component mounts or when the selected date changes
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  return (
    <div>
      <SideBar menuTab={"overview"} />
      <h1 className="font-bold text-xl">ภาพรวมการขาย</h1>
      <span className="flex justify-end">
        <CalendarSelect setSelectedDate={setSelectedDate} />
      </span>
      <IncomeOrderCancel data={data} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <div className="bg-white p-4 border rounded-lg col-span-2">
          <h2 className="text-lg font-semibold mb-2">
            กราฟสรุปรายรับประจำเดือน
          </h2>
          <BarChart monthlyRevenue={data?.monthly_revenue} />
        </div>
        <div className="bg-white p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">เมนูขายดี</h2>
          <PieChart topThree={data?.top_three} />
        </div>
      </div>
    </div>
  );
};

export default Home;
