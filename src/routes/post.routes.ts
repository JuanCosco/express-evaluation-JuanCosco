import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { crearPost, actualizarPost, listarPosts } from "../controllers/post.controller";

const router = Router();

// rutas para posts
router.post("/", verifyToken ,crearPost);
router.patch("/:id", verifyToken, actualizarPost);
router.get("/", listarPosts);

export default router;
