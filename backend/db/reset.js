import "dotenv/config";
import fs from "fs";
import mysql from "mysql2/promise";
import { randomUUID } from "crypto";

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
    // Run schema.sql to recreate all tables
    await connection.query(schema);
    console.log("Database schema applied!");

    const [companies] = await connection.query(`SELECT id FROM companies`);

    const defaultQuestions = [
      "Jag känner mig motiverad i mitt arbete",
      "Jag upplever att arbetsbelastningen är rimlig i dagsläget",
      "Jag upplever att stressnivån på arbetsplatsen är rimlig",
      "Jag känner mig trygg i min arbetsmiljö, både psykiskt och fysiskt",
      "Jag upplever att jag har möjlighet till återhämtning under arbetsdagen",
      "Jag upplever att jag har en god balans mellan privatliv och arbetsliv",
      "Jag upplever att samarbetet och sammanhållningen i teamet fungerar bra",
      "Jag upplever att jag får tillräckligt med stöd när jag stöter på utmaningar i mitt arbete",
    ];

    // Insert the same questions for each company
    for (const company of companies) {
      for (const question of defaultQuestions) {
        await connection.query(
          `INSERT INTO questions (company_id, question_text) VALUES (?, ?)`,
          [company.id, question]
        );
      }
    }

    const [userRows] = await connection.query(
      `SELECT id, company_id FROM users WHERE email = 'user@example.com'`
    );
    const testUser = userRows[0];

    if (testUser) {
      const [questionRows] = await connection.query(
        `SELECT id FROM questions WHERE company_id = ?`,
        [testUser.company_id]
      );

      const now = new Date();
      const monthsBack = 4;
      for (let i = 0; i < monthsBack; i++) {
        const submissionId = randomUUID();
        const backDate = new Date(
          now.getFullYear(),
          now.getMonth() - i,
          Math.floor(Math.random() * 28) + 1
        );
        const submittedAt = backDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " ");

        for (const question of questionRows) {
          const randomAnswer = Math.floor(Math.random() * 5) + 1;
          await connection.query(
            `INSERT INTO answers (user_id, question_id, answer_value, submission_id, submitted_at)
             VALUES (?, ?, ?, ?, ?)`,
            [testUser.id, question.id, randomAnswer, submissionId, submittedAt]
          );
        }

        console.log(
          `Inserted answers for ${backDate.toLocaleDateString("sv-SE")}`
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

runSchema().catch((err) => {
  console.error("Unhandled error:", err);
});
