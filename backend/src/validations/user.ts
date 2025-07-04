import Joi from "joi";
import {
  stringValidator,
  emailValidator,
  passwordValidator,
  selectValidator,
} from "../utils/GlobalValidation";

const userRegisterValidation = Joi.object({
  name: stringValidator("Name", 3, 50, true),

  email: emailValidator(),

  password: passwordValidator(),
});
const LoginValidation = Joi.object({
  email: emailValidator(),
  password: passwordValidator(),
});
const userUpdateValidation = Joi.object({
  name: stringValidator("Name", 3, 50, true),
  email: emailValidator(),
});
const EmailValidation = Joi.object({
  email: emailValidator(),
});
export { userRegisterValidation, LoginValidation, userUpdateValidation ,EmailValidation};
