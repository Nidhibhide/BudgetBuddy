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
exports.getOne = exports.edit = void 0;
const responseFun_1 = require("../utils/responseFun");
const budget_1 = __importDefault(require("../models/budget"));
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { limit } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const existingBudget = yield budget_1.default.findOne({ user: userId });
        if (!existingBudget) {
            return (0, responseFun_1.JsonOne)(res, 404, "Budget record not found", false);
        }
        if (limit > (existingBudget === null || existingBudget === void 0 ? void 0 : existingBudget.budget)) {
            return (0, responseFun_1.JsonOne)(res, 404, "Limit should not exceed your total budget.", false);
        }
        const updatedBudget = yield budget_1.default.findOneAndUpdate({ user: userId }, { limit, isDeleted: false }, { new: true });
        if (!updatedBudget) {
            return (0, responseFun_1.JsonOne)(res, 404, "Failed to update budget limit", false);
        }
        return (0, responseFun_1.JsonOne)(res, 201, "Budget limit updated successfully", true, updatedBudget);
    }
    catch (error) {
        console.error("Edit budget error:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Unexpected error occurred while updating budget", false);
    }
});
exports.edit = edit;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const userBudget = yield budget_1.default.findOne({ user: userId });
        if (!userBudget) {
            return (0, responseFun_1.JsonOne)(res, 404, "Budget not found", false, 0);
        }
        return (0, responseFun_1.JsonOne)(res, 200, "Budget fetched successfully", true, userBudget);
    }
    catch (error) {
        console.error("Error fetching budget:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Server error while fetching budget", false);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=budget.js.map