import { eq, desc, sql } from "drizzle-orm";
import { db } from "../index";
import { stories } from "../schema";

export async function getStories() {
  return db.select().from(stories).orderBy(desc(stories.createdAt));
}

export async function getFeaturedStories() {
  return db
    .select()
    .from(stories)
    .where(eq(stories.featured, true))
    .orderBy(desc(stories.createdAt));
}

export async function getStoryBySlug(slug) {
  const rows = await db.select().from(stories).where(eq(stories.slug, slug));
  const story = rows[0] || null;
  if (!story) return null;

  return {
    ...story,
    content: story.content || story.body || "",
    body: (story.content || story.body || "").split(/\n\s*\n/),
  };
}

export async function createStory(data) {
  const result = await db.insert(stories).values(data).returning();
  return result[0];
}
