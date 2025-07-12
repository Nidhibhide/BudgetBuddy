import Joi from "joi";
import {
  stringValidator,
  selectValidator,
  numberValidator,
} from "../utils/GlobalValidation";
import { CATEGORIES, TYPES } from "../../../shared/constants";

const expense = Joi.object({
  title: stringValidator("Title", 3, 30, true),
  amount: numberValidator("Amount", 1, 100000, true),
  category: selectValidator("Category", CATEGORIES, true),
  type: selectValidator("Type", TYPES, true),
  description: stringValidator("Description", 3, 30, false),
});

export { expense };
