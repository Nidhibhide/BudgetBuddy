import { create,getOne } from "../controllers/category";
import express from "express";
import { CategoryMid } from "../middlewares/Validators/category";

import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.post("/create", IsLoggeedIn, CategoryMid, create);
router.get("/get", IsLoggeedIn, getOne);
export default router;
