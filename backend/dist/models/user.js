"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../constants");
const UserSchmea = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    authProvider: {
        type: String,
        enum: ["google", "local"],
        default: "local",
    },
    currency: {
        type: String,
        enum: constants_1.CURRENCIES,
        default: "INR",
    },
}, {
    timestamps: true,
} // auto adds createdAt and updatedAt
);
const UserModel = mongoose_1.default.model("User", UserSchmea);
exports.default = UserModel;
//# sourceMappingURL=user.js.map