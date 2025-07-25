import React, { useState, useEffect } from "react";
import { getTips } from "../api";
import { DEFAULT_TIPS } from "../../../shared/constants";
const SmartTips = () => {
  const [tips, setTips] = useState([]);
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const res = await getTips();
        if (res.data.length === 0) {
          setTips(DEFAULT_TIPS);
        } else {
          setTips(res.data);
        }
      } catch (error) {
        console.error("Failed to load Smart Tips:", error);
      }
    };

    fetchTips();
  }, []);

  return (
    <div className="p-2 w-full ">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
        💡 Smart Tips
        <span className="text-sm bg-blue-100 text-blue-700 dark:bg-cyan-300 dark:text-cyan-900 px-2 py-0.5 rounded-full">
          {tips.length}
        </span>
      </h2>
      <ul className="space-y-3 list-disc list-inside overflow-y-auto max-h-[440px] pr-2">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-slate-100 px-4 py-2.5 rounded-md shadow-sm hover:bg-blue-100 dark:hover:bg-slate-700 transition"
          >
            {tip}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SmartTips;
