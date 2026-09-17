import { NextResponse } from "next/server";
import {
  createSubscriber,
  getSubscriberByEmail,
} from "../../../lib/db/queries/subscribers";

export async function POST(request) {
  try {
    const payload = await request.json();
    const firstName = String(payload.firstName || "").trim();
    const lastName = String(payload.lastName || "").trim();
    const email = String(payload.email || "").trim();
    const phone = String(payload.phone || "").trim();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const existing = await getSubscriberByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "This email is already subscribed." },
        { status: 409 },
      );
    }

    const subscriber = await createSubscriber({
      firstName: firstName || null,
      lastName: lastName || null,
      email,
      phone: phone || null,
    });

    return NextResponse.json({ ok: true, subscriber }, { status: 201 });
  } catch (error) {
    console.error("Newsletter signup failed:", error);
    return NextResponse.json(
      { error: "Unable to complete signup right now." },
      { status: 500 },
    );
  }
}
