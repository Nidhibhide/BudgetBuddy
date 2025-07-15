// models/Budget.js
import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    budget: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    limit: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Budget", budgetSchema);
