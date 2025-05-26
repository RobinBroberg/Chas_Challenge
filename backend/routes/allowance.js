import express from "express";
import { query } from "../db/query.js";
import { requireAuth, requireRole } from "../middleware.js";

const router = express.Router();

router.get("/user/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const adminCompanyId = req.user.company_id;
  const userId = req.params.id;

  try {
    const rows = await query(
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
  const userId = req.user.userId;

  try {
    const [row] = await query(
      `SELECT 
         u.remaining_wellness_allowance AS remaining,
         c.wellness_allowance AS total
       FROM users u
       JOIN companies c ON u.company_id = c.id
       WHERE u.id = ?`,
      [userId]
    );

    if (!row) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ remaining: row.remaining, total: row.total });
  } catch (error) {
    console.error("Error fetching allowance:", error);
    res.status(500).json({ message: "Failed to fetch allowance" });
  }
});

router.post("/deduct", requireAuth, async (req, res) => {
  const { userId } = req.user;
  const { amount } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  try {
    const [user] = await query(
      "SELECT remaining_wellness_allowance FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentAllowance = user.remaining_wellness_allowance;

    if (amount > currentAllowance) {
      return res
        .status(400)
        .json({ message: "Amount exceeds remaining allowance" });
    }

    await query(
      "UPDATE users SET remaining_wellness_allowance = remaining_wellness_allowance - ? WHERE id = ?",
      [amount, userId]
    );

    res.json({
      message: "Allowance updated",
      deducted: amount,
      remaining: currentAllowance - amount,
    });
  } catch (error) {
    console.error("Error deducting allowance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
