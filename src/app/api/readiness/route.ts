import { NextResponse } from "next/server";
import { getLaunchReadiness } from "@/lib/launch-readiness";

export function GET() {
  const supabaseBrowser = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabaseServer = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const stripeTestMode = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);

  const readiness = getLaunchReadiness();

  return NextResponse.json({
    product: "verified-ai-cast",
    mode: readiness.mode,
    launchReady: readiness.launchReady,
    releaseGates: {
      ready: readiness.readyCount,
      required: readiness.requiredCount,
    },
    integrations: {
      supabaseBrowser,
      supabaseServer,
      stripeTestMode,
    },
    billing: {
      enabled: readiness.launchReady && stripeTestMode,
      note: stripeTestMode ? "Payment credentials detected; launch gates still apply." : "No live charge path is enabled.",
    },
  });
}
