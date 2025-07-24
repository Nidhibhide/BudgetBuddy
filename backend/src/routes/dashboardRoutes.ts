import {
getTransaction,getCategoryData
} from "../controllers/dashboard";
import express from "express";
import IsLoggeedIn from "../middlewares/TokenAuth";



const router = express.Router();

router.get("/get-categoryData", IsLoggeedIn, getCategoryData);
router.get("/get-transactions", IsLoggeedIn, getTransaction);


export default router;
