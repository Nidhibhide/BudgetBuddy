import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip as ChartTip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { IoAddSharp } from "react-icons/io5";
import {
  Button,
  Tooltip,
  Cards,
  Piechart,
  Bargraph,
  SmartTips,
  ProgressBar,
  LatestTransaction,
} from "../../../components";
ChartJS.register(ArcElement, ChartTip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTip, Legend);
const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col m-4 ">
      <div className="flex justify-end  mb-4">
        <Tooltip label="Add new Entry">
          <Button
            width="w-[150px]"
            onClick={() => navigate("/dashboard/add-entry")}
          >
            {" "}
            <div className="flex justify-center items-center gap-1">
              Add New
              <IoAddSharp size={22} />
            </div>
          </Button>
        </Tooltip>
      </div>
      <Cards />
      <div className="flex gap-4 mt-4 mr-2 ">
        <div className="w-[50%]">
          <Piechart />
        </div>
        <div className="w-[50%]">
          <Bargraph />
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <div className="w-[50%]">
          <ProgressBar />
        </div>
        <div className="w-[50%] ">
          <SmartTips />
        </div>
      </div>
      <div className="mt-4">
        <LatestTransaction />
      </div>
    </div>
  );
};

export default Dashboard;
