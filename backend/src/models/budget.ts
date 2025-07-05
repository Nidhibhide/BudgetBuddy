// models/Budget.js
import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  month: {
    type: String, // Format: '2025-07'
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
