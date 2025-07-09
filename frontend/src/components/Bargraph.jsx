import React from "react";
import { Bar } from "react-chartjs-2";
const Bargraph = () => {
  const data1 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Expenses",
        data: [3000, 2800, 3200, 3100, 2900, 3300],
        backgroundColor: "#ef4444", // Tailwind Red
      },
      {
        label: "Income",
        data: [5000, 5200, 5100, 5300, 5400, 5600],
        backgroundColor: "#4ade80", // Tailwind Green
      },
    ],
  };
  return (
    <div className="flex flex-col gap-4 p-3  bg-slate-100 dark:bg-slate-800 rounded-3xl shadow-md w-[400px] overflow-auto">
      {/* <span className="text-lg font-semibold ml-4">Overview</span> */}

      <div
        className=" w-full h-[280px]"
        // style={{ width: "400px", height: "280px", margin: "auto" }}
      >
        <Bar
          data={data1}
          options={{
            maintainAspectRatio: false, // ✅ allows custom height
          }}
        />
      </div>
    </div>
  );
};

export default Bargraph;
