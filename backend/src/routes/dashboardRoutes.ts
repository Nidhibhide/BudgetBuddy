import {
  getTransaction,
  getCategoryData,
  getSmartTips,
  getBarChartData,
} from "../controllers/dashboard";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";

const router = express.Router();

router.get("/get-categoryData", IsLoggeedIn, getCategoryData);
router.get("/get-transactions", IsLoggeedIn, getTransaction);
router.get("/get-tips", IsLoggeedIn, getSmartTips);
router.get("/get-barChart", IsLoggeedIn, getBarChartData);

export default router;
