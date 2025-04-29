import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./config/db";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes

// Hämtar användare från databasen
app.get("/users", async (req, res) => {
  try {
    const [users] = await pool.execute(
      "SELECT id, first_name, last_name, email, role FROM users"
    );
    res.json(users); // Returnera resultatet som JSON
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get users" });
  }
});

// Hämtar frågor från databasen
app.get("/questions", async (req, res) => {
  try {
    const [questions] = await pool.execute("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to get questions" });
  }
});

// Starta servern
app.listen(port, () => {
  console.log(`CC backend running at http://localhost:${port}`);
});
