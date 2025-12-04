import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserbyID } from "../models/user.models";

export async function getMyProfile(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        ok: false, 
        message: "Usuario no autenticado",
        });
    }

    const user = await getUserbyID(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    return res.json({
      ok: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}
