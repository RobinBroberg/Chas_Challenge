import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mysql from "mysql2/promise";
import "dotenv/config";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const { DB_USER, DB_PASS, DB_PORT, DB_HOST, DB_NAME } = process.env;

const pool = mysql.createPool({
  user: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_NAME,
  port: DB_PORT,
});

async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}

app.get("/users", async (req, res) => {
  const users = await query(
    "SELECT id, first_name, last_name, email, role FROM users"
  );
  res.json(users);
});

app.get("/questions", async (req, res) => {
  try {
    const questions = await query("SELECT * FROM questions");
    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to get questions" });
  }
});

app.listen(port, () => {
  console.log(`CC backend running at http://localhost:${port}`);
});
