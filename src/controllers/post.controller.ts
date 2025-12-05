import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { createPost, getPostId } from "../models/post.model";

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