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
exports.getMe = exports.updateProfile = exports.logOut = exports.googleLogin = exports.login = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const google_auth_library_1 = require("google-auth-library");
const responseFun_1 = require("../utils/responseFun");
const cookieOptions_1 = require("../utils/cookieOptions");
// import { clearCookies } from "../utils/cookieOptions";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return (0, responseFun_1.JsonOne)(res, 409, "User already exists ", false);
        }
        const user = yield user_1.default.create({
            name,
            email,
            password,
        });
        if (!user) {
            return (0, responseFun_1.JsonOne)(res, 500, "Failed to create user", false);
        }
        const hashedPass = yield bcryptjs_1.default.hash(password, 10);
        user.password = hashedPass;
        yield user.save();
        (0, responseFun_1.JsonOne)(res, 201, `User registered successfully`, true);
    }
    catch (error) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while sign up", false);
    }
});
exports.registerUser = registerUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield user_1.default.findOne({ email });
        if (!user || !user.password) {
            return (0, responseFun_1.JsonOne)(res, 404, "User or password not found", false);
        }
        //compare password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return (0, responseFun_1.JsonOne)(res, 401, "Incorrect password", false);
        }
        const access_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1h",
        });
        res.cookie("access_token", access_token, cookieOptions_1.accessTokenOptions);
        const refresh_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        res.cookie("refresh_token", refresh_token, cookieOptions_1.refreshTokenOptions);
        return (0, responseFun_1.JsonOne)(res, 200, "Login successful", true);
    }
    catch (error) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while sign in", false);
    }
});
exports.login = login;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const { token } = req.body;
    try {
        if (!token) {
            return (0, responseFun_1.JsonOne)(res, 404, "Google token not found", false);
        }
        const ticket = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload)
            return (0, responseFun_1.JsonOne)(res, 401, "Invalid Google token", false);
        const { email, name, sub } = payload;
        if (!email || !name || !sub) {
            return (0, responseFun_1.JsonOne)(res, 400, "Incomplete Google user data", false);
        }
        let user = yield user_1.default.findOne({ email });
        if (!user) {
            user = yield user_1.default.create({
                name,
                email,
                password: sub,
                authProvider: "google",
            });
            if (!user) {
                return (0, responseFun_1.JsonOne)(res, 500, "Failed to create user", false);
            }
            const hashedPass = yield bcryptjs_1.default.hash(sub, 10);
            user.password = hashedPass;
            yield user.save();
        }
        const access_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.ACCESS_TOKEN, {
            expiresIn: "1h",
        });
        res.cookie("access_token", access_token, cookieOptions_1.accessTokenOptions);
        const refresh_token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.REFRESH_TOKEN, {
            expiresIn: "7d",
        });
        res.cookie("refresh_token", refresh_token, cookieOptions_1.refreshTokenOptions);
        return (0, responseFun_1.JsonOne)(res, 200, "Login successful", true);
    }
    catch (err) {
        (0, responseFun_1.JsonOne)(res, 500, "Google login failed", false);
    }
});
exports.googleLogin = googleLogin;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("access_token", cookieOptions_1.clearCookies);
        res.clearCookie("refresh_token", cookieOptions_1.clearCookies);
        return (0, responseFun_1.JsonOne)(res, 200, "Logout successfully", true);
    }
    catch (error) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while logging out ", false);
    }
});
exports.logOut = logOut;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, currency } = req.body;
        const id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
        let user = yield user_1.default.findById(id);
        if (!user) {
            return (0, responseFun_1.JsonOne)(res, 404, "User not found", false);
        }
        if ((user === null || user === void 0 ? void 0 : user.authProvider) === "google" && email !== (user === null || user === void 0 ? void 0 : user.email)) {
            return (0, responseFun_1.JsonOne)(res, 400, "Cannot update email for Google-authenticated users", false);
        }
        user.name = name || (user === null || user === void 0 ? void 0 : user.name);
        user.email = email || (user === null || user === void 0 ? void 0 : user.email);
        user.currency = currency || (user === null || user === void 0 ? void 0 : user.currency);
        yield user.save();
        (0, responseFun_1.JsonOne)(res, 201, "Profile updated successfully", true, user);
    }
    catch (err) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while updating user", false);
    }
});
exports.updateProfile = updateProfile;
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return (0, responseFun_1.JsonOne)(res, 404, "Profile not found", false);
        }
        return (0, responseFun_1.JsonOne)(res, 200, "User Found", true, user);
    }
    catch (error) {
        (0, responseFun_1.JsonOne)(res, 500, "unexpected error occurred while fetching user", false);
    }
});
exports.getMe = getMe;
//# sourceMappingURL=user.js.map