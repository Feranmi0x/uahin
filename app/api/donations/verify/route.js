import { NextResponse } from "next/server";
import { getDonationByReference, updateDonationByReference } from "../../../../lib/db/queries/donations";
import { PAYSTACK_CURRENCY, getPaystackSecretKey } from "../../../../lib/paystack";

export async function GET(request) {
  const reference = new URL(request.url).searchParams.get("reference");
  const paystackSecretKey = getPaystackSecretKey();

  if (!reference || !paystackSecretKey) {
    return NextResponse.json({ error: "A valid transaction reference is required." }, { status: 400 });
  }

  try {
    const donation = await getDonationByReference(reference);
    if (!donation) return NextResponse.json({ error: "Donation not found." }, { status: 404 });

    const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${paystackSecretKey}` },
    });
    const result = await response.json();
    const paid = response.ok && result.status && result.data?.status === "success" && result.data.currency === PAYSTACK_CURRENCY && Number(result.data.amount) === Number(donation.amount) * 100;
    const updated = await updateDonationByReference(reference, {
      status: paid ? "success" : result.data?.status === "abandoned" ? "cancelled" : "failed",
      gatewayResponse: JSON.stringify({ status: result.data?.status, currency: result.data?.currency, amount: result.data?.amount, paidAt: result.data?.paid_at }),
    });
    return NextResponse.json({ ok: paid, status: updated.status });
  } catch (error) {
    console.error("Donation verification failed:", error);
    return NextResponse.json({ error: "Unable to verify this payment right now." }, { status: 500 });
  }
}
