import {
  checkToken,
  changePassword,
  verifyCurrentPassword,
  refreshToken,
} from "../controllers/auth";
import express from "express";

import { LoginMid, EmailMid } from "../middlewares/Validators/user";
import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.put("/changePassword", LoginMid, changePassword);
router.post(
  "/verifyCurrentPassword",
  IsLoggeedIn,
  LoginMid,
  verifyCurrentPassword
);

router.get("/checkToken", checkToken);
router.get("/refreshToken", refreshToken);

export default router;
