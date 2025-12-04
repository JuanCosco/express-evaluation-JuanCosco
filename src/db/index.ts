import { Pool } from "pg";
import { DATABASE_URL } from "../config/env";

export const db = new Pool({
  connectionString: DATABASE_URL,
});

db.connect()
  .then(() => console.log(" Conectado a la base de datos PostgreSQL"))
  .catch((err: any) => console.error("❌ DB Connection Error:", err));
