// server.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"; // Importera users.js rutter
import allowanceRoutes from "./routes/allowance.js";
import questionRoutes from "./routes/questions.js";

const app = express();
const port = 3001;

// Middleware för CORS och cookies
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Låt cookies skickas med
  })
);
app.use(express.json());
app.use(cookieParser());

// Definiera rutter
app.use("/auth", authRoutes);
app.use("/users", userRoutes); // Lägg till rutt för användare
app.use("/allowance", allowanceRoutes);
app.use("/questions", questionRoutes);

app.listen(port, () => {
  console.log(`Backend is running at http://localhost:${port}`);
});
