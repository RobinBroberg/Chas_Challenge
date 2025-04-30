import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bcrypt from "bcrypt";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const serverPassword = process.env.JWT_SECRET;

const { DB_USER, DB_PASS, DB_PORT, DB_HOST, DB_NAME } = process.env;

const pool = mysql.createPool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_NAME,
  port: DB_PORT,
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

app.get("/users", async (req, res) => {
  try {
    const users = await query(
      "SELECT id, first_name, last_name, email, role FROM users"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await query("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to get questions" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT id, password, role FROM users WHERE email = ?",
      [email]
    );

    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      serverPassword,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in prod
    });

    res.json({
      message: "Login successful",
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`CC backend running at http://localhost:${port}`);
});
