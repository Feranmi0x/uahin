import { asc, eq } from "drizzle-orm";
import { db } from "../index";
import { programs } from "../schema";

export async function getPrograms() {
  return db
    .select()
    .from(programs)
    .where(eq(programs.active, true))
    .orderBy(asc(programs.sortOrder));
}

export async function createProgram(data) {
  const result = await db.insert(programs).values(data).returning();
  return result[0];
}
