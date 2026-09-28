import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { count, eq, inArray, sql } from "drizzle-orm";
import { authOptions } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/db/index";
import {
  donations,
  impactStats,
  membershipRegistrations,
  programs,
  stories,
  subscribers,
  supporters,
  workGallery,
} from "../../../../lib/db/schema";

export const dynamic = "force-dynamic";

async function tableCount(table) {
  const [result] = await db.select({ value: count() }).from(table);
  return Number(result?.value || 0);
}

async function capture(key, query, unavailable) {
  try {
    return await query;
  } catch (error) {
    console.error(`Admin overview ${key} query failed:`, error);
    unavailable.push(key);
    return null;
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  try {
    const unavailable = [];
    const [
      donationTotal,
      successfulDonations,
      pendingDonations,
      donationAmount,
      supportersTotal,
      programmesTotal,
      activeProgrammes,
      storiesTotal,
      registrationsTotal,
      galleryTotal,
      subscribersTotal,
      impactStatsTotal,
    ] = await Promise.all([
      capture("donations", tableCount(donations), unavailable),
      capture("successfulDonations", db.select({ value: count() }).from(donations).where(eq(donations.status, "success")), unavailable),
      capture("pendingOrFailedDonations", db.select({ value: count() }).from(donations).where(inArray(donations.status, ["initialized", "failed"])), unavailable),
      capture("donationAmount", db.select({ value: sql`COALESCE(SUM(CASE WHEN ${donations.status} = 'success' THEN ${donations.amount} ELSE 0 END), 0)` }).from(donations), unavailable),
      capture("supporters", tableCount(supporters), unavailable),
      capture("programmes", tableCount(programs), unavailable),
      capture("activeProgrammes", db.select({ value: count() }).from(programs).where(eq(programs.active, true)), unavailable),
      capture("stories", tableCount(stories), unavailable),
      capture("registrations", tableCount(membershipRegistrations), unavailable),
      capture("gallery", tableCount(workGallery), unavailable),
      capture("subscribers", tableCount(subscribers), unavailable),
      capture("impactStats", tableCount(impactStats), unavailable),
    ]);

    return NextResponse.json({
      donations: {
        total: donationTotal,
        successful: successfulDonations ? Number(successfulDonations[0]?.value || 0) : null,
        pendingOrFailed: pendingDonations ? Number(pendingDonations[0]?.value || 0) : null,
        amountReceived: donationAmount ? Number(donationAmount[0]?.value || 0) : null,
      },
      supporters: supportersTotal,
      programmes: programmesTotal,
      activeProgrammes: activeProgrammes ? Number(activeProgrammes[0]?.value || 0) : null,
      stories: storiesTotal,
      registrations: registrationsTotal,
      gallery: galleryTotal,
      subscribers: subscribersTotal,
      impactStats: impactStatsTotal,
      unavailable,
    });
  } catch (error) {
    console.error("Admin overview query failed:", error);
    return NextResponse.json({ error: "Unable to load dashboard statistics." }, { status: 500 });
  }
}