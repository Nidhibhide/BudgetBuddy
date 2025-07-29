import DBConnect from "./MongoDB/index";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";

//routes
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import expenseRoutes from "./routes/expenseRoutes";
import budgetRoutes from "./routes/budgetRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
const corsOptions = {
  origin: ["http://localhost:5173","https://budget-buddy-roan.vercel.app/"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

dotenv.config();

const app = express();

DBConnect()
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => {
    console.error(" MongoDB connection failed", err);
    process.exit(1);
  });

app.use(express.json());

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = http.createServer(app);

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
