import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { existPost, alreadyLike, createLike, removeLike } from "../models/like.model";
import { getPostId } from "../models/post.model";

export async function darLike(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const postId = Number(req.params["postid"]);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    if (isNaN(postId)) {
      return res.status(400).json({
        ok: false,
        message: "El ID del post no es válido",
      });
    }

    // Verificar que el post exista
    const post = await existPost(postId);
    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "El post no existe",
      });
    }

    // Verificar si el usuario ya dio like a este post
    const like = await alreadyLike(userId, postId);
    if (like) {
      return res.status(400).json({
        ok: false,
        message: "Ya has dado like a este post",
      });
    }
    // Crear el like
    await createLike(userId, postId);

    // Obtener el post actualizado con el nuevo conteo de likes
    const data = await getPostId(postId);

    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("ERROR en dar like:", error);
    return res.status(500).json({
      ok: false,
      message: "Error en dar like",
    });
  }
}

export async function quitarLike(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const postId = Number(req.params["postid"]);

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    if (isNaN(postId)) {
      return res.status(400).json({
        ok: false,
        message: "El ID del post no es válido",
      });
    }

    // Verificar que el post exista
    const post = await existPost(postId);
    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "El post no existe",
      });
    }

    // Verificar si el usuario ya dio like a este post
    const like = await alreadyLike(userId, postId);
    if (!like) {
      return res.status(400).json({
        ok: false,
        message: "No has dado like a este post",
      });
    }

    // Quitar el like
    await removeLike(userId, postId);

    // Obtener el post actualizado con el nuevo conteo de likes
    const data = await getPostId(postId);

    return res.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    console.error("ERROR en borrar like:", error);
    return res.status(500).json({
      ok: false,
      message: "Error en borrar like",
    });
  }
}
