"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBarChartData = exports.getSmartTips = exports.getCategoryData = exports.getTransaction = void 0;
const responseFun_1 = require("../utils/responseFun");
const expense_1 = __importDefault(require("../models/expense"));
const budget_1 = __importDefault(require("../models/budget"));
const constants_1 = require("../constants");
const getTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const result = yield expense_1.default.aggregate([
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
        const { totalTransactions = 0, totalExpense = 0, lastTransactionDate = null, } = result[0] || {};
        return (0, responseFun_1.JsonOne)(res, 200, "Records fetched successfully", true, {
            totalTransactions,
            totalExpense,
            lastTransactionDate,
        });
    }
    catch (error) {
        console.error("Error fetching transactions:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Server error while fetching transactions", false);
    }
});
exports.getTransaction = getTransaction;
const getCategoryData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const budgetData = yield budget_1.default.findOne({ user: userId });
        const result = yield expense_1.default.aggregate([
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
        return (0, responseFun_1.JsonOne)(res, 200, "Records fetched successfully", true, {
            result,
            budgetData,
        });
    }
    catch (error) {
        console.error("Error fetching expense summary:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getCategoryData = getCategoryData;
const getSmartTips = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const BudgetData = yield budget_1.default.findOne({ user: userId });
        const budgetAmount = (BudgetData === null || BudgetData === void 0 ? void 0 : BudgetData.budget) || 0;
        const transactions = yield expense_1.default.find({ user: userId });
        const tips = [];
        const expenses = transactions.filter((t) => t.type === "Expense");
        const income = transactions.filter((t) => t.type === "Income");
        const categoriesUsed = new Set(expenses.map((e) => e.category)); //unique categories used in the expenses
        // 1. No transactions
        if (transactions.length === 0) {
            tips.push("👋 Welcome! Start by adding your first income and expense.");
        }
        // 2. Budget set but no income
        if (budgetAmount > 0 && income.length === 0) {
            tips.push("📈 You’ve set a budget but haven’t added any income yet. Add income to measure savings correctly.");
        }
        // 3. Limited categories used
        if (categoriesUsed.size > 0 && categoriesUsed.size <= 2) {
            tips.push("🗂️ Most of your expenses fall under a single category. Try categorizing them better for clearer insights.");
        }
        // 4. Budget set but very few expenses
        if (budgetAmount > 0 && expenses.length > 0 && expenses.length < 3) {
            tips.push("📝 You’ve set a budget but added very few expenses. Add your daily spending to stay on track.");
        }
        // 5. Income added but no expenses
        if (income.length > 0 && expenses.length === 0) {
            tips.push("📊 You’ve logged income, but no expenses yet. Start adding them to track your savings effectively.");
        }
        if (categoriesUsed.size === 0) {
            tips.push("💸 No categorized expenses found. Start adding some to get insights.");
        }
        (0, responseFun_1.JsonOne)(res, 200, "Records fetched successfully", true, tips);
    }
    catch (error) {
        console.error("Error generating smart tips:", error);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getSmartTips = getSmartTips;
const getBarChartData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const expenses = yield expense_1.default.aggregate([
            {
                $match: {
                    user: userId,
                    type: "Expense",
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        const income = yield expense_1.default.aggregate([
            {
                $match: {
                    user: userId,
                    type: "Income",
                    isDeleted: false,
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    total: { $sum: "$amount" },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
        const formattedExpense = expenses.map((item) => ({
            month: constants_1.MONTHS[item._id - 1],
            total: item.total,
        }));
        const formattedIncome = income.map((item) => ({
            month: constants_1.MONTHS[item._id - 1],
            total: item.total,
        }));
        return (0, responseFun_1.JsonOne)(res, 200, "Records fetched successfully", true, {
            formattedExpense,
            formattedIncome,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});
exports.getBarChartData = getBarChartData;
//# sourceMappingURL=dashboard.js.map