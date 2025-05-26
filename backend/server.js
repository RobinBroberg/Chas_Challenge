import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import allowanceRoutes from "./routes/allowance.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import receiptsRoutes from "./routes/receipts.js";

const app = express();
const port = 3001;

// Middleware for CORS and cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Let cookies be sent with request
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Define routes
app.use("/auth", authRoutes);
app.use("/allowance", allowanceRoutes);
app.use("/questions", questionRoutes);
app.use("/users", userRoutes);
app.use("/answers", answerRoutes);
app.use("/receipts", receiptsRoutes);

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
