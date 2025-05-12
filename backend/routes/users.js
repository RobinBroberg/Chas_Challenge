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

// POST /users - Endast admin kan skapa nya användare
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  const { name, password, email } = req.body;
  const { company_id } = req.user;

  // Validera att namn, lösenord och email finns
  if (!name || !password || !email) {
    return res.status(400).json({ message: "Namn, email och lösenord krävs." });
  }

  // Kontrollera om användaren redan finns
  try {
    const [existingUser] = await pool.execute(
      `SELECT * FROM users WHERE email = ? AND company_id = ?`,
      [email, company_id]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Användare med denna e-post finns redan." });
    }

    // Hasher lösenordet
    const hashedPassword = await bcrypt.hash(password, 10);

    // Spara användaren i databasen
    const [result] = await pool.execute(
      `INSERT INTO users (first_name, email, password, company_id, role) VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, company_id, "user"]
    );

    res.status(201).json({ id: result.insertId, name, email });
  } catch (error) {
    console.error("Fel vid skapande av användare:", error);
    res.status(500).json({ message: "Kunde inte skapa användare." });
  }
});

export default router;
