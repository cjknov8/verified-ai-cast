export type LaunchGate = {
  id: string;
  label: string;
  ready: boolean;
  required: boolean;
  detail: string;
};

export function getLaunchReadiness() {
  const launchMarket = (process.env.LAUNCH_MARKET ?? "KR").toUpperCase();
  const koreaPaymentsReady =
    process.env.PAYMENTS_KR_ENABLED === "true" &&
    Boolean(
      process.env.NEXT_PUBLIC_PORTONE_STORE_ID &&
        process.env.PORTONE_API_SECRET &&
        process.env.PORTONE_TOSS_CHANNEL_KEY,
    );
  const globalPaymentsReady =
    process.env.PAYMENTS_GLOBAL_ENABLED === "true" &&
    Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);
  const paymentsReady =
    launchMarket === "DUAL"
      ? koreaPaymentsReady && globalPaymentsReady
      : launchMarket === "GLOBAL"
        ? globalPaymentsReady
        : koreaPaymentsReady;

  const gates: LaunchGate[] = [
    {
      id: "database",
      label: "Production database",
      ready: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY),
      required: true,
      detail: "Supabase URL and server credential must be configured.",
    },
    {
      id: "auth",
      label: "Authentication and role enforcement",
      ready:
        process.env.AUTH_ENFORCEMENT_ENABLED === "true" &&
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
      required: true,
      detail: "Google OAuth sessions and seller, buyer, reviewer, and operator access must be enforced server-side.",
    },
    {
      id: "storage",
      label: "Private evidence storage",
      ready:
        process.env.PRIVATE_STORAGE_ENABLED === "true" &&
        Boolean(
          process.env.R2_ACCOUNT_ID &&
            process.env.R2_ACCESS_KEY_ID &&
            process.env.R2_SECRET_ACCESS_KEY &&
            process.env.R2_BUCKET_NAME,
        ),
      required: true,
      detail: "Cloudflare R2 must remain private with short-lived signed upload access and ownership metadata.",
    },
    {
      id: "signing",
      label: "Certificate signing",
      ready: Boolean(process.env.CERTIFICATE_SIGNING_KEY_ID && process.env.CERTIFICATE_ISSUER_ID),
      required: true,
      detail: "Production certificates require an isolated signing key and named issuer.",
    },
    {
      id: "payments",
      label: "Payment and payout controls",
      ready: paymentsReady,
      required: true,
      detail: `${launchMarket} launch requires configured checkout, refunds, payout holds, and webhook reconciliation.`,
    },
    {
      id: "legal",
      label: "Counsel-approved launch documents",
      ready: process.env.LEGAL_LAUNCH_APPROVED === "true",
      required: true,
      detail: "Terms, privacy, certificate policy, refund, dispute, and jurisdiction language need approval.",
    },
    {
      id: "operations",
      label: "Trust and safety operations",
      ready: process.env.TRUST_OPERATIONS_ENABLED === "true",
      required: true,
      detail: "Named owners and response procedures are required for fraud, revocation, and appeals.",
    },
    {
      id: "monitoring",
      label: "Monitoring and incident response",
      ready: Boolean(process.env.ERROR_MONITORING_DSN) && process.env.INCIDENT_RESPONSE_ENABLED === "true",
      required: true,
      detail: "Errors, security events, availability, and certificate status need operational monitoring.",
    },
  ];

  const required = gates.filter((gate) => gate.required);
  const readyCount = required.filter((gate) => gate.ready).length;
  const launchReady = readyCount === required.length;

  return {
    launchReady,
    mode: launchReady ? "production" : "demonstration",
    readyCount,
    requiredCount: required.length,
    gates,
  };
}
