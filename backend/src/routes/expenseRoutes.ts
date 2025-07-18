import {
  create,
  getAll,
  softDelete,
  restore,
  edit,
  getCount,
} from "../controllers/expense";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";

import { ExpenseMid } from "../middlewares/Validators/expense";

const router = express.Router();

router.post("/create", IsLoggeedIn, ExpenseMid, create);
router.get("/getAll", IsLoggeedIn, getAll);
router.post("/get-count", IsLoggeedIn, getCount);
router.put("/delete", IsLoggeedIn, softDelete);
router.put("/edit/:id", IsLoggeedIn, ExpenseMid, edit);
router.put("/restore/:id", IsLoggeedIn, restore);

export default router;
