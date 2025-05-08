import express from "express";
import pool from "../db/pool.js";
import { requireAuth } from "../middleware.js";

const router = express.Router();

// GET /users - Admin only
router.get("/", requireAuth, async (req, res) => {
  const { role, company_id } = req.user;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Only admins can access this endpoint" });
  }

  try {
    const [users] = await pool.execute(
      `SELECT id, first_name, last_name, email, role, remaining_wellness_allowance 
       FROM users WHERE company_id = ?`,
      [company_id]
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
});

export default router;
