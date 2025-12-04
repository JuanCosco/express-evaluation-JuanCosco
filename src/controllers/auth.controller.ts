import { Request, Response, NextFunction } from "express";
import { createUser, findUserByUsername } from "../models/user.models";
import { hashPassword } from "../utils/hash.util";

export async function controladorSignup (req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({message: "username y password son requeridos"});
        }

        // Verificar si existe usuario
        const usuarioCreado = await findUserByUsername(username);

        if (usuarioCreado) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
 
        // Hash de contraseña
        const hashedPassword = await hashPassword(password);

        // Crear Usuario
        const user = await createUser(username, hashedPassword);

        return res.status(201).json({
            message: "Cuenta creada con éxito",
            user,
        });
    } catch (error) {
        return next(error);
        
    }
};