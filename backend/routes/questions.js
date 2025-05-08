import express from "express";
import pool from "../db/pool.js";
import { requireAuth, requireRole } from "../middleware.js";
import { query } from "../db/query.js";

const router = express.Router();

// Get all questions from logged in users company
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

// Get question by ID from users company
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

//Update questions
router.put("/", requireAuth, requireRole("admin"), async (req, res) => {
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

// Add new questions
router.post("/", requireAuth, requireRole("admin"), async (req, res) => {
  const { company_id } = req.user;
  const { question_text } = req.body;

  if (!question_text) {
    return res.status(400).json({ message: "Question text is required" });
  }

  try {
    const [result] = await pool.execute(
      "INSERT INTO questions (company_id, question_text) VALUES (?, ?)",
      [company_id, question_text]
    );

    res.status(201).json({
      message: "Question added successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ message: "Failed to add question" });
  }
});

// Delete questions by ID
router.delete("/:id", requireAuth, requireRole("admin"), async (req, res) => {
  const { company_id } = req.user;
  const questionId = req.params.id;

  try {
    const [result] = await pool.execute(
      "DELETE FROM questions WHERE id = ? AND company_id = ?",
      [questionId, company_id]
    );

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Question not found or unauthorized" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ message: "Failed to delete question" });
  }
});

export default router;
