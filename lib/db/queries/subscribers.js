import { eq } from "drizzle-orm";
import { db } from "../index";
import { subscribers } from "../schema";

export async function getSubscriberByEmail(email) {
  const rows = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email));
  return rows[0] || null;
}

export async function createSubscriber(data) {
  const result = await db.insert(subscribers).values(data).returning();
  return result[0];
}
