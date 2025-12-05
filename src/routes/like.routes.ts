import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { darLike, quitarLike } from "../controllers/like.controller";

const router = Router();

// rutas para likes
router.post("/:postid/like", verifyToken, darLike);
router.delete("/:postid/like", verifyToken, quitarLike);

export default router;
