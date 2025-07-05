import Joi from "joi";
import {
  stringValidator,
  selectValidator,
  numberValidator,
} from "../utils/GlobalValidation";

const expense = Joi.object({
  title: stringValidator("Title", 3, 10, true),
  amount: numberValidator("Amount", 1, 100000, true),
  category: selectValidator(
    "Category",
    ["Shopping", "Hotel", "Transport", "Others"],
    true
  ),
  type: selectValidator("Type", ["Expense", "Income"], true),
});

export { expense };
