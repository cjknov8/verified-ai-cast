import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

const protectedPrefixes = [
  "/operations",
  "/agency",
  "/pricing-model",
  "/settlements",
  "/brand-assets",
  "/projects",
  "/reviews",
  "/talents",
  "/infrastructure",
  "/business-plan",
];

export async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const requiresAuthentication = protectedPrefixes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (
    process.env.AUTH_ENFORCEMENT_ENABLED === "true" &&
    requiresAuthentication &&
    !user
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
