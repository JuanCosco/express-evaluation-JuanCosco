import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { getMyProfile } from "../controllers/user.controller";

const router = Router();

// rutas de usuario
router.get("/me", verifyToken, getMyProfile);

export default router;
