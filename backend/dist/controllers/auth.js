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
exports.refreshToken = exports.checkToken = exports.changePassword = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const responseFun_1 = require("../utils/responseFun");
const cookieOptions_1 = require("../utils/cookieOptions");
const checkToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    if (!token) {
        return (0, responseFun_1.JsonOne)(res, 404, "Token not found", false);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN);
        return (0, responseFun_1.JsonOne)(res, 200, "Token valid", true);
    }
    catch (err) {
        return (0, responseFun_1.JsonOne)(res, 500, "Token expired or invalid", false);
    }
});
exports.checkToken = checkToken;
const refreshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refresh_token;
    if (!token) {
        return (0, responseFun_1.JsonOne)(res, 404, "Token not found", false);
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN);
        const jwtToken = jsonwebtoken_1.default.sign({ id: decoded.id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1h",
        });
        res.cookie("access_token", jwtToken, cookieOptions_1.accessTokenOptions);
        return (0, responseFun_1.JsonOne)(res, 200, "Token refreshed successfully", true);
    }
    catch (err) {
        return (0, responseFun_1.JsonOne)(res, 500, "Refresh Token expired or invalid", false);
    }
});
exports.refreshToken = refreshToken;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { OldPassword, NewPassword } = req.body;
        const email = (_a = req.user) === null || _a === void 0 ? void 0 : _a.email;
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return (0, responseFun_1.JsonOne)(res, 404, "User not found", false);
        }
        if (!user.password) {
            return (0, responseFun_1.JsonOne)(res, 404, "Old password not found", false);
        }
        const isMatch = yield bcryptjs_1.default.compare(OldPassword, user.password);
        if (!isMatch) {
            return (0, responseFun_1.JsonOne)(res, 401, "Incorrect old password", false);
        }
        const hashedPass = yield bcryptjs_1.default.hash(NewPassword, 10);
        user.password = hashedPass;
        yield user.save();
        return (0, responseFun_1.JsonOne)(res, 201, "Password changed successfully", true);
    }
    catch (error) {
        console.error("Error occurred while change password:", error);
        return (0, responseFun_1.JsonOne)(res, 500, "Server error", false);
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=auth.js.map