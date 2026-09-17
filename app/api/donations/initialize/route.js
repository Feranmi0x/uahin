import { NextResponse } from "next/server";
import { createDonation } from "../../../../lib/db/queries/donations";
import { PAYSTACK_CURRENCY, getPaystackSecretKey } from "../../../../lib/paystack";

const PAYSTACK_URL = "https://api.paystack.co/transaction/initialize";

function clean(value) {
  return String(value || "").trim();
}

function getCallbackOrigin(request) {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const protocol = forwardedProto || url.protocol.replace(":", "");
  const host = forwardedHost || url.host;
  return `${protocol}://${host}`;
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const amount = Math.round(Number(payload.amount));
    const firstName = clean(payload.firstName);
    const lastName = clean(payload.lastName);
    const email = clean(payload.email).toLowerCase();
    const phone = clean(payload.phone);
    const frequency = payload.frequency === "monthly" ? "monthly" : "once";
    const paystackSecretKey = getPaystackSecretKey();

    if (!Number.isInteger(amount) || amount < 100) {
      return NextResponse.json({ error: "Enter a valid donation of at least ₦100." }, { status: 400 });
    }
    if (!firstName || !lastName || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Enter your first name, last name, and a valid email." }, { status: 400 });
    }
    if (!paystackSecretKey) {
      return NextResponse.json({ error: "Paystack is not configured yet. Add PAYSTACK_SECRET_KEY to your environment." }, { status: 503 });
    }

    const reference = `nourish-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
    const callbackUrl = `${getCallbackOrigin(request)}/?donation=verify&reference=${encodeURIComponent(reference)}`;

    const response = await fetch(PAYSTACK_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amount * 100,
        currency: PAYSTACK_CURRENCY,
        reference,
        callback_url: callbackUrl,
        metadata: { firstName, lastName, phone: phone || null, frequency },
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.status) {
      return NextResponse.json({ error: result.message || "Unable to start payment." }, { status: 502 });
    }

    await createDonation({
      reference,
      amount,
      currency: PAYSTACK_CURRENCY,
      frequency,
      donorFirstName: firstName,
      donorLastName: lastName,
      donorEmail: email,
      donorPhone: phone || null,
      status: "initialized",
    });

    return NextResponse.json({ authorizationUrl: result.data.authorization_url, reference });
  } catch (error) {
    console.error("Donation initialization failed:", error);
    return NextResponse.json({ error: "Unable to start your donation right now." }, { status: 500 });
  }
}
