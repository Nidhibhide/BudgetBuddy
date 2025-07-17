import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
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
import { Button, Tooltip } from "../../../components";
ChartJS.register(ArcElement, ChartTip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTip, Legend);
const Dashboard = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setOpen(true);
    }, 3000);
    return () => {
      clearTimeout(firstTimer);
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col m-4 ">
      {/* <h1 className="text-3xl font-medium">Welcome {user?.name} !</h1>{" "} */}
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

      {/* <div className="flex pt-6 gap-5 ">
        <Piechart />
        <div className="bg-slate-100 dark:bg-slate-800 rounded-xl shadow-md p-4 flex flex-col gap-4 text-slate-900 dark:text-slate-100">

          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold">💰 Total Balance</h2>
            <p className="text-3xl font-bold">₹10,000</p>
          </div>

          <div className="flex justify-between items-center text-sm font-medium">
            <span>Spent: ₹6,500</span>
            <span className="text-green-600 dark:text-green-400">
              You're on track!
            </span>
          </div>

          <div className="text-right mt-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            65% of budget used
          </div>
        </div>
      </div> */}
      {/* <Cards /> */}
      {/* <div className="flex gap-5 mt-4  ">
        <Bargraph />

        <div className=" flex flex-col gap-2 h-[325px] bg-slate-100 dark:bg-slate-800 rounded-xl shadow-md p-2 flex-1 ">
          <div className="flex justify-between ">
            <span className=" font-semibold text-lg">Latest Transactions</span>
            <span className="font-bold text-sm">Show more</span>
          </div>
          <ul className="flex flex-col h-full  overflow-y-auto  ">
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className="  font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className="font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className="font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className=" font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className=" font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex  justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className=" font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
            <li className="flex justify-between py-1 border-b-2 border-black dark:border-white">
              <div className="flex flex-col">
                <span className=" font-bold">D mart</span>
                <span className="text-sm">1 day ago</span>
              </div>
              <span className="font-medium text-lg">500 Rs</span>
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
