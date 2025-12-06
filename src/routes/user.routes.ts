import { Router } from "express";
import { verifyToken } from "../middlewares/auth.middleware";
import { isAdmin } from "../middlewares/isAdmin";
import { mostrarPerfil, actualizarPerfil, eliminarPerfil, verTodosPerfiles } from "../controllers/user.controller";

const router = Router();

// rutas de usuario
router.get("/me", verifyToken, mostrarPerfil);
router.patch("/me", verifyToken, actualizarPerfil);
router.delete("/me", verifyToken, eliminarPerfil);
router.get("/users", verifyToken, isAdmin, verTodosPerfiles);

export default router;
