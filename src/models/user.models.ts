import { db } from "../db";

export async function createUser(username: string, hashedPassword: string) {
  const query = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, createdAt;`;

  const values = [username, hashedPassword];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function getUser(username: string) {
  const query = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await db.query(query, [username]);
  return rows[0];
}

//Gestión de Perfil de Usuario

export async function getUserID(id: number) {
  const result = await db.query(
    `SELECT id, username, email, firstName, lastName,createdat,updatedat
      FROM users
      WHERE id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function actUserID(id: number, data: any) {
  const fields = [];
  const values = [];
  let idx = 1;

  for (const key in data) {
    fields.push(`"${key}" = $${idx}`);
    values.push(data[key]);
    idx++;
  } 

  values.push(id);

  const sql = `
  UPDATE users
  SET ${fields.join(", ")}, "updatedat" = NOW() 
  WHERE id = $${idx}
  RETURNING id, username, email, "firstName", "lastName", role, "createdat", "updatedat"
  `;

  const result = await db.query(sql,values);
  return result.rows[0];
}