import React, { useEffect, useState } from "react";
import { FaWallet } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);
  const Icon = darkMode ? IoSunnyOutline : IoMoonOutline;
  return (
    <div className=" text-[#0f172a] dark:text-[#f8fafc] h-screen w-screen">
      <div className=" font-bold text-2xl py-6 flex items-center gap-2 md:px-12 px-4 bg-[#f1f5f9] dark:bg-[#1e293b] justify-between">
        <div className="flex gap-2">
          {" "}
          <FaWallet size={28} />
          BudgetBuddy
        </div>
        <Icon
          size={28}
          className="cursor-pointer"
          onClick={() => setDarkMode(!darkMode)}
        />
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
