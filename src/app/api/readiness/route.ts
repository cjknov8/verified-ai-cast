import { NextResponse } from "next/server";

export function GET() {
  const supabaseBrowser = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const supabaseServer = Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const stripeTestMode = Boolean(process.env.STRIPE_SECRET_KEY && process.env.STRIPE_WEBHOOK_SECRET);

  return NextResponse.json({
    product: "verified-ai-cast",
    mode: supabaseBrowser && supabaseServer ? "backend-configuration-detected" : "frontend-demo",
    integrations: {
      supabaseBrowser,
      supabaseServer,
      stripeTestMode,
    },
    billing: {
      enabled: false,
      note: "No live charge path is enabled in the current application.",
    },
  });
}
