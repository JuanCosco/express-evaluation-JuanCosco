import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserID } from "../models/user.models";
import { actUserID } from "../models/user.models";
import { deleteUserID } from "../models/user.models";

export async function mostrarPerfil(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const user = await getUserID(userId);

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

export async function actualizarPerfil(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const { email, firstname, lastname } = req.body;


    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    // validar campos permitidos
    const updates: any = {};

    if (email !== undefined) updates.email = email;
    if (firstname !== undefined) updates.firstname = firstname;
    if (lastname !== undefined) updates.lastname = lastname;

    if (Object.keys(updates).length === 0) {
      // Se usa para actualizar al menos un dato
      return res.status(400).json({
        ok: false,
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    const updateUser = await actUserID(userId, updates);

    return res.json({
      ok: true,
      data: updateUser,
    });
  } catch (error) {
    console.error("ERROR EN actualizarPerfil:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el perfil",
    });
  }
}

export async function eliminarPerfil(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    const deletedUser = await deleteUserID(userId);

    if (!deletedUser) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    
    return res.json({
      ok: true,
    });

  } catch (error) {
    console.error("ERROR EN eliminar:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar la cuenta",
    });

  }
}
