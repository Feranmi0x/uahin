import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { and, asc, desc, eq, gte, ilike, lte, or, sql } from "drizzle-orm";
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

const sections = {
  donations: { table: donations, order: desc(donations.createdAt), search: [donations.donorEmail, donations.reference, donations.donorFirstName, donations.donorLastName] },
  registrations: { table: membershipRegistrations, order: desc(membershipRegistrations.createdAt) },
  supporters: { table: supporters, order: asc(supporters.sortOrder), search: [supporters.name, supporters.role] },
  programmes: { table: programs, order: asc(programs.sortOrder), search: [programs.title, programs.location] },
  stories: { table: stories, order: desc(stories.createdAt), search: [stories.title, stories.category, stories.author] },
  gallery: { table: workGallery, order: asc(workGallery.sortOrder), search: [workGallery.title, workGallery.location] },
  newsletter: { table: subscribers, order: desc(subscribers.createdAt), search: [subscribers.email, subscribers.firstName, subscribers.lastName, subscribers.state] },
  "impact-stats": { table: impactStats, order: asc(impactStats.sortOrder), search: [impactStats.label, impactStats.value] },
};

const sortableFields = {
  donations: { amount: donations.amount, status: donations.status, createdAt: donations.createdAt, donorEmail: donations.donorEmail },
  registrations: { fullName: sql`${membershipRegistrations.registration}->>'fullName'`, communityTown: sql`${membershipRegistrations.registration}->>'communityTown'`, createdAt: membershipRegistrations.createdAt, id: membershipRegistrations.id },
  supporters: { name: supporters.name, role: supporters.role, active: supporters.active, sortOrder: supporters.sortOrder },
  programmes: { title: programs.title, location: programs.location, active: programs.active, sortOrder: programs.sortOrder },
  stories: { title: stories.title, category: stories.category, author: stories.author, createdAt: stories.createdAt },
  gallery: { title: workGallery.title, location: workGallery.location, active: workGallery.active, sortOrder: workGallery.sortOrder },
  newsletter: { email: subscribers.email, createdAt: subscribers.createdAt },
  "impact-stats": { label: impactStats.label, value: impactStats.value, active: impactStats.active, sortOrder: impactStats.sortOrder },
};

function optionalDate(value, end = false) {
  if (!value) return null;
  const date = new Date(`${value}${end ? "T23:59:59.999Z" : "T00:00:00.000Z"}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const params = new URL(request.url).searchParams;
  const section = params.get("section");
  const config = sections[section];
  if (!config) return NextResponse.json({ error: "Unknown data section." }, { status: 400 });

  const page = Math.max(1, Math.min(100000, Number.parseInt(params.get("page") || "1", 10) || 1));
  const pageSize = 20;
  const search = (params.get("q") || "").trim().slice(0, 100);
  const requestedSort = params.get("sort");
  const sortColumn = sortableFields[section]?.[requestedSort];
  const order = sortColumn ? (params.get("direction") === "asc" ? asc(sortColumn) : desc(sortColumn)) : config.order;
  const conditions = [];

  if (search && config.search?.length) {
    conditions.push(or(...config.search.map((column) => ilike(column, `%${search}%`))));
  } else if (search && section === "registrations") {
    conditions.push(sql`(${membershipRegistrations.registration}->>'fullName' ILIKE ${`%${search}%`} OR ${membershipRegistrations.registration}->>'communityTown' ILIKE ${`%${search}%`} OR ${membershipRegistrations.registration}->>'emailAddress' ILIKE ${`%${search}%`})`);
  }

  if (section === "donations") {
    const status = params.get("status");
    const from = optionalDate(params.get("from"));
    const to = optionalDate(params.get("to"), true);
    const minAmount = Number(params.get("minAmount"));
    const maxAmount = Number(params.get("maxAmount"));
    if (status && ["initialized", "success", "failed", "cancelled"].includes(status)) conditions.push(eq(donations.status, status));
    if (from) conditions.push(gte(donations.createdAt, from));
    if (to) conditions.push(lte(donations.createdAt, to));
    if (params.has("minAmount") && Number.isFinite(minAmount)) conditions.push(gte(donations.amount, minAmount));
    if (params.has("maxAmount") && Number.isFinite(maxAmount)) conditions.push(lte(donations.amount, maxAmount));
  }

  if (["programmes", "supporters", "gallery", "impact-stats"].includes(section)) {
    const active = params.get("active");
    if (active === "true" || active === "false") conditions.push(eq(config.table.active, active === "true"));
  }

  try {
    const where = conditions.length ? and(...conditions) : undefined;
    const [rows, counts] = await Promise.all([
      db.select().from(config.table).where(where).orderBy(order).limit(pageSize).offset((page - 1) * pageSize),
      db.select({ value: sql`count(*)` }).from(config.table).where(where),
    ]);
    return NextResponse.json({
      rows,
      page,
      pageSize,
      total: Number(counts[0]?.value || 0),
      pages: Math.max(1, Math.ceil(Number(counts[0]?.value || 0) / pageSize)),
    });
  } catch (error) {
    console.error(`Admin ${section} query failed:`, error);
    return NextResponse.json({ error: "Unable to load this data." }, { status: 500 });
  }
}