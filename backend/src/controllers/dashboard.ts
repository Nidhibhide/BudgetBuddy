import { JsonOne } from "../utils/responseFun";
import { Request, Response } from "express";
import expense from "../models/expense";
import budget from "../models/budget";
import { MONTHS } from "../constants";
const getTransaction = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const result = await expense.aggregate([
      { $match: { user: userId, isDeleted: false } },
      {
        $group: {
          _id: userId,

          totalTransactions: { $sum: 1 },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "Expense"] }, "$amount", 0],
            },
          },
          lastTransactionDate: {
            $max: "$createdAt",
          },
        },
      },
    ]);

    const {
      totalTransactions = 0,
      totalExpense = 0,
      lastTransactionDate = null,
    } = result[0] || {};

    return JsonOne(res, 200, "Records fetched successfully", true, {
      totalTransactions,
      totalExpense,
      lastTransactionDate,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return JsonOne(res, 500, "Server error while fetching transactions", false);
  }
};
const getCategoryData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const budgetData = await budget.findOne({ user: userId });
    const result = await expense.aggregate([
      { $match: { type: "Expense", user: userId, isDeleted: false } },
      {
        $group: {
          _id: "$category",
          totalExpense: { $sum: "$amount" },
        },
      },
      {
        $project: {
          category: "$_id",
          totalExpense: 1,
          _id: 0,
        },
      },
    ]);
    return JsonOne(res, 200, "Records fetched successfully", true, {
      result,
      budgetData,
    });
  } catch (error) {
    console.error("Error fetching expense summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSmartTips = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const BudgetData = await budget.findOne({ user: userId });

    const budgetAmount = BudgetData?.budget || 0;
    const transactions = await expense.find({ user: userId });
    const tips = [];

    const expenses = transactions.filter((t) => t.type === "Expense");
    const income = transactions.filter((t) => t.type === "Income");

    const categoriesUsed = new Set(expenses.map((e) => e.category)); //unique categories used in the expenses

    // 1. No transactions
    if (transactions.length === 0) {
      tips.push("👋 Welcome! Start by adding your first income and expense.");
    }

    // 2. Budget set but no income
    if (budgetAmount > 0 && income.length === 0) {
      tips.push(
        "📈 You’ve set a budget but haven’t added any income yet. Add income to measure savings correctly."
      );
    }

    // 3. Limited categories used
    if (categoriesUsed.size > 0 && categoriesUsed.size <= 2) {
      tips.push(
        "🗂️ Most of your expenses fall under a single category. Try categorizing them better for clearer insights."
      );
    }

    // 4. Budget set but very few expenses
    if (budgetAmount > 0 && expenses.length > 0 && expenses.length < 3) {
      tips.push(
        "📝 You’ve set a budget but added very few expenses. Add your daily spending to stay on track."
      );
    }

    // 5. Income added but no expenses
    if (income.length > 0 && expenses.length === 0) {
      tips.push(
        "📊 You’ve logged income, but no expenses yet. Start adding them to track your savings effectively."
      );
    }

    if (categoriesUsed.size === 0) {
      tips.push(
        "💸 No categorized expenses found. Start adding some to get insights."
      );
    }

    JsonOne(res, 200, "Records fetched successfully", true, tips);
  } catch (error) {
    console.error("Error generating smart tips:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getBarChartData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;

    const expenses = await expense.aggregate([
      {
        $match: {
          user: userId,
          type: "Expense",
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const income = await expense.aggregate([
      {
        $match: {
          user: userId,
          type: "Income",
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const formattedExpense = expenses.map((item) => ({
      month: MONTHS[item._id - 1],
      total: item.total,
    }));
    const formattedIncome = income.map((item) => ({
      month: MONTHS[item._id - 1],
      total: item.total,
    }));

    return JsonOne(res, 200, "Records fetched successfully", true, {
      formattedExpense,
      formattedIncome,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
export { getTransaction, getCategoryData, getSmartTips, getBarChartData };
