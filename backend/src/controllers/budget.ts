import { JsonOne } from "../utils/responseFun";
import { Request, Response } from "express";

import budget from "../models/budget";

const edit = async (req: Request, res: Response) => {
  const { limit } = req.body;
  const userId = req.user?._id;

  try {
    const existingBudget = await budget.findOne({ user: userId });

    if (!existingBudget) {
      return JsonOne(res, 404, "Budget record not found", false);
    }

    const updatedBudget = await budget.findOneAndUpdate(
      { user: userId },
      { limit, isDeleted: false },
      { new: true }
    );

    if (!updatedBudget) {
      return JsonOne(res, 404, "Failed to update budget limit", false);
    }

    return JsonOne(
      res,
      201,
      "Budget limit updated successfully",
      true,
      updatedBudget
    );
  } catch (error) {
    console.error("Edit budget error:", error);
    return JsonOne(
      res,
      500,
      "Unexpected error occurred while updating budget",
      false
    );
  }
};
const getOne = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const userBudget = await budget.findOne({ user: userId });

    if (!userBudget) {
      return JsonOne(res, 404, "Budget not found", false);
    }

    return JsonOne(res, 200, "Budget fetched successfully", true, userBudget);
  } catch (error) {
    console.error("Error fetching budget:", error);
    return JsonOne(res, 500, "Server error while fetching budget", false);
  }
};
export { edit, getOne };
