import { db } from "../db";

export async function createPost(userId: number, content: string) {
    const sql = `
    INSERT INTO posts ("userid", content, "createdat", "updatedat")
    VALUES ($1, $2, NOW(), NOW())
    RETURNING id, content, "createdat", "updatedat", "userid"
  `;

    const result = await db.query(sql, [userId, content]);
    return result.rows[0];
}

export async function getPostId(postId: number) {
    const sql = `
     SELECT 
      p.id,
      p.content,
      p."createdat",
      p."updatedat",
      u.username,
      (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l."postid" = p.id
      ) AS "likesCount"
    FROM posts p
    JOIN users u ON u.id = p."userid"
    WHERE p.id = $1
  `;

    const result = await db.query(sql, [postId]);
    return result.rows[0];
}

//PATCH /posts/:id (Editar Post Existente)

export async function getIdPost(id: number) {
    const sql = `SeLECT * FROM posts WHERE id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
}

export async function actIdPost(postId: number, content: string) {
    const sql = `
    UPDATE posts
    SET content = $1, "updatedat" = NOW()
    WHERE id = $2
    RETURNING id, content, "createdat", "updatedat", "userid"
  `;

    const result = await db.query(sql, [content, postId]);
    return result.rows[0];
}

//Visualización de Posts

// Obtener lista de posts con paginación