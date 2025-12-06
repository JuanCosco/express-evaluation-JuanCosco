import { Router } from "express";
import { db } from "../db";

const router = Router();

router.get("/db", async (_req, res, next) => {
  try {
    // Consulta real a PostgreSQL
    const { rows } = await db.query("SELECT NOW() as now");

    res.json({
      success: true,
      message: "Database connection is working!",
      timestamp: rows[0].now,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
