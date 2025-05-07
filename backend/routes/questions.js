import express from "express";
import pool from "../db/pool.js";
import { requireAuth } from "../middleware.js";
import { query } from "../db/query.js";

const router = express.Router();

router.get("/", requireAuth, async (req, res) => {
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

router.put("/:id", requireAuth, async (req, res) => {
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

router.put("/", requireAuth, async (req, res) => {
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

export default router;
