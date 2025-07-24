import {
  WalletIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/solid";
import { getbudget, getTransactions } from "../api";
import React, { useEffect, useState } from "react";

const Cards = () => {
  const [transactionsData, setTransactionsData] = useState();
  const [budget, setBudget] = useState();
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const res = await getbudget();

        setBudget(res?.data);
      } catch (error) {
        console.error("Failed to load Budget summary:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const res = await getTransactions();
        setTransactionsData(res?.data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    fetchBudget();
    fetchTransactions();
  }, []);
  const cards = [
    {
      id: 1,
      title: "Total Budget",
      value: budget?.budget || 0,
      subtext:
        budget?.limit === 0 || !budget?.limit ? (
          <span>
            Limit : 0 ·{" "}
            <a
              href="/dashboard/setting"
              className="text-blue-500 font-medium underline"
            >
              Set Limit
            </a>
          </span>
        ) : (
          <span>
            Limit : {budget.limit} · Remaining :{" "}
            {budget.limit - transactionsData?.totalExpense}
          </span>
        ),

      icon: <WalletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-950",
      textColor: "text-slate-900 dark:text-slate-100",
      subtextColor: "text-slate-600 dark:text-slate-400",
    },
    {
      id: 2,
      title: "Spent",
      value: transactionsData?.totalExpense,
      subtext: `${
        transactionsData?.totalExpense
          ? Math.round((transactionsData.totalExpense / budget.budget) * 100)
          : 0
      }% of budget used`,
      icon: (
        <ArrowDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
      ),
      bgColor: "bg-red-100 dark:bg-red-950",
      textColor: "text-slate-900 dark:text-slate-100",
      subtextColor: "text-slate-600 dark:text-slate-400",
    },
    {
      id: 3,
      title: "Remaining",
      value: budget ? `${budget.budget - transactionsData?.totalExpense}` : "0",
      subtext: `${
        budget
          ? Math.round(
              ((budget.budget - transactionsData?.totalExpense) /
                budget.budget) *
                100
            )
          : 0
      }% of budget remaining`,
      icon: (
        <ArrowUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
      ),
      bgColor: "bg-green-100 dark:bg-green-950",
      textColor: "text-slate-900 dark:text-slate-100",
      subtextColor: "text-slate-600 dark:text-slate-400",
    },
    {
      id: 4,
      title: "Transactions",
      value: transactionsData?.totalTransactions,
      subtext: `Last updated : ${
        transactionsData?.lastTransactionDate
          ? new Date(transactionsData.lastTransactionDate).toLocaleDateString(
              "en-GB"
            )
          : "NA"
      }`,
      icon: (
        <ReceiptRefundIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      ),
      bgColor: "bg-gray-100 dark:bg-gray-800",
      textColor: "text-slate-900 dark:text-slate-100",
      subtextColor: "text-slate-600 dark:text-slate-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className={`p-4 rounded-xl shadow-md transition hover:scale-105 duration-200 ${card.bgColor}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {card.icon}
            <h3 className={`text-sm font-semibold ${card.textColor}`}>
              {card.title}
            </h3>
          </div>
          <p className={`text-xl font-bold ${card.textColor}`}>{card.value}</p>
          <p className={`text-xs mt-1 ${card.subtextColor}`}>{card.subtext}</p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
