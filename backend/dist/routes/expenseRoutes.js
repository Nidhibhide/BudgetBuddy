"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expense_1 = require("../controllers/expense");
const express_1 = __importDefault(require("express"));
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const expense_2 = require("../middlewares/Validators/expense");
const router = express_1.default.Router();
router.post("/create", TokenAuth_1.default, expense_2.ExpenseMid, expense_1.create);
router.get("/getAll", TokenAuth_1.default, expense_1.getAll);
router.post("/get-count", TokenAuth_1.default, expense_1.getCount);
router.put("/delete", TokenAuth_1.default, expense_1.softDelete);
router.put("/edit/:id", TokenAuth_1.default, expense_2.ExpenseMid, expense_1.edit);
router.put("/restore", TokenAuth_1.default, expense_1.restore);
exports.default = router;
//# sourceMappingURL=expenseRoutes.js.map