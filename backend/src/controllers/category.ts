import mongoose from "mongoose";
import { JsonOne } from "../utils/responseFun";
import { Request, Response } from "express";

import category from "../models/category";

const create = async (req: Request, res: Response) => {
  const { names } = req.body;
  const userId = req.user?._id;

  try {
    const updatedCategory = await category.findOneAndUpdate(
      { user: userId },
      { $set: { names } },
      { new: true, upsert: true } // return new doc and create if not exists
    );

    if (!updatedCategory) {
      return JsonOne(res, 500, "Failed to update category", false);
    }

    return JsonOne(res, 201, "Category updated successfully", true);
  } catch (error) {
    return JsonOne(
      res,
      500,
      "Unexpected error occurred while adding/updating entry",
      false
    );
  }
};

const getOne = async (req: Request, res: Response) => {
  const userId = req.user?._id;

  try {
    const userCategories = await category.findOne({ user: userId });

    if (!userCategories) {
      return JsonOne(res, 404, "Categories not found", false);
    }

    return JsonOne(
      res,
      200,
      "Categories fetched successfully",
      true,
      userCategories
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return JsonOne(res, 500, "Server error while fetching category", false);
  }
};
export { create, getOne };
