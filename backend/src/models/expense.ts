// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['expense', 'income'],
    required: true,
  },
   isDeleted: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Expense', expenseSchema);
