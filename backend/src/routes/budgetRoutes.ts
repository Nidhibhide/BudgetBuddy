import { edit, getOne } from "../controllers/budget";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.put("/edit", IsLoggeedIn, edit);

router.get("/get", IsLoggeedIn, getOne);
export default router;
