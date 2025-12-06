import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getPostId, actIdPost, getIdPost, getAllPosts, getPostUser } from "../models/post.model";
import { getUser } from "../models/user.models";

export async function crearPost(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        ok: false,
        message: "El contenido del post es obligatorio",
      });
    }

    const newPost = await createPost(userId, content);
    const fullPost = await getPostId(newPost.id);

    return res.status(201).json({
      ok: true,
      post: fullPost,
    });
  } catch (error) {
    console.error("ERROR EN crear:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear el post",
    });
  }
}

export async function actualizarPost(req: AuthRequest, res: Response) {
  try {
    const userId = req.user?.id;
    const postId = Number(req.params["id"]);
    const { content } = req.body;

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

    const post = await getIdPost(postId);
    console.log(post);
    if (!post) {
      return res.status(404).json({
        ok: false,
        message: "Post no encontrado",
      });
    }

    // Validar que el usuario sea el dueño del post
    if (post.userid !== userId) {
      return res.status(401).json({
        ok: false,
        message: "No tienes permisos para editar este post",
      });
    }

    // Validar contenido
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        ok: false,
        message: "El contenido del post es obligatorio",
      });
    }

    //Actualizar el post
    const updated = await actIdPost(postId, content);
    const fullPost = await getPostId(updated.id);

    return res.status(200).json({
      ok: true,
      post: fullPost,
    });
  } catch (error) {
    console.error("ERROR en actualizar el post:", error);
    return res.status(500).json({
      ok: false,
      message: "Error en actualizar el post",
    });
  }
}

//Listar Posts
export async function listarPosts(req: Request, res: Response) {
  try {
    const page = parseInt(req.query["page"] as string) || 1;
    const limit = parseInt(req.query["limit"] as string) || 10;

    const posts = await getAllPosts(page, limit);

    return res.status(200).json({
      ok: true,
      posts: posts,
    });
  } catch (error) {
    console.error("ERROR EN listar:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al listar los post",
    });
  }
}

export async function listarPostUsuario(req: Request, res: Response) {
  try {
    const username = req.params["username"];

    //Validar usuario
    const user = await getUser(username);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const posts = await getPostUser(username);

    return res.status(200).json({
      ok: true,
      data: posts,
    });
  } catch (error) {
    console.error("ERROR EN listar por usuario:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al listar los posts del usuario",
    });
  }
}
