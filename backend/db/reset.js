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
    await connection.query(schema);
    console.log("Database schema applied!");
  } catch (error) {
    console.error("Failed to apply schema:", error.message);
  } finally {
    await connection.end();
  }
};

runSchema();
