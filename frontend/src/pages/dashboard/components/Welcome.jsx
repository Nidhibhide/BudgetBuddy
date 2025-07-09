import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Welcome = () => {

  return (
    <div className="h-full w-full    text-[#0f172a] dark:text-[#f8fafc] flex">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <div className="bg-[#ffffff] dark:bg-[#000000] h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Welcome;
