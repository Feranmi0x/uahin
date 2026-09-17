import { eq } from "drizzle-orm";
import { db } from "../index";
import { donations } from "../schema";

export async function createDonation(values) {
  const [donation] = await db.insert(donations).values(values).returning();
  return donation;
}

export async function updateDonationByReference(reference, values) {
  const [donation] = await db
    .update(donations)
    .set({ ...values, updatedAt: new Date() })
    .where(eq(donations.reference, reference))
    .returning();
  return donation;
}

export async function getDonationByReference(reference) {
  const [donation] = await db
    .select()
    .from(donations)
    .where(eq(donations.reference, reference))
    .limit(1);
  return donation;
}

export async function saveDonationIfMissing(values) {
  const existing = await getDonationByReference(values.reference);
  return existing || createDonation(values);
}
