"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_1 = require("../controllers/dashboard");
const express_1 = __importDefault(require("express"));
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const router = express_1.default.Router();
router.get("/get-categoryData", TokenAuth_1.default, dashboard_1.getCategoryData);
router.get("/get-transactions", TokenAuth_1.default, dashboard_1.getTransaction);
router.get("/get-tips", TokenAuth_1.default, dashboard_1.getSmartTips);
router.get("/get-barChart", TokenAuth_1.default, dashboard_1.getBarChartData);
exports.default = router;
//# sourceMappingURL=dashboardRoutes.js.map