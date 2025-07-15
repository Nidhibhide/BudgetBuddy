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

    if (type === "Expense") {
      if (!currentBudget || currentBudget.budget < amount) {
        return JsonOne(res, 400, "Insufficient budget", false);
      }
    }

    const data = await expense.create({
      title,
      amount,
      category,
      type,
      user: userId,
      description,
    });
    if (!data) {
      return JsonOne(res, 500, "Failed to add new entry", false);
    }

    const value = type === "Income" ? amount : -amount;
    const newLimit = value * 0.8; //default limit
    // Update or create budget
    const updatedBudget = await budget.findOneAndUpdate(
      { user: userId },
      {
        $inc: { budget: value },
        $set: { limit: newLimit },
      },
      { new: true, upsert: true }
    );
    if (!updatedBudget) {
      return JsonOne(res, 500, "Failed to update budget", false);
    }
    await data.save();

    JsonOne(res, 201, "New entry added", true);
  } catch (error) {
    JsonOne(res, 500, "unexpected error occurred while add new entry", false);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
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
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return JsonOne(res, 400, "Invalid expense ID", false);
    }

    const deletedExpense = await expense.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedExpense) {
      return JsonOne(res, 404, "Expense not found", false);
    }

    return JsonOne(res, 200, "Expense deleted successfully", true);
  } catch (error) {
    console.error("Soft delete error:", error);

    JsonOne(res, 500, "unexpected error occurred while delete expense", false);
  }
};
const restore = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return JsonOne(res, 400, "Invalid expense ID", false);
    }

    const deletedExpense = await expense.findByIdAndUpdate(
      id,
      { isDeleted: false },
      { new: true }
    );

    if (!deletedExpense) {
      return JsonOne(res, 404, "expense not found", false);
    }

    return JsonOne(res, 200, "Expense restored successfully", true);
  } catch (error) {
    console.error("Soft restore error:", error);

    JsonOne(res, 500, "unexpected error occurred while restore expense", false);
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

export { create, getAll, softDelete, restore, edit };
