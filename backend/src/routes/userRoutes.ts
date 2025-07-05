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
  RegisterMid,
  LoginMid,
  UpdateMid,
} from "../middlewares/Validators/user";

const router = express.Router();
router.put("/updateProfile/:id", IsLoggeedIn, UpdateMid, updateProfile);
router.post("/register", RegisterMid, registerUser);
router.post("/login", LoginMid, login);
router.post("/google-login", googleLogin);
router.get("/logout", IsLoggeedIn, logOut);
export default router;
