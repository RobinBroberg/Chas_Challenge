import express from "express";
import multer from "multer";
import { query } from "../db/query.js";
import { requireAuth, requireRole } from "../middleware.js";
import { extractReceiptData } from "../utils/geminiOCR.js";
import fs from "fs/promises";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

router.get("/", requireAuth, async (req, res) => {
  const userId = req.user.userId;
  const role = req.user.role;

  try {
    let rows;

    if (role === "admin") {
      // Admins see all receipts from their company
      rows = await query(
        `SELECT r.*, u.first_name, u.last_name
         FROM receipts r
         JOIN users u ON r.user_id = u.id
         WHERE u.company_id = ?`,
        [req.user.company_id]
      );
    } else {
      // Users only see their own receipts
      rows = await query(
        "SELECT * FROM receipts WHERE user_id = ? ORDER BY uploaded_at DESC",
        [userId]
      );
    }

    res.json(rows);
  } catch (err) {
    console.error("Failed to fetch receipts:", err);
    res.status(500).json({ message: "Kunde inte hämta kvitton" });
  }
});

router.post(
  "/upload",
  requireAuth,
  upload.single("receipt"),
  async (req, res) => {
    const { userId } = req.user;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const ocrData = await extractReceiptData(file.path);
      const amount = parseInt(ocrData.amount);
      const activity = ocrData.activity?.trim() || null;
      const vendor = ocrData.vendor?.trim() || null;
      const purchaseDate = ocrData.purchase_date || null;

      if (!amount || isNaN(amount) || amount <= 0) {
        return res
          .status(400)
          .json({ message: "Invalid amount detected from receipt" });
      }

      const [userRow] = await query(
        "SELECT remaining_wellness_allowance FROM users WHERE id = ?",
        [userId]
      );

      if (!userRow) {
        return res.status(404).json({ message: "User not found" });
      }

      const currentAllowance = userRow.remaining_wellness_allowance;

      if (amount > currentAllowance) {
        await fs.unlink(file.path);
        return res
          .status(400)
          .json({ message: "Amount exceeds your allowance" });
      }

      const insertResult = await query(
        `INSERT INTO receipts (user_id, file_path, amount, activity, vendor, purchase_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, file.path, amount, activity, vendor, purchaseDate]
      );

      await query(
        `UPDATE users
       SET remaining_wellness_allowance = remaining_wellness_allowance - ?
       WHERE id = ?`,
        [amount, userId]
      );

      res.status(201).json({
        message: "Receipt uploaded and allowance updated",
        receiptId: insertResult.insertId,
        data: {
          amount,
          vendor,
          activity,
          purchaseDate,
          remaining: currentAllowance - amount,
        },
      });
    } catch (err) {
      console.error("Upload + OCR error:", err);
      res.status(500).json({ message: "Failed to process receipt" });
    }
  }
);

router.patch(
  "/:id/reject",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const receiptId = req.params.id;
    const reason = req.body.reason || "Ej specificerat";

    try {
      // Step 1: Get the receipt
      const [receipt] = await query("SELECT * FROM receipts WHERE id = ?", [
        receiptId,
      ]);

      if (!receipt) {
        return res.status(404).json({ message: "Kvitto hittades inte" });
      }

      if (receipt.status !== "pending") {
        return res
          .status(400)
          .json({ message: "Kvitto är redan godkänt eller avvisat" });
      }

      // Step 2: Refund the amount
      await query(
        `UPDATE users
       SET remaining_wellness_allowance = remaining_wellness_allowance + ?
       WHERE id = ?`,
        [receipt.amount, receipt.user_id]
      );

      // Step 3: Update receipt status
      await query(
        `UPDATE receipts
       SET status = 'rejected', rejection_reason = ?
       WHERE id = ?`,
        [reason, receiptId]
      );

      res.json({
        message: "Kvitto avvisat och belopp återbetalat",
        refunded: receipt.amount,
      });
    } catch (err) {
      console.error("Error rejecting receipt:", err);
      res.status(500).json({ message: "Fel vid avvisning av kvitto" });
    }
  }
);

router.patch(
  "/:id/approve",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    const receiptId = req.params.id;

    try {
      // Step 1: Get the receipt
      const [receipt] = await query("SELECT * FROM receipts WHERE id = ?", [
        receiptId,
      ]);

      if (!receipt) {
        return res.status(404).json({ message: "Kvitto hittades inte" });
      }

      if (receipt.status !== "pending") {
        return res.status(400).json({ message: "Kvitto är redan behandlat" });
      }

      // Step 2: Mark as approved
      await query(
        `UPDATE receipts
       SET status = 'approved', rejection_reason = NULL
       WHERE id = ?`,
        [receiptId]
      );

      res.json({ message: "Kvitto godkänt", receiptId });
    } catch (err) {
      console.error("Error approving receipt:", err);
      res.status(500).json({ message: "Fel vid godkännande av kvitto" });
    }
  }
);

export default router;
