import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { crearPost, actualizarPost, listarPosts, listarPostUsuario } from "../controllers/post.controller";

const router = Router();

// rutas para posts
router.post("/", verifyToken ,crearPost);
router.patch("/:id", verifyToken, actualizarPost);
router.get("/", listarPosts);
router.get("/:username", listarPostUsuario);

export default router;
