import DBConnect from "./MongoDB/index";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";

//routes
import userRoutes from "./routes/userRoutes";

const corsOptions = {
  origin: ["http://localhost:5173"],
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
// app.use("/api/auth", authRoutes);
// app.use("/api/test", testRoutes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/testAttempt", testAttemptRoutes);
// app.use("/api/notification", notificationRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
