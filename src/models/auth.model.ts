import { db } from "../db";
import { compararPassword } from "../utils/hash.util";
import jwt from "jsonwebtoken";

export async function loginUser(username: string, password: string) {
  //Buscar Usuario
  const query = "SELECT * FROM users WHERE username = $1 LIMIT 1";
  const result = await db.query(query, [username]);

  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  if (!user) {
    throw { status: 401, message: "Credenciales incorrectas" };
  }

  //Comparar contraseñas
  const passwordMatch = await compararPassword(password, user.password);
  if (!passwordMatch) {
    throw { status: 401, message: "Credenciales incorrectas" };
  }

  //Generar token JWT
  const token = jwt.sign(
    { userId: user.id },
    process.env["JWT_SECRET"]!,
    { expiresIn: "2h" }
  );

  return token;
}
