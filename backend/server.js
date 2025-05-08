import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import allowanceRoutes from "./routes/allowance.js";
import authRoutes from "./routes/auth.js";
import questionRoutes from "./routes/questions.js";
import userRoutes from "./routes/users.js";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/allowance", allowanceRoutes);
app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`CC backend running at http://localhost:${port}`);
});
