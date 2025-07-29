"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePassword = exports.Email = exports.Update = exports.Login = exports.Register = void 0;
const joi_1 = __importDefault(require("joi"));
const GlobalValidation_1 = require("../utils/GlobalValidation");
const constants_1 = require("../constants");
const Register = joi_1.default.object({
    name: (0, GlobalValidation_1.stringValidator)("Name", 3, 50, true),
    email: (0, GlobalValidation_1.emailValidator)(),
    password: (0, GlobalValidation_1.passwordValidator)(),
});
exports.Register = Register;
const Login = joi_1.default.object({
    email: (0, GlobalValidation_1.emailValidator)(),
    password: (0, GlobalValidation_1.passwordValidator)(),
});
exports.Login = Login;
const Update = joi_1.default.object({
    name: (0, GlobalValidation_1.stringValidator)("Name", 3, 50, false),
    email: (0, GlobalValidation_1.emailValidator)("Email", false),
    currency: (0, GlobalValidation_1.selectValidator)("Currency", constants_1.CURRENCIES, false),
});
exports.Update = Update;
const Email = joi_1.default.object({
    email: (0, GlobalValidation_1.emailValidator)(),
});
exports.Email = Email;
const ChangePassword = joi_1.default.object({
    NewPassword: (0, GlobalValidation_1.passwordValidator)(),
    OldPassword: (0, GlobalValidation_1.passwordValidator)(),
});
exports.ChangePassword = ChangePassword;
//# sourceMappingURL=user.js.map