import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { crearPost } from "../controllers/post.controller";

const router = Router();

// rutas para posts
router.post("/", verifyToken ,crearPost);

export default router;
