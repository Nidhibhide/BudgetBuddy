import { expense } from "../../validations/expense";
import { Request, Response, NextFunction } from "express";
import { JsonOne } from "../../utils/responseFun";

const ExpenseMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = expense.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};

export { ExpenseMid };
