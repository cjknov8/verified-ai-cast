import { NextResponse } from "next/server";
import { getPlatformProviders } from "@/lib/platform-providers";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(getPlatformProviders(), {
    headers: { "Cache-Control": "no-store" },
  });
}
