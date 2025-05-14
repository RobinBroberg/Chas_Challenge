import express from "express";
import multer from "multer";
import { query } from "../db/query.js";
import { requireAuth } from "../middleware.js";
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
        await fs.unlink(file.path); // delete uploaded file
        return res
          .status(400)
          .json({ message: "Beloppet överskrider din pott" });
      }

      const insertResult = await query(
        `INSERT INTO receipts (user_id, file_path, amount, vendor, purchase_date)
       VALUES (?, ?, ?, ?, ?)`,
        [userId, file.path, amount, vendor, purchaseDate]
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

export default router;
