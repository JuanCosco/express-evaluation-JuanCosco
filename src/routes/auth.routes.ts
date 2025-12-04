import { Router } from "express";
import { controladorSignup } from "../controllers/auth.controller";
import { login } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", controladorSignup);
router.post("/login", login);

export default router;