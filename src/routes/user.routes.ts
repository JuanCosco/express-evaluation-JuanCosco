import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { mostrarPerfil, actualizarPerfil, eliminarPerfil } from "../controllers/user.controller";

const router = Router();

// rutas de usuario
router.get("/me", verifyToken, mostrarPerfil);
router.patch("/me", verifyToken, actualizarPerfil);
router.delete("/me", verifyToken, eliminarPerfil);

export default router;
