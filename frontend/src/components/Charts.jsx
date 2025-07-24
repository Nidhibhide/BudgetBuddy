import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { appStore } from "../store";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { getCategoryData } from "../api";
import { CATEGORIES } from "../../../shared/constants";
import { getLastSixMonths } from "./index";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Bargraph = () => {
  const data = {
    labels: getLastSixMonths(),
    datasets: [
      {
        label: "Expenses",
        data: [3000, 2800, 3200, 3100, 2900, 3300],
        backgroundColor: "#ef4444",
      },
      {
        label: "Income",
        data: [5000, 5200, 5100, 5300, 5400, 5600],
        backgroundColor: "#4ade80",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#374151", // Tailwind gray-700
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#6b7280", // Tailwind gray-500
        },
      },
      x: {
        ticks: {
          color: "#6b7280",
        },
      },
    },
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">
        Monthly Income vs Expenses
      </h2>
      <p className="text-sm text-gray-500 mb-4 mx-4">
        This chart shows your income and expenses over the last 6 months.
      </p>
      <div className="lg:h-[350px] h-[280px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
export const Piechart = () => {
  const [categorydata, setCategoryData] = useState();

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await getCategoryData();
        const data = res.data;

        const finalData = CATEGORIES.map((cat) => {
          const found = data.find((item) => item.category === cat);
          return {
            category: cat,
            totalExpense: found?.totalExpense || 0,
          };
        });
        setCategoryData(finalData);
      } catch (error) {
        console.error("Failed to load categories data:", error);
      }
    };

    fetchCategoryData();
  }, []);
  const GET_CATEGORY = appStore((state) => state.categories);
  const data = {
    labels: GET_CATEGORY,
    datasets: [
      {
        data: categorydata?.map((item) => item.totalExpense),
        backgroundColor: ["#ef4444", "#60a5fa", "#facc15", "#4ade80"],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
  };
  return (
    <div className="bg-gray-50 rounded-xl shadow-md p-4">
      <h2 className="text-center text-lg font-semibold mb-2 text-gray-800">
        Expense Breakdown
      </h2>
      <div className="lg:h-[350px] h-[300px]">
        <Pie data={data} options={options} />
      </div>
      <p className="text-sm text-center text-gray-500 mt-2">
        Overview of spending by category
      </p>
    </div>
  );
};


