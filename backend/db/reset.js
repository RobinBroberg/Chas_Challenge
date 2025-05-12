import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";

const { DB_USER, DB_PASS, DB_PORT, DB_HOST, DB_NAME } = process.env;

const runSchema = async () => {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    multipleStatements: true,
  });

  const schema = fs.readFileSync("./db/schema.sql", "utf-8");

  try {
    // Run schema
    await connection.query(schema);
    console.log("Database schema applied!");

    const [companies] = await connection.query(`SELECT id FROM companies`);

    const defaultQuestions = [
      "How energized do you feel today?",
      "How stressed do you feel right now?",
      "How well did you sleep last night?",
      "How motivated are you to work today?",
      "How productive do you feel today?",
      "How satisfied are you with your work environment?",
      "How clear are your work tasks today?",
      "How supported do you feel by your team/manager?",
      "How balanced do you feel between work and personal life?",
      "How confident are you about your current workload?",
    ];

    //  Insert the same questions for each company
    for (const company of companies) {
      for (const question of defaultQuestions) {
        await connection.query(
          `INSERT INTO questions (company_id, question_text) VALUES (?, ?)`,
          [company.id, question]
        );
      }
    }

    const [userRows] = await connection.query(
      `SELECT id FROM users WHERE email = 'user@example.com'`
    );
    const testUser = userRows[0];

    if (testUser) {
      const [questionRows] = await connection.query(
        `SELECT id FROM questions WHERE company_id = 1`
      );

      for (const question of questionRows) {
        const randomAnswer = Math.floor(Math.random() * 5) + 1;
        await connection.query(
          `INSERT INTO answers (user_id, question_id, answer_value) VALUES (?, ?, ?)`,
          [testUser.id, question.id, randomAnswer]
        );
      }

      console.log("Test answers inserted for user@example.com");
    } else {
      console.log("Test user not found. Skipping test answers.");
    }

    console.log("Companies and default questions seeded!");
  } catch (error) {
    console.error("Failed to apply schema or seed data:", error.message);
  } finally {
    await connection.end();
  }
};

runSchema();
