import { JsonOne } from "../utils/responseFun";
import { Request, Response } from "express";
import expense from "../models/expense";

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
    return JsonOne(res, 200, "Records fetched successfully", true, result);
  } catch (error) {
    console.error("Error fetching expense summary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export { getTransaction,getCategoryData };
