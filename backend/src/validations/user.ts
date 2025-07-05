import Joi from "joi";
import {
  stringValidator,
  emailValidator,
  passwordValidator,
  selectValidator,
} from "../utils/GlobalValidation";

const Register = Joi.object({
  name: stringValidator("Name", 3, 50, true),

  email: emailValidator(),

  password: passwordValidator(),
});
const Login = Joi.object({
  email: emailValidator(),
  password: passwordValidator(),
});
const Update = Joi.object({
  name: stringValidator("Name", 3, 50, true),
  email: emailValidator(),
});
const Email = Joi.object({
  email: emailValidator(),
});
export { Register, Login, Update, Email };
