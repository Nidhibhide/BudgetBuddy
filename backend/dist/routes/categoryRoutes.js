"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../controllers/category");
const express_1 = __importDefault(require("express"));
const category_2 = require("../middlewares/Validators/category");
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const router = express_1.default.Router();
router.post("/create", TokenAuth_1.default, category_2.CategoryMid, category_1.create);
router.get("/get", TokenAuth_1.default, category_1.getOne);
exports.default = router;
//# sourceMappingURL=categoryRoutes.js.map