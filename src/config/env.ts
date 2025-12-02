import dotenv from "dotenv";
dotenv.config();

// Acceder usando ["PORT"] para evitar TS4111
export const PORT = process.env["PORT"] || "4000";
export const DATABASE_URL = process.env["DATABASE_URL"];
export const JWT_SECRET = process.env["JWT_SECRET"];

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is missing in .env");
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in .env");
}
