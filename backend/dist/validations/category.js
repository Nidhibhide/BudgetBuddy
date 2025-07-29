"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const joi_1 = __importDefault(require("joi"));
const GlobalValidation_1 = require("../utils/GlobalValidation");
const category = joi_1.default.object({
    names: (0, GlobalValidation_1.stringArrayValidator)("Categories", true, 4),
});
exports.category = category;
//# sourceMappingURL=category.js.map