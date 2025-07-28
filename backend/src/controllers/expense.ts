import mongoose from "mongoose";
import { JsonOne, JsonAll } from "../utils/responseFun";
import { Request, Response } from "express";
import expense from "../models/expense";
import budget from "../models/budget";
import { MONTHS } from "../../../shared/constants";
const create = async (req: Request, res: Response) => {
  const { title, amount, category, type, description } = req.body;
  const userId = req.user?._id;

  try {
    const currentBudget = await budget.findOne({ user: userId });

    if (
      type === "Expense" &&
      (!currentBudget || currentBudget.budget < amount)
    ) {
      return JsonOne(res, 400, "Insufficient budget", false);
    }

    const value = type === "Income" ? amount : -amount;

    const data = await expense.create({
      title,
      amount,
      category,
      type,
      user: userId,
      description,
    });

    const newBudget = (currentBudget?.budget ?? 0) + value;
    // const newLimit = Number(process.env.LIMIT) || 10000;

    const updatedBudget = await budget.findOneAndUpdate(
      { user: userId },
      {
        budget: newBudget,
        // limit: newLimit,
      },
      { new: true, upsert: true }
    );

    if (!updatedBudget) {
      return JsonOne(res, 500, "Failed to update budget", false);
    }

    JsonOne(res, 201, "New entry added", true, updatedBudget);
  } catch (error) {
    console.error(error);
    JsonOne(
      res,
      500,
      "Unexpected error occurred while adding new entry",
      false
    );
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 100;
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
    const month = req.query.month as string;
    const category = req.query.category as string;
    const user = req.user?._id;

    if (!user) {
      return JsonOne(res, 400, "User ID is required", false);
    }
    const skip = (page - 1) * limit;

    const match: any = {
      isDeleted: false,
      user: user,
    };
    if (category && category !== "Select All") match.category = category;
    const aggMatch: any = { ...match };
    if (month) {
      const monthIndex = MONTHS.indexOf(month);
      if (monthIndex !== -1) {
        aggMatch.$expr = {
          $eq: [{ $month: "$createdAt" }, monthIndex + 1],
        };
      }
    }

    const pipeline: any[] = [
      { $match: aggMatch },
      { $sort: { createdAt: sortOrder } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          title: 1,
          amount: 1,
          category: 1,
          type: 1,
          description: 1,
          month: 1,
          createdAt: 1,
        },
      },
    ];

    const data = await expense.aggregate(pipeline);
    const total = await expense.countDocuments(match);

    JsonAll(res, 200, "Records fetched successfully", data, total, page, limit);
  } catch (err) {
    console.error("Fetch error:", err);
    JsonOne(
      res,
      500,
      "Unexpected error occurred while fetching expenses",
      false
    );
  }
};

const softDelete = async (req: Request, res: Response) => {
  try {
    const { categories } = req.body;
    const userId = req.user?._id;
    if (!categories?.length) {
      return JsonOne(res, 400, "No categories provided", false);
    }

    const [incomeAgg, expenseAgg] = await Promise.all([
      expense.aggregate([
        {
          $match: {
            user: userId,
            category: { $in: categories },
            type: "Income",
            isDeleted: false,
          },
        },
        {
          $group: { _id: null, total: { $sum: "$amount" } },
        },
      ]),
      expense.aggregate([
        {
          $match: {
            user: userId,
            category: { $in: categories },
            type: "Expense",
            isDeleted: false,
          },
        },
        {
          $group: { _id: null, total: { $sum: "$amount" } },
        },
      ]),
    ]);

    const totalIncome = incomeAgg[0]?.total || 0;
    const totalExpense = expenseAgg[0]?.total || 0;
    const remaining = +(totalIncome - totalExpense).toFixed(2);

    if (remaining > 0) {
      await budget.updateOne(
        { user: userId },
        { $inc: { budget: -remaining } }
      );
    }

    const result = await expense.updateMany(
      { category: { $in: categories }, isDeleted: false },
      { isDeleted: true }
    );
    if (result.modifiedCount === 0) {
      return JsonOne(res, 404, "No matching expenses found to delete", false);
    }

    return JsonOne(
      res,
      200,
      `${result.modifiedCount} records deleted successfully`,
      true
    );
  } catch (error) {
    console.error("Error while deleting records:", error);
    return JsonOne(res, 500, "Something went wrong", false);
  }
};

const restore = async (req: Request, res: Response) => {
  try {
    const { categories } = req.body;
    const userId = req.user?._id;

    if (!categories?.length) {
      return JsonOne(res, 400, "No categories provided", false);
    }

    const incomeAgg = await expense.aggregate([
      {
        $match: {
          user: userId,
          category: { $in: categories },
          type: "Income",
          isDeleted: true, // restoring soft-deleted entries
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const totalIncome = incomeAgg[0]?.totalIncome || 0;

    if (totalIncome > 0) {
      await budget.updateOne(
        { user: userId },
        { $inc: { budget: totalIncome } }
      );
    }

    const result = await expense.updateMany(
      { category: { $in: categories }, isDeleted: true },
      { isDeleted: false }
    );

    if (result.modifiedCount === 0) {
      return JsonOne(res, 404, "No matching soft-deleted entries found", false);
    }

    return JsonOne(
      res,
      200,
      `${result.modifiedCount} records restored successfully`,
      true
    );
  } catch (error) {
    console.error("Error while restoring records:", error);
    return JsonOne(res, 500, "Something went wrong", false);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const { titie, amount, category, type } = req.body;
    const { id } = req.params;
    const oldExpense = await expense.findById(id);
    if (!oldExpense) {
      return JsonOne(res, 404, "Old expense not found", false);
    }

    const updatedExpense = await expense.findByIdAndUpdate(
      id,
      { titie, amount, category, type },
      {
        new: true,
      }
    );

    if (!updatedExpense) {
      return JsonOne(res, 404, "Expense not found", false);
    }
    JsonOne(res, 200, "Expense updated successfully", true);
  } catch (err) {
    JsonOne(res, 500, "unexpected error occurred while updating test", false);
  }
};

//get count of records
const getCount = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const categories = req.body;
    if (!categories || categories.length === 0) {
      return JsonOne(res, 400, "No categories provided", false);
    }

    const matched = await expense.aggregate([
      {
        $match: {
          user: userId,
          isDeleted: false,
          category: { $in: categories },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = Object.fromEntries(
      categories.map((cat: string) => {
        const found = matched.find((m) => m._id === cat);
        return [cat, found?.count || 0];
      })
    );
    return JsonOne(res, 200, "Fetched count", true, result);
  } catch (err) {
    console.error("Error fetching category counts:", err);
    JsonOne(res, 500, "unexpected error occurred while fetching", false);
  }
};

export { create, getAll, softDelete, restore, edit, getCount };
