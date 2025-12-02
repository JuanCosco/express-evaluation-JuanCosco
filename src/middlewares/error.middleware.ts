import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}

export default function errorMiddleware(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error("❌ Error:", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    error: message,
  });
}
