"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const budget_1 = require("../controllers/budget");
const express_1 = __importDefault(require("express"));
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const router = express_1.default.Router();
router.put("/edit", TokenAuth_1.default, budget_1.edit);
router.get("/get", TokenAuth_1.default, budget_1.getOne);
exports.default = router;
//# sourceMappingURL=budgetRoutes.js.map