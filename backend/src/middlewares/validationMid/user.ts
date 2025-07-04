import {
  userRegisterValidation,
  LoginValidation,
  userUpdateValidation,
  EmailValidation,
} from "../../validations/user";
import { Request, Response, NextFunction } from "express";
import { JsonOne } from "../../utils/responseFun";

const userRegisterMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userRegisterValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const LoginValidtorMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = LoginValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const userUpdateMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = userUpdateValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const EmailValidtorMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = EmailValidation.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};

export { userRegisterMid, LoginValidtorMid, userUpdateMid, EmailValidtorMid };
