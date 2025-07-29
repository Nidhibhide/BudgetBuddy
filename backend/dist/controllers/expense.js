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
exports.getCount = exports.edit = exports.restore = exports.softDelete = exports.getAll = exports.create = void 0;
const responseFun_1 = require("../utils/responseFun");
const expense_1 = __importDefault(require("../models/expense"));
const budget_1 = __importDefault(require("../models/budget"));
const constants_1 = require("../constants");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { title, amount, category, type, description } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const currentBudget = yield budget_1.default.findOne({ user: userId });
        if (type === "Expense" &&
            (!currentBudget || currentBudget.budget < amount)) {
            return (0, responseFun_1.JsonOne)(res, 400, "Insufficient budget", false);
        }
        const value = type === "Income" ? amount : -amount;
        const data = yield expense_1.default.create({
            title,
            amount,
            category,
            type,
            user: userId,
            description,
        });
        const newBudget = ((_b = currentBudget === null || currentBudget === void 0 ? void 0 : currentBudget.budget) !== null && _b !== void 0 ? _b : 0) + value;
        // const newLimit = Number(process.env.LIMIT) || 10000;
        const updatedBudget = yield budget_1.default.findOneAndUpdate({ user: userId }, {
            budget: newBudget,
            // limit: newLimit,
        }, { new: true, upsert: true });
        if (!updatedBudget) {
            return (0, responseFun_1.JsonOne)(res, 500, "Failed to update budget", false);
        }
        (0, responseFun_1.JsonOne)(res, 201, "New entry added", true, updatedBudget);
    }
    catch (error) {
        console.error(error);
        (0, responseFun_1.JsonOne)(res, 500, "Unexpected error occurred while adding new entry", false);
    }
});
exports.create = create;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;
        const month = req.query.month;
        const category = req.query.category;
        const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!user) {
            return (0, responseFun_1.JsonOne)(res, 400, "User ID is required", false);
        }
        const skip = (page - 1) * limit;
        const match = {
            isDeleted: false,
            user: user,
        };
        if (category && category !== "Select All")
            match.category = category;
        const aggMatch = Object.assign({}, match);
        if (month) {
            const monthIndex = constants_1.MONTHS.indexOf(month);
            if (monthIndex !== -1) {
                aggMatch.$expr = {
                    $eq: [{ $month: "$createdAt" }, monthIndex + 1],
                };
            }
        }
        const pipeline = [
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
        const data = yield expense_1.default.aggregate(pipeline);
        const total = yield expense_1.default.countDocuments(match);
        (0, responseFun_1.JsonAll)(res, 200, "Records fetched successfully", data, total, page, limit);
    }
    catch (err) {
        console.error("Fetch error:", err);
        (0, responseFun_1.JsonOne)(res, 500, "Unexpected error occurred while fetching expenses", false);
    }
});
exports.getAll = getAll;
const softDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { categories } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!(categories === null || categories === void 0 ? void 0 : categories.length)) {
            return (0, responseFun_1.JsonOne)(res, 400, "No categories provided", false);
        }
        const [incomeAgg, expenseAgg] = yield Promise.all([
            expense_1.default.aggregate([
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
            expense_1.default.aggregate([
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
        const totalIncome = ((_b = incomeAgg[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const totalExpense = ((_c = expenseAgg[0]) === null || _c === void 0 ? void 0 : _c.total) || 0;
        const remaining = +(totalIncome - totalExpense).toFixed(2);
        if (remaining > 0) {
            yield budget_1.default.updateOne({ user: userId }, { $inc: { budget: -remaining } });
        }
        const result = yield expense_1.default.updateMany({ category: { $in: categories }, isDeleted: false }, { isDeleted: true });
        if (result.modifiedCount === 0) {
            return (0, responseFun_1.JsonOne)(res, 404, "No matching expenses found to delete", false);
        }
        return (0, responseFun_1.JsonOne)(res, 200, `${result.modifiedCount} records deleted successfully`, true);
    }
    catch (error) {
        console.error("Error while deleting records:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Something went wrong", false);
    }
});
exports.softDelete = softDelete;
const restore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { categories } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        if (!(categories === null || categories === void 0 ? void 0 : categories.length)) {
            return (0, responseFun_1.JsonOne)(res, 400, "No categories provided", false);
        }
        const incomeAgg = yield expense_1.default.aggregate([
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
        const totalIncome = ((_b = incomeAgg[0]) === null || _b === void 0 ? void 0 : _b.totalIncome) || 0;
        if (totalIncome > 0) {
            yield budget_1.default.updateOne({ user: userId }, { $inc: { budget: totalIncome } });
        }
        const result = yield expense_1.default.updateMany({ category: { $in: categories }, isDeleted: true }, { isDeleted: false });
        if (result.modifiedCount === 0) {
            return (0, responseFun_1.JsonOne)(res, 404, "No matching soft-deleted entries found", false);
        }
        return (0, responseFun_1.JsonOne)(res, 200, `${result.modifiedCount} records restored successfully`, true);
    }
    catch (error) {
        console.error("Error while restoring records:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Something went wrong", false);
    }
});
exports.restore = restore;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { titie, amount, category, type } = req.body;
        const { id } = req.params;
        const oldExpense = yield expense_1.default.findById(id);
        if (!oldExpense) {
            return (0, responseFun_1.JsonOne)(res, 404, "Old expense not found", false);
        }
        const updatedExpense = yield expense_1.default.findByIdAndUpdate(id, { titie, amount, category, type }, {
            new: true,
        });
        if (!updatedExpense) {
            return (0, responseFun_1.JsonOne)(res, 404, "Expense not found", false);
        }
        (0, responseFun_1.JsonOne)(res, 200, "Expense updated successfully", true);
    }
    catch (err) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while updating test", false);
    }
});
exports.edit = edit;
//get count of records
const getCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        const categories = req.body;
        if (!categories || categories.length === 0) {
            return (0, responseFun_1.JsonOne)(res, 400, "No categories provided", false);
        }
        const matched = yield expense_1.default.aggregate([
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
        const result = Object.fromEntries(categories.map((cat) => {
            const found = matched.find((m) => m._id === cat);
            return [cat, (found === null || found === void 0 ? void 0 : found.count) || 0];
        }));
        return (0, responseFun_1.JsonOne)(res, 200, "Fetched count", true, result);
    }
    catch (err) {
        console.error("Error fetching category counts:", err);
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while fetching", false);
    }
});
exports.getCount = getCount;
//# sourceMappingURL=expense.js.map