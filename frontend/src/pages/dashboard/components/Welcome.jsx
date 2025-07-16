import React, { useState,useEffect } from "react";
import { Sidebar } from "../index";
import { Outlet } from "react-router-dom";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { appStore } from "../../../store";
const Welcome = () => {
  const theme = appStore((state) => state.theme);
  useEffect(() => {
    const root = document.documentElement;
    if (theme==='Dark') {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  const [showSidebar, setShowSidebar] = useState(false);
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
    </div>
  );
};

export default Welcome;
