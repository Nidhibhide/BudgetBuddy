import {
  registerUser,
  login,
  googleLogin,
  logOut,
  updateProfile,
} from "../controllers/user";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";
import {
  userRegisterMid,
  LoginValidtorMid,
  userUpdateMid,
} from "../middlewares/validationMid/user";

const router = express.Router();
router.put("/updateProfile/:id", IsLoggeedIn, userUpdateMid, updateProfile);
router.post("/register", userRegisterMid, registerUser);
router.post("/login", LoginValidtorMid, login);
router.post("/google-login", googleLogin);
router.get("/logout", IsLoggeedIn, logOut);
export default router;
