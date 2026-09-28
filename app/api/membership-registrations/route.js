import { NextResponse } from "next/server";
import { db } from "../../../lib/db/index";
import { membershipRegistrations } from "../../../lib/db/schema";

export async function POST(request) {
  try {
    const payload = await request.json();
    const registration = payload?.registration;

    if (!registration || typeof registration !== "object" || Array.isArray(registration)) {
      return NextResponse.json({ error: "Registration details are required." }, { status: 400 });
    }

    if (registration.declarationConsent !== "confirmed") {
      return NextResponse.json({ error: "Please confirm the declaration before submitting." }, { status: 400 });
    }

    const email = registration.emailAddress;
    if (email && (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (JSON.stringify(registration).length > 30000) {
      return NextResponse.json({ error: "Registration details are too large." }, { status: 413 });
    }

    await db.insert(membershipRegistrations).values({ registration });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Membership registration failed:", error);
    return NextResponse.json(
      { error: "Unable to submit your registration right now. Please try again later." },
      { status: 500 },
    );
  }
}