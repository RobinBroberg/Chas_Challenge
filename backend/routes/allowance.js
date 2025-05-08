import express from "express";
import pool from "../db/pool.js";
import { requireAuth } from "../middleware.js";

const router = express.Router();

router.get("/user/:id", requireAuth, async (req, res) => {
  const adminRole = req.user.role;
  const adminCompanyId = req.user.company_id;
  const userId = req.params.id;

  if (adminRole !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admins can access this endpoint" });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT first_name, last_name, email, remaining_wellness_allowance 
         FROM users 
         WHERE id = ? AND company_id = ?`,
      [userId, adminCompanyId]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found or not in your company" });
    }

    const user = rows[0];

    res.json({
      name: `${user.first_name} ${user.last_name}`,
      email: `${user.email}`,
      allowance: user.remaining_wellness_allowance,
    });
  } catch (error) {
    console.error("Error fetching user allowance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  const { userId, role } = req.user;

  if (role !== "user") {
    return res.status(403).json({ message: "Only users have an allowance" });
  }

  try {
    const [rows] = await pool.execute(
      "SELECT remaining_wellness_allowance FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ remaining: rows[0].remaining_wellness_allowance });
  } catch (error) {
    console.error("Error fetching allowance:", error);
    res.status(500).json({ message: "Failed to fetch allowance" });
  }
});

export default router;
