"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/Budget.js
const mongoose_1 = __importDefault(require("mongoose"));
const budgetSchema = new mongoose_1.default.Schema({
    budget: {
        type: Number,
        required: true,
        set: (v) => Number(v.toFixed(2)),
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    limit: {
        type: Number,
        required: false,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Budget", budgetSchema);
//# sourceMappingURL=budget.js.map