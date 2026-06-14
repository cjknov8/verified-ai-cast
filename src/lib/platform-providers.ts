export type LaunchMarket = "KR" | "GLOBAL" | "DUAL";

function hasAll(...values: Array<string | undefined>) {
  return values.every(Boolean);
}

export function getPlatformProviders() {
  const launchMarket = (process.env.LAUNCH_MARKET ?? "KR").toUpperCase() as LaunchMarket;
  const supabaseConfigured = hasAll(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
  const r2Configured = hasAll(
    process.env.R2_ACCOUNT_ID,
    process.env.R2_ACCESS_KEY_ID,
    process.env.R2_SECRET_ACCESS_KEY,
    process.env.R2_BUCKET_NAME,
  );
  const koreaPaymentsConfigured =
    process.env.PAYMENTS_KR_ENABLED === "true" &&
    hasAll(
      process.env.NEXT_PUBLIC_PORTONE_STORE_ID,
      process.env.PORTONE_API_SECRET,
      process.env.PORTONE_TOSS_CHANNEL_KEY,
    );
  const globalPaymentsConfigured =
    process.env.PAYMENTS_GLOBAL_ENABLED === "true" &&
    hasAll(process.env.STRIPE_SECRET_KEY, process.env.STRIPE_WEBHOOK_SECRET);

  const paymentReady =
    launchMarket === "DUAL"
      ? koreaPaymentsConfigured && globalPaymentsConfigured
      : launchMarket === "GLOBAL"
        ? globalPaymentsConfigured
        : koreaPaymentsConfigured;

  return {
    launchMarket,
    auth: {
      provider: "Supabase Auth + Google OAuth",
      configured: supabaseConfigured,
      mode: "Google-only pilot",
    },
    storage: {
      provider: "Cloudflare R2 private bucket",
      configured: r2Configured,
      mode: "Presigned upload; no public object URL",
    },
    payments: {
      configured: paymentReady,
      korea: {
        provider: "PortOne V2 + Toss Payments",
        configured: koreaPaymentsConfigured,
      },
      global: {
        provider: "Stripe Checkout",
        configured: globalPaymentsConfigured,
        note: "Requires an operating entity in a Stripe-supported country.",
      },
    },
  };
}
