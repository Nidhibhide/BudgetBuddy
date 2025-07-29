"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../controllers/auth");
const express_1 = __importDefault(require("express"));
const user_1 = require("../middlewares/Validators/user");
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const router = express_1.default.Router();
router.put("/changePassword", TokenAuth_1.default, user_1.ChangePasswordMid, auth_1.changePassword);
router.get("/checkToken", auth_1.checkToken);
router.get("/refreshToken", auth_1.refreshToken);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map