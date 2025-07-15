import {
  Register,
  Login,
  Update,
  Email,
  ChangePassword,
} from "../../validations/user";
import { Request, Response, NextFunction } from "express";
import { JsonOne } from "../../utils/responseFun";

const RegisterMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Register.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const LoginMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Login.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const UpdateMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Update.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const EmailMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = Email.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
const ChangePasswordMid = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ChangePassword.validate(req.body);

  if (error) {
    const message = error.details[0].message;
    return JsonOne(res, 400, message, false);
  }
  next();
};
export { RegisterMid, LoginMid, UpdateMid, EmailMid, ChangePasswordMid };
