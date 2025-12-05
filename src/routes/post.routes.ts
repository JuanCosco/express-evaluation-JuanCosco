import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { crearPost, actualizarPost } from "../controllers/post.controller";

const router = Router();

// rutas para posts
router.post("/", verifyToken ,crearPost);
router.patch("/:id", verifyToken, actualizarPost);

export default router;
