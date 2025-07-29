"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangePasswordMid = exports.EmailMid = exports.UpdateMid = exports.LoginMid = exports.RegisterMid = void 0;
const user_1 = require("../../validations/user");
const responseFun_1 = require("../../utils/responseFun");
const RegisterMid = (req, res, next) => {
    const { error } = user_1.Register.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.RegisterMid = RegisterMid;
const LoginMid = (req, res, next) => {
    const { error } = user_1.Login.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.LoginMid = LoginMid;
const UpdateMid = (req, res, next) => {
    const { error } = user_1.Update.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.UpdateMid = UpdateMid;
const EmailMid = (req, res, next) => {
    const { error } = user_1.Email.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.EmailMid = EmailMid;
const ChangePasswordMid = (req, res, next) => {
    const { error } = user_1.ChangePassword.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.ChangePasswordMid = ChangePasswordMid;
//# sourceMappingURL=user.js.map