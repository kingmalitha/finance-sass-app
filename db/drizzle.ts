import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

//? FOR PRISMA LIKE QUERIES: DO FOLLOWING CHANGES

// import * as schema from "./schema.ts";
// export const db = dizmo(sql, { schema });

// Then you can use db to query your database
// db.query.account.findMany({ where: { id: 1 } });

export const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
