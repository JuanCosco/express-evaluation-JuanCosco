import { Request, Response, NextFunction } from "express";
import { createUser, findUserByUsername } from "../models/user.models";
import { loginUser } from "../models/auth.model";
import { hashPassword } from "../utils/hash.util";

export async function controladorSignup(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username y password son requeridos" });
    }

    // Verificar si existe usuario
    const usuarioCreado = await findUserByUsername(username);

    if (usuarioCreado) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hash de contraseña
    const hashedPassword = await hashPassword(password);

    // Crear Usuario
    const user = await createUser(username, hashedPassword);

    return res.status(201).json({
      message: "Cuenta creada con éxito",
      user,
    });
  } catch (error) {
    return next(error);
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      ok: false,
      message: "username y password son requeridos",
    });
  }

  try {
    const token = await loginUser(username, password);

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    return res.status(200).json({
      ok: true,
      data: { token },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: "Error interno del servidor",
    });
  }
}
