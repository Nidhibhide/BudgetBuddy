"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryMid = void 0;
const responseFun_1 = require("../../utils/responseFun");
const category_1 = require("../../validations/category");
const CategoryMid = (req, res, next) => {
    const { error } = category_1.category.validate(req.body);
    if (error) {
        const message = error.details[0].message;
        return (0, responseFun_1.JsonOne)(res, 400, message, false);
    }
    next();
};
exports.CategoryMid = CategoryMid;
//# sourceMappingURL=category.js.map