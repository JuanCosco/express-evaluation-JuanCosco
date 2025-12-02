import { Pool } from "pg";
import { DATABASE_URL } from "../config/env";

export const db = new Pool({
  connectionString: DATABASE_URL,
});

db.connect()
  .then(() => console.log("📌 Connected to PostgreSQL"))
  .catch((err: any) => console.error("❌ DB Connection Error:", err));
