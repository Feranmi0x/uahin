export const PAYSTACK_CURRENCY = "NGN";

export function getPaystackSecretKey() {
  return (
    process.env.PAYSTACK_SECRET_KEY ||
    process.env.PAYSTACK_SECRET ||
    process.env.PAYSTACK_LIVE_SECRET_KEY ||
    process.env.PAYSTACK_TEST_SECRET_KEY ||
    ""
  ).trim();
}

export function getPaystackPublicKey() {
  return (
    process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY ||
    process.env.PAYSTACK_PUBLIC_KEY ||
    ""
  ).trim();
}

export function hasPaystackConfig() {
  return Boolean(getPaystackSecretKey());
}
