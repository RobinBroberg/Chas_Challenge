import express from "express";
import { requireAuth, requireRole } from "../middleware.js";
import { query } from "../db/query.js";
import { randomUUID } from "crypto";

const router = express.Router();

// Post answers as array
router.post("/", requireAuth, async (req, res) => {
  const { userId } = req.user;
  const answers = req.body;

  if (!Array.isArray(answers) || answers.length === 0) {
    return res
      .status(400)
      .json({ message: "Answers must be a non-empty array" });
  }

  for (const a of answers) {
    if (
      typeof a.question_id !== "number" ||
      typeof a.answer_value !== "number" ||
      a.answer_value < 1 ||
      a.answer_value > 5
    ) {
      return res.status(400).json({
        message:
          "Each answer must include valid question_id and answer_value (1-5)",
      });
    }
  }

  answers.sort((a, b) => a.question_id - b.question_id);
  const submissionId = randomUUID();

  try {
    const insertPromises = answers.map((a) =>
      query(
        `INSERT INTO answers (user_id, question_id, answer_value, submission_id)
          VALUES (?, ?, ?, ?)`,
        [userId, a.question_id, a.answer_value, submissionId]
      )
    );

    await Promise.all(insertPromises);

    res.status(201).json({ message: "Answers submitted", submissionId });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ message: "Failed to submit answers" });
  }
});

// Get all answers by current user
router.get("/", requireAuth, async (req, res) => {
  const { userId } = req.user;

  try {
    const rows = await query(
      `SELECT a.id, a.question_id, q.question_text, a.answer_value, a.submitted_at
         FROM answers a
         JOIN questions q ON a.question_id = q.id
         WHERE a.user_id = ?
         ORDER BY a.submitted_at DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching answers:", error);
    res.status(500).json({ message: "Failed to fetch answers" });
  }
});

//Get average score per answer for the admin's company
router.get("/average", requireAuth, requireRole("admin"), async (req, res) => {
  const { role, company_id } = req.user;

  if (role !== "admin") {
    return res.status(403).json({ message: "Only admins can access averages" });
  }

  try {
    const rows = await query(
      `
        SELECT 
        q.id AS question_id,
          q.question_text,
          ROUND(AVG(a.answer_value), 2) AS average_score,
          COUNT(a.id) AS total_answers
          FROM questions q
          LEFT JOIN answers a 
          ON q.id = a.question_id
          AND (a.user_id, a.submitted_at) IN (
          SELECT user_id, MAX(submitted_at)
          FROM answers
          GROUP BY user_id
          )
          LEFT JOIN users u ON a.user_id = u.id
          WHERE q.company_id = ?
          GROUP BY q.id
          ORDER BY q.id;
        `,
      [company_id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching averages:", error);
    res.status(500).json({ message: "Failed to fetch average scores" });
  }
});

// Get overall average score and total answers for the admin's company

router.get(
  "/average/overall",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const { company_id } = req.user;

    try {
      const rows = await query(
        `
      SELECT 
      ROUND(AVG(a.answer_value), 2) AS average,
      COUNT(a.id) AS totalAnswers
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      WHERE q.company_id = ?
      `,
        [company_id]
      );

      const result = rows[0];

      res.json({
        average: result?.average ?? null,
        totalAnswers: result?.totalAnswers ?? 0,
      });
    } catch (error) {
      console.error("Error calculating overall average:", error);
      res.status(500).json({ message: "Failed to get overall average" });
    }
  }
);

router.get(
  "/average/latest",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const { company_id } = req.user;

    try {
      const rows = await query(
        `
          SELECT
          ROUND(AVG(a.answer_value), 2) AS averageScore,
          COUNT(DISTINCT a.user_id) AS totalUsers
          FROM answers a
          JOIN questions q ON a.question_id = q.id
          JOIN (
          SELECT user_id, MAX(submitted_at) AS latest_submission
          FROM answers
          GROUP BY user_id )
          latest ON a.user_id = latest.user_id AND a.submitted_at = latest.latest_submission
          WHERE q.company_id = ?
        `,
        [company_id]
      );

      const result = rows[0];

      res.json({
        averageScore: result?.averageScore ?? null,
        totalUsers: result?.totalUsers ?? 0,
      });
    } catch (error) {
      console.error("Error fetching latest average:", error);
      res.status(500).json({ message: "Failed to get latest average" });
    }
  }
);

// GET /answers/monthly - get average answer values per month for the current user
router.get("/monthly", requireAuth, async (req, res) => {
  const { userId } = req.user;

  try {
    const rows = await query(
      `
      SELECT 
        DATE_FORMAT(submitted_at, '%Y-%m') AS month,
        ROUND(AVG(answer_value), 2) AS average
      FROM answers
      WHERE user_id = ?
      GROUP BY month
      ORDER BY month
      `,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching monthly stats:", error);
    res.status(500).json({ message: "Failed to fetch monthly stats" });
  }
});

// Get survey submission history for current user
router.get("/history", requireAuth, async (req, res) => {
  const { userId } = req.user;

  try {
    const rows = await query(
      `
      SELECT 
        submission_id,
        DATE_FORMAT(MIN(submitted_at), '%Y-%m-%d') AS date,
        COUNT(*) AS answer_count
      FROM answers
      WHERE user_id = ?
      GROUP BY submission_id
      ORDER BY MIN(submitted_at) DESC
      `,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching answer history:", error);
    res.status(500).json({ message: "Failed to fetch history" });
  }
});

// Get all answers for a specific submission
router.get("/submission/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  try {
    const rows = await query(
      `
      SELECT q.question_text, a.answer_value
      FROM answers a
      JOIN questions q ON a.question_id = q.id
      WHERE a.user_id = ? AND a.submission_id = ?
      ORDER BY a.question_id
      `,
      [userId, id]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching submission answers:", error);
    res.status(500).json({ message: "Failed to fetch answers for submission" });
  }
});

export default router;
