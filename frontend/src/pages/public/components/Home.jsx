import React from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#ffffff]  dark:bg-[#000000] text-[#0f172a] dark:text-[#f8fafc]  h-auto w-full py-24    ">
      <div className="flex xl:flex-row flex-col gap-12 xl:gap-2 px-4 md:px-20 ">
        <div className="flex-1 flex flex-col xl:gap-8 gap-6 ">
          <div className="xl:text-7xl  md:text-6xl text-4xl  font-bold text-center xl:text-left ">
            Hey there! Ready to take{" "}
            <span className="text-indigo-500">control</span> of your money?
          </div>

          <div className="md:text-xl text-center xl:text-left text-lg ">
            From daily spends to monthly insights — all in one clean view.
            Simple. Smart. Stress-free.
          </div>
          <div className="flex gap-4 justify-center xl:justify-start ">
            <button
              type="button"
              onClick={() => navigate("/signin")}
              className="bg-[#6366f1] dark:bg-[#818cf8]  md:py-3 py-2 text-base  font-medium text-white rounded-xl  hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:shadow-md transition duration-500 w-[150px] "
            >
              Get Started
            </button>
            <a
              href="#features"
              className="bg-[#6366f1] dark:bg-[#818cf8]  md:py-3 py-2  text-center  text-base font-medium text-white rounded-xl  hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:shadow-md transition duration-500  w-[150px]"
            >
              Read more
            </a>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://wallpapercave.com/wp/wp2722928.jpg"
            alt="expense tracker image"
            className="w-full h-[500px] object-cover"
          />
        </div>
      </div>
      <div className="w-full flex justify-center mt-28 px-4" id="features">
        <div className="flex flex-col justify-center items-center max-w-6xl ">
          <h1 className="md:text-5xl text-center font-bold text-4xl">
            Features
          </h1>
          <p className="text-lg text-center mt-4">
            Explore our powerful tools designed to help you manage your finances
            effortlessly.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                💡
              </div>
              <h2 className="text-xl font-semibold text-center">
                Powerful Dashboard
              </h2>
              <p className=" text-center ">
                Get an instant overview of your financial health with clean
                charts and data.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                📊
              </div>
              <h2 className="text-xl font-semibold text-center">
                Spending Analytics
              </h2>
              <p className=" text-center ">
                Understand where your money goes with clear, insightful
                analytics.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                🔐
              </div>
              <h2 className="text-xl font-semibold text-center">
                Secure Login
              </h2>
              <p className=" text-center ">
                Your data is protected with industry-standard encryption and
                OAuth login.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                ⚙️
              </div>
              <h2 className="text-xl font-semibold text-center">
                Custom Categories
              </h2>
              <p className=" text-center ">
                Create and manage categories that match your lifestyle and
                habits.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                📅
              </div>
              <h2 className="text-xl font-semibold text-center">
                Monthly Reports
              </h2>
              <p className="text-center ">
                Get detailed monthly summaries to stay on track with your budget
                goals.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-lg p-6 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl">
                🔔
              </div>
              <h2 className="text-xl font-semibold text-center">
                Smart Alerts
              </h2>
              <p className=" text-center ">
                Get notified of overspending, due bills, and upcoming payments.
              </p>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#f1f5f9] dark:bg-[#1e293b]  mt-28 p-3">
        <div className=" text-center ">
          <h2 className="text-2xl font-bold">BudgetBuddy</h2>
          <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
            Simplify your spending. Master your money.
          </p>
          <p className="text-xs mt-4 text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} BudgetBuddy. Built with care for
            personal finance lovers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
