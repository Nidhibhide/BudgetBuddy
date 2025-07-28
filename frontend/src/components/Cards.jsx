// import {
//   WalletIcon,
//   ArrowDownIcon,
//   ArrowUpIcon,
//   ReceiptRefundIcon,
// } from "@heroicons/react/24/solid";
// import { getbudget, getTransactions } from "../api";
// import React, { useEffect, useState } from "react";
// import { convertCurrency } from "./index";
// import { authStore } from "../store";

// const Cards = () => {
//   const [transactionsData, setTransactionsData] = useState();
//   const User = authStore((state) => state.user);
//   const [convertedValues, setConvertedValues] = useState({
//     budget: 0,
//     spent: 0,
//     remaining: 0,
//   });
//   const [convertedLimitData, setConvertedLimitData] = useState({
//     limit: 0,
//     remaining: 0,
//   });

//   const [originalBudget, setOriginalBudget] = useState(0);

//   const [budget, setBudget] = useState();
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const budgetRes = await getbudget();
//         const transactionRes = await getTransactions();

//         const budgetData = budgetRes?.data;
//         const transactionData = transactionRes?.data;

//         setBudget(budgetData);
//         setTransactionsData(transactionData);

//         const originalBudget = parseFloat(
//           (budgetData?.budget + transactionData?.totalExpense).toFixed(2)
//         );
//         setOriginalBudget(originalBudget);

//         //set values
//         const [convertedBudget, convertedSpent, convertedRemaining] =
//           await Promise.all([
//             convertCurrency(originalBudget, User?.currency, "INR"),
//             convertCurrency(
//               transactionData?.totalExpense,
//               User?.currency,
//               "INR"
//             ),
//             convertCurrency(
//               originalBudget - transactionData?.totalExpense,
//               User?.currency,
//               "INR"
//             ),
//           ]);

//         setConvertedValues({
//           budget: convertedBudget,
//           spent: convertedSpent,
//           remaining: convertedRemaining,
//         });

//         //set limit values
//         const [convertedLimit, convertedLimitRemaining] = await Promise.all([
//           convertCurrency(budgetData?.limit, User?.currency, "INR"),
//           convertCurrency(
//             budgetData.limit - transactionData?.totalExpense,
//             User?.currency,
//             "INR"
//           ),
//         ]);

//         setConvertedLimitData({
//           limit: convertedLimit,
//           remaining: convertedLimitRemaining,
//         });
//       } catch (error) {
//         console.error("Failed to load data:", error);
//       }
//     };

//     fetchData();
//   }, [User?.currency]);
//   if (!budget || !transactionsData) return null;

//   const cards = [
//     {
//       id: 1,
//       title: "Total Budget",
//       value: convertedValues.budget + " " + User?.currency,
//       subtext:
//         budget?.limit === 0 || !budget?.limit ? (
//           <span>
//             Limit : 0 ·{" "}
//             <a
//               href="/dashboard/setting"
//               className="text-blue-500 font-medium underline"
//             >
//               Set Limit
//             </a>
//           </span>
//         ) : (
//           <span>
//             Limit : {convertedLimitData.limit.toFixed(2)} {User?.currency} ·
//             Remaining : {convertedLimitData.remaining.toFixed(2)}{" "}
//             {User?.currency}
//           </span>
//         ),

//       icon: <WalletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
//       bgColor: "bg-blue-100 dark:bg-blue-950",
//       textColor: "text-slate-900 dark:text-slate-100",
//       subtextColor: "text-slate-600 dark:text-slate-400",
//     },
//     {
//       id: 2,
//       title: "Spent",
//       value: convertedValues.spent + " " + User?.currency,
//       subtext: `${
//         transactionsData?.totalExpense
//           ? Math.round((transactionsData.totalExpense / originalBudget) * 100)
//           : 0
//       }% of budget used`,
//       icon: (
//         <ArrowDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
//       ),
//       bgColor: "bg-red-100 dark:bg-red-950",
//       textColor: "text-slate-900 dark:text-slate-100",
//       subtextColor: "text-slate-600 dark:text-slate-400",
//     },
//     {
//       id: 3,
//       title: "Remaining",
//       value: originalBudget
//         ? `${convertedValues.remaining.toFixed(2)} ${User?.currency}`
//         : "0",
//       subtext: `${
//         budget
//           ? Math.round(
//               ((originalBudget - transactionsData?.totalExpense) /
//                 originalBudget) *
//                 100
//             )
//           : 0
//       }% of budget remaining`,
//       icon: (
//         <ArrowUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
//       ),
//       bgColor: "bg-green-100 dark:bg-green-950",
//       textColor: "text-slate-900 dark:text-slate-100",
//       subtextColor: "text-slate-600 dark:text-slate-400",
//     },
//     {
//       id: 4,
//       title: "Transactions",
//       value: transactionsData?.totalTransactions,
//       subtext: `Last updated : ${
//         transactionsData?.lastTransactionDate
//           ? new Date(transactionsData.lastTransactionDate).toLocaleDateString(
//               "en-GB"
//             )
//           : "NA"
//       }`,
//       icon: (
//         <ReceiptRefundIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
//       ),
//       bgColor: "bg-gray-100 dark:bg-gray-800",
//       textColor: "text-slate-900 dark:text-slate-100",
//       subtextColor: "text-slate-600 dark:text-slate-400",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//       {cards.map((card) => (
//         <div
//           key={card.id}
//           className={`p-4 rounded-xl shadow-md transition hover:scale-105 duration-200 ${card.bgColor}`}
//         >
//           <div className="flex items-center gap-2 mb-2">
//             {card.icon}
//             <h3 className={`text-sm font-semibold ${card.textColor}`}>
//               {card.title}
//             </h3>
//           </div>
//           <p className={`text-xl font-bold ${card.textColor}`}>{card.value}</p>
//           <p className={`text-xs mt-1 ${card.subtextColor}`}>{card.subtext}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Cards;
import {
  WalletIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/24/solid";
import { getbudget, getTransactions } from "../api";
import React, { useEffect, useState } from "react";
import { convertCurrency } from "./index";
import { authStore } from "../store";

const Cards = () => {
  const User = authStore((state) => state.user);
  const [data, setData] = useState({
    budget: 0,
    spent: 0,
    remaining: 0,
    limit: 0,
    limitRemaining: 0,
    transactions: 0,
    lastTransactionDate: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, transactionRes] = await Promise.all([
          getbudget(),
          getTransactions(),
        ]);

        const budgetData = budgetRes?.data || {};
        const transactionData = transactionRes?.data || {};
        const totalExpense = transactionData?.totalExpense || 0;

        const originalBudget = parseFloat(
          (budgetData.budget + totalExpense).toFixed(2)
        );

        const [
          convertedBudget,
          convertedSpent,
          convertedRemaining,
          convertedLimit,
          convertedLimitRemaining,
        ] = await Promise.all([
          convertCurrency(originalBudget, User?.currency, "INR"),
          convertCurrency(totalExpense, User?.currency, "INR"),
          convertCurrency(originalBudget - totalExpense, User?.currency, "INR"),
          convertCurrency(budgetData.limit || 0, User?.currency, "INR"),
          convertCurrency(
            (budgetData.limit || 0) - totalExpense,
            User?.currency,
            "INR"
          ),
        ]);

        setData({
          budget: convertedBudget,
          spent: convertedSpent,
          remaining: convertedRemaining,
          limit: convertedLimit,
          limitRemaining: convertedLimitRemaining,
          transactions: transactionData?.totalTransactions || 0,
          lastTransactionDate: transactionData?.lastTransactionDate || null,
        });
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    fetchData();
  }, [User?.currency]);

  const cards = [
    {
      id: 1,
      title: "Total Budget",
      value: data.budget ? `${data.budget.toFixed(2)} ${User?.currency}` : 0,
      subtext:
        data.limit === 0 ? (
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
            Limit : {data.limit.toFixed(2)} {User?.currency} · Remaining :{" "}
            {data.limitRemaining.toFixed(2)} {User?.currency}
          </span>
        ),
      icon: <WalletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      id: 2,
      title: "Spent",
      value: data.spent ? `${data.spent.toFixed(2)} ${User?.currency}` : 0,
      subtext: `${
        data.budget ? Math.round((data.spent / data.budget) * 100) : 0
      }% of budget used`,
      icon: (
        <ArrowDownIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
      ),
      bgColor: "bg-red-100 dark:bg-red-950",
    },
    {
      id: 3,
      title: "Remaining",
      value: data.remaining ? `${data.remaining.toFixed(2)} ${User?.currency}` : 0,
      subtext: `${
        data.budget ? Math.round((data.remaining / data.budget) * 100) : 0
      }% of budget remaining`,
      icon: (
        <ArrowUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
      ),
      bgColor: "bg-green-100 dark:bg-green-950",
    },
    {
      id: 4,
      title: "Transactions",
      value: data.transactions,
      subtext: `Last updated : ${
        data.lastTransactionDate
          ? new Date(data.lastTransactionDate).toLocaleDateString("en-GB")
          : "NA"
      }`,
      icon: (
        <ReceiptRefundIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
      ),
      bgColor: "bg-gray-100 dark:bg-gray-800",
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
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {card.title}
            </h3>
          </div>
          <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
            {card.value}
          </p>
          <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
            {card.subtext}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Cards;
