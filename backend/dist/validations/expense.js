"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expense = void 0;
const joi_1 = __importDefault(require("joi"));
const GlobalValidation_1 = require("../utils/GlobalValidation");
const constants_1 = require("../constants");
const expense = joi_1.default.object({
    title: (0, GlobalValidation_1.stringValidator)("Title", 3, 30, true),
    amount: (0, GlobalValidation_1.numberValidator)("Amount", 1, 100000, true),
    category: (0, GlobalValidation_1.stringValidator)("Category", 3, 30, true),
    type: (0, GlobalValidation_1.selectValidator)("Type", constants_1.TYPES, true),
    description: (0, GlobalValidation_1.stringValidator)("Description", 3, 30, false, /^[a-zA-Z0-9\s]+$/),
});
exports.expense = expense;
//# sourceMappingURL=expense.js.map