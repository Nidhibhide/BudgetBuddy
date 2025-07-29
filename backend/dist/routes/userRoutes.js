"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const TokenAuth_1 = __importDefault(require("../middlewares/TokenAuth"));
const user_2 = require("../middlewares/Validators/user");
const router = express_1.default.Router();
router.post("/register", user_2.RegisterMid, user_1.registerUser);
router.post("/login", user_2.LoginMid, user_1.login);
router.post("/google-login", user_1.googleLogin);
router.get("/logout", TokenAuth_1.default, user_1.logOut);
router.get("/getMe", TokenAuth_1.default, user_1.getMe);
router.put("/profile", TokenAuth_1.default, user_2.UpdateMid, user_1.updateProfile);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map