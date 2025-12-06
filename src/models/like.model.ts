import { db } from "../db";

// Verifica si un post existe
export async function existPost(postId: number) {
  const sql = `SELECT id FROM posts WHERE id = $1`;
  const result = await db.query(sql, [postId]);
  return result.rows[0];
}

// Verifica si el usuario ya dio like a un post
export async function alreadyLike(userId: number, postId: number) {
  const sql = `SELECT id FROM likes WHERE "userid" = $1 AND "postid" = $2`;
  const result = await db.query(sql, [userId, postId]);
  return result.rows[0];
}

// Crear like
export async function createLike(userId: number, postId: number) {
  const sql = `
    INSERT INTO likes ("userid", "postid", "createdat")
    VALUES ($1, $2, NOW())
    RETURNING id
  `;
  const result = await db.query(sql, [userId, postId]);
  return result.rows[0];
}

//Quitar like
export async function removeLike(userId: number, postId: number) {
  const sql = `
    DELETE FROM likes
    WHERE "userid" = $1 AND "postid" = $2
    RETURNING id
  `;
  const result = await db.query(sql, [userId, postId]);
  return result.rows[0];
}
