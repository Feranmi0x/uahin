import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { authOptions } from "../../../../lib/admin-auth";
import { db } from "../../../../lib/db/index";
import { impactStats, programs, stories, subscribers, supporters, workGallery } from "../../../../lib/db/schema";

export const dynamic = "force-dynamic";

const resourceMap = {
  supporters: { table: supporters, fields: { name: "text", description: "text", role: "text", image: "text", active: "boolean", sortOrder: "integer" }, required: ["name", "description", "role", "image"] },
  programmes: { table: programs, fields: { title: "text", location: "text", stat: "text", image: "text", description: "text", active: "boolean", sortOrder: "integer" }, required: ["title", "location", "stat", "image", "description"] },
  stories: { table: stories, fields: { slug: "text", category: "text", title: "text", excerpt: "text", image: "text", author: "text", date: "text", body: "text", content: "text", featured: "boolean" }, required: ["category", "title", "excerpt", "image", "author", "date", "content"] },
  gallery: { table: workGallery, fields: { title: "text", description: "text", image: "text", location: "text", active: "boolean", sortOrder: "integer" }, required: ["title", "description", "image"] },
  "impact-stats": { table: impactStats, fields: { value: "text", label: "text", active: "boolean", sortOrder: "integer" }, required: ["value", "label"] },
  newsletter: { table: subscribers, fields: {}, required: [], deleteOnly: true },
};

async function authorize() {
  const session = await getServerSession(authOptions);
  return session?.user?.email || null;
}

async function getConfig(context) {
  const { resource } = await context.params;
  return resourceMap[resource];
}

function validateData(config, body, partial = false) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "A record is required." };
  const data = {};
  for (const [field, type] of Object.entries(config.fields)) {
    if (!(field in body)) continue;
    const value = body[field];
    if (type === "boolean") {
      if (typeof value !== "boolean") return { error: `${field} must be true or false.` };
      data[field] = value;
    } else if (type === "integer") {
      const number = Number(value);
      if (!Number.isInteger(number) || number < 0) return { error: `${field} must be a non-negative whole number.` };
      data[field] = number;
    } else if (value === null && ["body", "location"].includes(field)) {
      data[field] = null;
    } else if (typeof value === "string" && value.trim().length <= 20000) {
      data[field] = value.trim();
    } else {
      return { error: `${field} must be text no longer than 20,000 characters.` };
    }
  }
  if (!partial) {
    for (const field of config.required) {
      if (!data[field]) return { error: `${field} is required.` };
    }
  }
  if ("title" in data && "slug" in config.fields && !data.slug) {
    data.slug = data.title.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  if ("content" in data && !("body" in data)) data.body = data.content;
  return { data };
}

export async function POST(request, context) {
  if (!(await authorize())) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const config = await getConfig(context);
  if (!config || config.deleteOnly) return NextResponse.json({ error: "This resource cannot be created here." }, { status: 404 });
  try {
    const { data, error } = validateData(config, await request.json());
    if (error) return NextResponse.json({ error }, { status: 400 });
    const [record] = await db.insert(config.table).values(data).returning();
    return NextResponse.json({ record }, { status: 201 });
  } catch (error) {
    console.error("Admin create failed:", error);
    return NextResponse.json({ error: "Unable to create this record." }, { status: 500 });
  }
}

export async function PATCH(request, context) {
  if (!(await authorize())) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const config = await getConfig(context);
  if (!config || config.deleteOnly) return NextResponse.json({ error: "This resource cannot be edited here." }, { status: 404 });
  try {
    const body = await request.json();
    const id = Number(body.id);
    if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "A valid record ID is required." }, { status: 400 });
    const { data, error } = validateData(config, body, true);
    if (error) return NextResponse.json({ error }, { status: 400 });
    delete data.id;
    if (!Object.keys(data).length) return NextResponse.json({ error: "No editable fields were supplied." }, { status: 400 });
    if (config.table === stories) data.updatedAt = new Date();
    const [record] = await db.update(config.table).set(data).where(eq(config.table.id, id)).returning();
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ record });
  } catch (error) {
    console.error("Admin update failed:", error);
    return NextResponse.json({ error: "Unable to update this record." }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  if (!(await authorize())) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const config = await getConfig(context);
  if (!config) return NextResponse.json({ error: "This resource cannot be deleted here." }, { status: 404 });
  try {
    const { id: rawId } = await request.json();
    const id = Number(rawId);
    if (!Number.isInteger(id) || id < 1) return NextResponse.json({ error: "A valid record ID is required." }, { status: 400 });
    const [record] = await db.delete(config.table).where(eq(config.table.id, id)).returning({ id: config.table.id });
    if (!record) return NextResponse.json({ error: "Record not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Admin delete failed:", error);
    return NextResponse.json({ error: "Unable to delete this record." }, { status: 500 });
  }
}