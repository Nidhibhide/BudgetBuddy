import { checkToken, changePassword, refreshToken } from "../controllers/auth";
import express from "express";

import { ChangePasswordMid } from "../middlewares/Validators/user";
import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.put("/changePassword", IsLoggeedIn, ChangePasswordMid, changePassword);

router.get("/checkToken", checkToken);
router.get("/refreshToken", refreshToken);

export default router;
