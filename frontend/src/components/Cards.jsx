import React from "react";
import { FaHotel, FaPuzzlePiece } from "react-icons/fa6";
import { FaShoppingCart, FaCarSide } from "react-icons/fa";

const Cards = () => {
  return (
    <div className="flex gap-4 mt-4 text-[#0f172a] dark:text-[#f8fafc] h-full w-full">
      {/* Hotel */}
      <div className="flex flex-col items-center justify-center flex-1 h-40 bg-red-500 dark:bg-red-600 rounded-3xl shadow-md">
        <div className="bg-white text-[#0f172a]   rounded-full p-3 shadow-sm">
          <FaHotel size={22} />
        </div>
        <span className="text-xl font-bold mt-3">₹2500</span>
        <span className="text-sm font-medium">Hotel</span>
      </div>

      {/* Shopping */}
      <div className="flex flex-col items-center justify-center flex-1 h-40 bg-cyan-500 dark:bg-cyan-700 rounded-3xl shadow-md">
        <div className="bg-white rounded-full p-3 shadow-sm text-[#0f172a]">
          <FaShoppingCart size={22} />
        </div>
        <span className="text-xl font-bold mt-3">₹2500</span>
        <span className="text-sm font-medium">Shopping</span>
      </div>

      {/* Transport */}
      <div className="flex flex-col items-center justify-center flex-1 h-40 bg-yellow-400 dark:bg-yellow-600 rounded-3xl shadow-md">
        <div className="bg-white rounded-full p-3 shadow-sm text-[#0f172a]">
          <FaCarSide size={22} />
        </div>
        <span className="text-xl font-bold mt-3">₹2500</span>
        <span className="text-sm font-medium">Transport</span>
      </div>

      {/* Others */}
      <div className="flex flex-col items-center justify-center flex-1 h-40 bg-green-500 dark:bg-green-600 rounded-3xl shadow-md">
        <div className="bg-white rounded-full p-3 shadow-sm text-[#0f172a]">
          <FaPuzzlePiece size={22} />
        </div>
        <span className="text-xl font-bold mt-3">₹2500</span>
        <span className="text-sm font-medium">Others</span>
      </div>
    </div>
  );
};

export default Cards;
