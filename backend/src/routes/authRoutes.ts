import {
  checkToken,
  changePassword,
  forgotPass,
  resetPass,
  verifyCurrentPassword,
  refreshToken,
} from "../controllers/auth";
import express from "express";

import {
  LoginValidtorMid,
  EmailValidtorMid,
} from "../middlewares/validationMid/user";
import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.put("/changePassword", LoginValidtorMid, changePassword);
router.post(
  "/verifyCurrentPassword",
  IsLoggeedIn,
  LoginValidtorMid,
  verifyCurrentPassword
);

router.post("/forgotPassword", EmailValidtorMid, forgotPass);
router.get("/reset/:token", resetPass);
router.get("/checkToken", checkToken);
router.get("/refreshToken", refreshToken);

export default router;
