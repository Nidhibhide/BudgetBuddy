"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseMid = void 0;
const expense_1 = require("../../validations/expense");
const responseFun_1 = require("../../utils/responseFun");
const ExpenseMid = (req, res, next) => {
    const { error } = expense_1.expense.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.ExpenseMid = ExpenseMid;
//# sourceMappingURL=expense.js.map