import {
  registerUser,
  login,
  googleLogin,
  logOut,
  updateProfile,
  getMe,
} from "../controllers/user";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";
import {
  RegisterMid,
  LoginMid,
  UpdateMid,
} from "../middlewares/Validators/user";

const router = express.Router();

router.post("/register", RegisterMid, registerUser);
router.post("/login", LoginMid, login);
router.post("/google-login", googleLogin);
router.get("/logout", IsLoggeedIn, logOut);
router.get("/getMe", IsLoggeedIn, getMe);
router.put("/profile", IsLoggeedIn, UpdateMid, updateProfile);
export default router;
