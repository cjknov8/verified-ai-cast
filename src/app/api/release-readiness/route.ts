import { NextResponse } from "next/server";
import { getLaunchReadiness } from "@/lib/launch-readiness";

export function GET() {
  const readiness = getLaunchReadiness();

  return NextResponse.json(readiness, {
    status: readiness.launchReady ? 200 : 503,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
