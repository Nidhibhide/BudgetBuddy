
import { Request, Response, NextFunction } from "express";
import { JsonOne } from "../../utils/responseFun";
import { category } from "../../validations/category";

const CategoryMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = category.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};

export { CategoryMid };
