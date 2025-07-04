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
export { userRegisterValidation,LoginValidation };
