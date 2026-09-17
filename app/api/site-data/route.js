import { NextResponse } from "next/server";
import { asc, desc } from "drizzle-orm";
import { db } from "../../../lib/db/index";
import {
  impactStats,
  programs,
  stories,
  supporters,
  workGallery,
} from "../../../lib/db/schema";

const navItems = [
  { label: "Our Work", to: "/our-work" },
  { label: "Impact", to: "/impact" },
  { label: "Stories", to: "/stories" },
  { label: "About", to: "/about" },
];

const pageCopy = {
  "/our-work": {
    eyebrow: "Our work",
    title: "Practical support, built with communities.",
    description:
      "We pair immediate food relief with long-term pathways to resilience, always led by the people closest to the challenge.",
    image: "/edo.jpg",
  },
  "/impact": {
    eyebrow: "Our impact",
    title: "Progress you can see, measure and trust.",
    description:
      "Every intervention is shaped with local partners and tracked against outcomes that matter to families.",
    image: "/ekitifayemi.jpg",
  },
  "/about": {
    eyebrow: "About UAHIN",
    title: "A country where every person can thrive.",
    description:
      "Upliftment Against Hunger Initiative NG (UAHIN) is a Nigerian-led humanitarian organization working across food security, community response, and local resilience.",
    image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?auto=format&fit=crop&w=1200&q=85",
  },
};

const values = [
  {
    title: "Dignity first",
    text: "People are partners in our work, never problems to be solved.",
  },
  {
    title: "Local leadership",
    text: "The best answers are already present in the communities we serve.",
  },
  {
    title: "Open by default",
    text: "We share what we learn, what works and where every contribution goes.",
  },
];

export async function GET() {
  try {
    const [programRows, impactRows, storyRows, supporterRows, galleryRows] = await Promise.all([
      db
        .select()
        .from(programs)
        .where(programs.active)
        .orderBy(asc(programs.sortOrder)),
      db
        .select()
        .from(impactStats)
        .where(impactStats.active)
        .orderBy(asc(impactStats.sortOrder)),
      db.select().from(stories).orderBy(desc(stories.createdAt)),
      db
        .select()
        .from(supporters)
        .where(supporters.active)
        .orderBy(asc(supporters.sortOrder)),
      db
        .select()
        .from(workGallery)
        .where(workGallery.active)
        .orderBy(asc(workGallery.sortOrder)),
    ]);

    const serializedPrograms = programRows.map((row) => ({
      ...row,
      active: undefined,
      createdAt: undefined,
    }));

    const serializedStories = storyRows.map((row) => {
      const storyText = row.content || row.body || "";
      return {
        ...row,
        createdAt: undefined,
        updatedAt: undefined,
        content: storyText,
        body: typeof storyText === "string" ? storyText.split(/\n\s*\n/) : [],
      };
    });

    const serializedImpactStats = impactRows.map((row) => ({
      ...row,
      active: undefined,
      createdAt: undefined,
    }));

    const serializedSupporters = supporterRows.map((row) => [
      row.name,
      row.description,
      row.role,
      row.image,
    ]);

    const serializedGallery = galleryRows.map((row) => ({
      ...row,
      active: undefined,
      createdAt: undefined,
    }));

    return NextResponse.json({
      navItems,
      programs: serializedPrograms,
      articles: serializedStories,
      impactStats: serializedImpactStats,
      pageCopy,
      values,
      supporters: serializedSupporters,
      gallery: serializedGallery,
    });
  } catch (error) {
    console.error("Failed to load site data:", error);
    return NextResponse.json(
      {
        navItems,
        programs: [],
        articles: [],
        impactStats: [],
        pageCopy,
        values,
        supporters: [],
        gallery: [],
      },
      { status: 500 },
    );
  }
}
