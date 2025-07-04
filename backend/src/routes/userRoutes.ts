import { registerUser,login, googleLogin } from "../controllers/user";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";
import { userRegisterMid,  LoginValidtorMid } from "../middlewares/validationMid/user";

const router = express.Router();

router.post("/register", userRegisterMid, registerUser);
router.post("/login", LoginValidtorMid, login);
router.post("/google-login", googleLogin);

export default router;
