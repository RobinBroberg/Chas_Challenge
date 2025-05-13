import express from "express";
import { query } from "../db/query.js";
import bcrypt from "bcrypt";
import { requireAuth, requireRole } from "../middleware.js";

const router = express.Router();

// GET /users - Endast admin kan hämta användare
router.get("/", requireAuth, requireRole("admin"), async (req, res) => {
  const { company_id } = req.user;

  try {
    const users = await query(
      `SELECT id, first_name, last_name, email, role, remaining_wellness_allowance 
       FROM users WHERE company_id = ?`,
      [company_id]
    );
    res.json(users);
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    res.status(500).json({ message: "Kunde inte hämta användare." });
  }
});

export default router;
