import { Pool } from "pg";
import { DATABASE_URL } from "../config/env";

export const db = new Pool({
  connectionString: DATABASE_URL,
});


