import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { darLike } from "../controllers/like.controller";

const router = Router();

// rutas para likes
router.post("/:postid/like", verifyToken, darLike);

export default router;
