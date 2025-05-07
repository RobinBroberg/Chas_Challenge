import pool from "./pool.js";

export async function query(sql, params) {
  const [results] = await pool.execute(sql, params);
  return results;
}
