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
exports.getOne = exports.create = void 0;
const responseFun_1 = require("../utils/responseFun");
const category_1 = __importDefault(require("../models/category"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { names } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const updatedCategory = yield category_1.default.findOneAndUpdate({ user: userId }, { $set: { names } }, { new: true, upsert: true } // return new doc and create if not exists
        );
        if (!updatedCategory) {
            return (0, responseFun_1.JsonOne)(res, 500, "Failed to update category", false);
        }
        return (0, responseFun_1.JsonOne)(res, 201, "Category updated successfully", true);
    }
    catch (error) {
        return (0, responseFun_1.JsonOne)(res, 500, "Unexpected error occurred while adding/updating entry", false);
    }
});
exports.create = create;
const getOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    try {
        const userCategories = yield category_1.default.findOne({ user: userId });
        if (!userCategories) {
            return (0, responseFun_1.JsonOne)(res, 404, "Categories not found", false);
        }
        return (0, responseFun_1.JsonOne)(res, 200, "Categories fetched successfully", true, userCategories);
    }
    catch (error) {
        console.error("Error fetching category:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Server error while fetching category", false);
    }
});
exports.getOne = getOne;
//# sourceMappingURL=category.js.map