import { Router } from "express";
import { controladorSignup } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", controladorSignup);

export default router;