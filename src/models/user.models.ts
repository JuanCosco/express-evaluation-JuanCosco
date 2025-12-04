import { db } from "../db";

export async function createUser(username: string, hashedPassword: string) {
  const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, createdAt;`;

  const values = [username, hashedPassword];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function findUserByUsername(username: string) {
  const query = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await db.query(query, [username]);
  return rows[0];
}
