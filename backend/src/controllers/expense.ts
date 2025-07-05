import mongoose from "mongoose";
import User from "../models/user";
import { JsonOne, JsonAll } from "../utils/responseFun";
import { Request, Response } from "express";
import expense from "../models/expense";

const create = async (req: Request, res: Response) => {
  const { titie, amount, category, type, user } = req.body;

  try {
    const data = await expense.create({
      titie,
      amount,
      category,
      type,
      user,
    });
    if (!data) {
      return JsonOne(res, 500, "Failed to create expense", false);
    }

    await data.save();

    JsonOne(res, 201, `${titie} created successfully  `, true);
  } catch (error) {
    JsonOne(res, 500, "unexpected error occurred while create expense", false);
  }
};

const getAll = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      sortOrder = "desc",
      page = "1",
      limit = "5",
    } = req.query as {
      search?: string;
      sortOrder?: "asc" | "desc";
      page?: string;
      limit?: string;
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = sortOrder === "asc" ? 1 : -1;

    const matchStage: any = {
      isDeleted: false,
      $or: [
        { title: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ],
    };

    const aggregation: any[] = [
      { $match: matchStage },
      { $sort: { createdAt: sort } },
      { $skip: skip },
      { $limit: parseInt(limit) },
      {
        $project: {
          titie: 1,
          amount: 1,
          category: 1,
          type: 1,
        },
      },
    ];
    const data = await expense.aggregate(aggregation);
    const total: number = await expense.countDocuments(matchStage);

    JsonAll(
      res,
      200,
      "Expenses fetched successfully",
      data,
      total,
      parseInt(page),
      parseInt(limit)
    );
  } catch {
    JsonOne(
      res,
      500,
      "unexpected error occurred while fetching expenses",
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
