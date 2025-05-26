import express from "express";
import { query } from "../db/query.js";
import { requireAuth } from "../middleware.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const router = express.Router();
const serverPassword = process.env.JWT_SECRET;

// POST /auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const rows = await query(
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
      serverPassword,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7, // Token livslängd - 7 dagar
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

// POST /auth/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out successfully" });
});

// POST /auth/register
router.post("/register", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    department = null,
    role = "user",
    company_id = 1,
  } = req.body;

  if (!first_name || !last_name || !email || !password || !company_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const existing = await query("SELECT id FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const companyRows = await query(
      "SELECT wellness_allowance FROM companies WHERE id = ?",
      [company_id]
    );
    const startingAllowance = companyRows[0]?.wellness_allowance ?? 0;

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      `INSERT INTO users (first_name, last_name, email, department, password, role, company_id, remaining_wellness_allowance)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        department,
        hashedPassword,
        role,
        company_id,
        startingAllowance,
      ]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

// GET /auth/me
router.get("/me", requireAuth, async (req, res) => {
  const { userId } = req.user;

  try {
    const [user] = await query(
      `SELECT u.id, u.first_name, u.last_name, u.email, u.department,
              u.role, u.company_id, u.remaining_wellness_allowance,
              c.name AS company
       FROM users u
       JOIN companies c ON u.company_id = c.id
       WHERE u.id = ?`,
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error in /auth/me:", err);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
});

export default router;
