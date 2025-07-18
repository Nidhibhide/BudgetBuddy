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
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
// import {
//   AccountBalanceWalletOutlined,
//   TrendingDown,
//   TrendingUp,
//   ReceiptOutlined,
// } from '@mui/icons-material';
import {
  MdAccountBalanceWallet,
  MdTrendingDown,
  MdTrendingUp,
  MdReceipt,
} from "react-icons/md";

import { Button, Tooltip } from "../../../components";
ChartJS.register(ArcElement, ChartTip, Legend);
ChartJS.register(BarElement, CategoryScale, LinearScale, ChartTip, Legend);
const Dashboard = () => {
  const cards = [
    {
      id: 1,
      title: "Total Budget",
      value: "₹4,200",
      subtext: 1
        ? `Limit: ₹${4000} · Remaining: ₹${5000 - 4200}`
        : "No limit set · Tracking only",
      icon: <MdAccountBalanceWallet size={30} className="text-blue-500" />,
    },
    {
      id: 2,
      title: "Spent",
      value: "₹4,200",
      subtext: "42% of budget used",
      icon: <MdTrendingDown size={30} className="text-red-500" />,
    },
    {
      id: 3,
      title: "Remaining",
      value: "₹5,800",
      subtext: "58% left to use",
      icon: <MdTrendingUp size={30} className="text-green-500" />,
    },
    {
      id: 4,
      title: "Transactions",
      value: "12",
      subtext: "Last updated: 16 Jul",
      icon: <MdReceipt size={30} className="text-gray-500" />,
    },
  ];

  const [open, setOpen] = useState(false);
  useEffect(() => {
    const firstTimer = setTimeout(() => {
      setOpen(true);
    }, 3000);
    return () => {
      clearTimeout(firstTimer);
    };
  }, []);
  const [selectedCard, setSelectedCard] = useState(0);

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

      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
          gap: 2,
        }}
      >
        {cards.map((card, index) => (
          <Card key={card.id}>
            <CardActionArea
              onClick={() => setSelectedCard(index)}
              data-active={selectedCard === index ? "" : undefined}
              sx={{
                height: "100%",
                "&[data-active]": {
                  backgroundColor: "action.selected",
                  "&:hover": {
                    backgroundColor: "action.selectedHover",
                  },
                },
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  {card.icon}
                  <Typography variant="body1" fontWeight={600}>
                    {card.title}
                  </Typography>
                </Box>
                <Typography variant="h6" gutterBottom>
                  {card.value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.subtext}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

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
