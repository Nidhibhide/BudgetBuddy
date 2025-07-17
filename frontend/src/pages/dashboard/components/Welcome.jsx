import React, { useState, useEffect } from "react";
import { Sidebar } from "../index";
import { Outlet } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { appStore } from "../../../store";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { getbudget } from "../../../api";
const Welcome = () => {
  const theme = appStore((state) => state.theme);
  const limit = appStore((state) => state.limit);
  const [showSidebar, setShowSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [budget, setBudget] = useState(0);
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "Dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Call API every 1 hour
  useEffect(() => {
    fetchBudgetData(); // Initial call
    const interval = setInterval(fetchBudgetData, 3600000); // 1 hour

    return () => clearInterval(interval); // Cleanup
  }, []);

  const fetchBudgetData = async () => {
    try {
      const res = await getbudget();
      setBudget(res?.data?.budget || 0);
      if (limit !== 0 && res?.data?.budget > limit) {
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  return (
    <div className="h-screen w-full    text-[#0f172a] dark:text-[#f8fafc] flex">
      <div className="hidden xl:block">
        <Sidebar />
      </div>
      <div className="xl:hidden absolute top-4 left-4 z-50 ">
        <button onClick={() => setShowSidebar(true)}>
          <IoMenu size={24} />
        </button>
      </div>
      {showSidebar && (
        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar slides in from the left */}
          <div className="w-72 bg-black h-full">
            <Sidebar />
          </div>

          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white z-50"
            onClick={() => setShowSidebar(false)}
          >
            <IoCloseSharp size={28} />
          </button>

          {/* Transparent overlay to close sidebar when clicked outside */}
          <div
            className="flex-1 bg-black bg-opacity-40 "
            onClick={() => setShowSidebar(false)}
          />
        </div>
      )}
      <div className="bg-[#ffffff] dark:bg-[#000000]  flex-1 overflow-y-auto">
        <Outlet />
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <div className="bg-yellow-200 text-yellow-900 p-3 rounded w-full max-w-md shadow">
          ⚠️ You’ve exceeded your ₹{limit} limit! Total spent: ₹{budget}.
        </div>
      </Snackbar>
    </div>
  );
};

export default Welcome;
