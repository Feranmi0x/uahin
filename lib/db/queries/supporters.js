import { asc, eq } from "drizzle-orm";
import { db } from "../index";
import { supporters } from "../schema";

export async function getSupporters() {
  return db
    .select()
    .from(supporters)
    .where(eq(supporters.active, true))
    .orderBy(asc(supporters.sortOrder));
}

export async function createSupporter(data) {
  const result = await db.insert(supporters).values(data).returning();
  return result[0];
}
