import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import "dotenv/config";
import bcrypt from "bcrypt";
import { requireAuth } from "./middleware.js";

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

app.get("/users", requireAuth, async (req, res) => {
  const { company_id } = req.user;

  try {
    const users = await query(
      "SELECT id, first_name, last_name, email, role FROM users WHERE company_id = ?",
      [company_id]
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
});

app.get("/questions", requireAuth, async (req, res) => {
  const { company_id } = req.user;

  try {
    const questions = await query(
      "SELECT * FROM questions WHERE company_id = ?",
      [company_id]
    );
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);

    res.status(500).json({ message: "Failed to get questions" });
  }
});

app.put("/questions/:id", requireAuth, async (req, res) => {
  const { company_id } = req.user;
  const questionId = req.params.id;
  const { question_text } = req.body;

  if (!question_text) {
    return res.status(400).json({ message: "question_text is required" });
  }

  try {
    const [result] = await pool.execute(
      `UPDATE questions SET question_text = ? 
       WHERE id = ? AND company_id = ?`,
      [question_text, questionId, company_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Question not found or unauthorized" });
    }

    res.json({ message: "Question updated successfully" });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({ message: "Failed to update question" });
  }
});

app.put("/questions", requireAuth, async (req, res) => {
  const { company_id } = req.user;
  const updates = req.body;

  if (!Array.isArray(updates)) {
    return res.status(400).json({ message: "Expected an array of updates" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT id FROM questions WHERE company_id = ?",
      [company_id]
    );
    const validIds = new Set(rows.map((q) => q.id));

    const filteredUpdates = updates.filter((q) => validIds.has(q.id));

    if (filteredUpdates.length === 0) {
      return res.status(403).json({ message: "No valid questions to update" });
    }
    const updatePromises = filteredUpdates.map((q) =>
      pool.execute(
        "UPDATE questions SET question_text = ? WHERE id = ? AND company_id = ?",
        [q.question_text, q.id, company_id]
      )
    );

    await Promise.all(updatePromises);

    res.json({ message: "Questions updated successfully" });
  } catch (error) {
    console.error("Error updating questions:", error);
    res.status(500).json({ message: "Failed to update questions" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      "SELECT id, password, role, company_id FROM users WHERE email = ?",
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
      { userId: user.id, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
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

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out successfully" });
});

app.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    role = "user",
    company_id = 1, //fallback to company 1 if not provided
  } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [existing] = await pool.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (first_name, last_name, email, password, role, company_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [first_name, last_name, email, hashedPassword, role, company_id]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

app.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, serverPassword);
    res.json({
      userId: decoded.userId,
      role: decoded.role,
      company_id: decoded.company_id,
    });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

app.listen(port, () => {
  console.log(`CC backend running at http://localhost:${port}`);
});
