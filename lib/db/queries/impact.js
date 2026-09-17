import { asc, eq } from "drizzle-orm";
import { db } from "../index";
import { impactStats } from "../schema";

export async function getImpactStats() {
  return db
    .select()
    .from(impactStats)
    .where(eq(impactStats.active, true))
    .orderBy(asc(impactStats.sortOrder));
}

export async function createImpactStat(data) {
  const result = await db.insert(impactStats).values(data).returning();
  return result[0];
}
