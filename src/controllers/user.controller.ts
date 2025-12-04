import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { db } from "../db";

export async function getMyProfile(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ ok: false, message: "Usuario no autenticado" });
    }

    const result = await db.query(
      `SELECT id, username, email, firstName, lastName,createdat,updatedat
       FROM users
       WHERE id = $1`,
      [userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}
