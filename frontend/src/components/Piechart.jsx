import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const Piechart = () => {
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

export default Piechart;
