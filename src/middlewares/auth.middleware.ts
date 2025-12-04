import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            ok: false,
            error: "Token requerido",
        });
    }

    // Esperamos formato: Bearer XXXXX
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            ok: false,
            error: "Formato de token inválido",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env["JWT_SECRET"]!);
        req.user = decoded;
         return next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            error: "Token inválido o expirado",
        });
    }
}