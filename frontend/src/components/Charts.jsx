import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export const Bargraph = () => {
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

export const Piechart = () => {
  const data = {
    labels: ["Hotel", "Shopping", "Transport", "Others"],
    datasets: [
      {
        data: [1000, 4000, 500, 4500],
        backgroundColor: ["#ef4444", "#60a5fa", "#facc15", "#4ade80"],
      },
    ],
  };
  return (
    <div className="flex flex-col bg-slate-100 dark:bg-slate-800 py-2 rounded-3xl shadow-md">
      {/* <p className="font-semibold text-xl ml-4">Insights</p> */}
      <div className="flex items-center ">
        <div style={{ width: "220px", margin: "auto" }} className="">
          <Pie data={data} />
        </div>
        <div className="text-2xl font-medium flex flex-col ">
          <p className="">Good Job! You </p>
          <p>spent 70% of your budget</p>
        </div>
      </div>
    </div>
  );
};
