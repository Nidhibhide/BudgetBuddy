import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ffffff] dark:bg-[#000000] text-[#0f172a] dark:text-[#f8fafc] h-screen w-screen">
      <div className="h-full w-full flex">
        <div className="flex-1 flex flex-col gap-2">
          <div className="text-4xl font-bold">Track. Save. Smile.</div>
          <div className="text-lg">
            From daily expenses to monthly insights, everything stays clear and
            organized. Built for simplicity, designed to keep you focused on
            what matters. Ready to manage your money smarter?
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              //   disabled={loading}
              //   onClick={handleSubmit}
              onClick={() => navigate("/signin")}
              className="bg-[#6366f1] dark:bg-[#818cf8] md:py-3 py-2.5 md:text-lg text-base font-medium text-white rounded-xl md:mb-4 mb-2 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:shadow-md transition duration-500 w-1/4"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <Outlet />
      {/* <SignIn/> */}
    </div>
  );
};

export default Home;
