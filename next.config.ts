import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const baseScriptPolicy = "script-src 'self' 'unsafe-inline'";
const connectSources = [
  "'self'",
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.R2_ACCOUNT_ID
    ? `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`
    : undefined,
]
  .filter(Boolean)
  .join(" ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            key: "Content-Security-Policy",
            value:
              `default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; ${baseScriptPolicy}; font-src 'self' data:; connect-src ${connectSources}; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`,
          },
        ],
      },
      {
        source: "/(operations|agency|pricing-model|settlements|infrastructure|login|projects/:path*|reviews/:path*|talents/:path*)",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
    ];
  },
};

export default function config(phase: string): NextConfig {
  const scriptPolicy =
    phase === PHASE_DEVELOPMENT_SERVER
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
      : "script-src 'self' 'unsafe-inline'";

  return {
    ...nextConfig,
    async headers() {
      const configuredHeaders = await nextConfig.headers?.();

      return (configuredHeaders ?? []).map((rule) => ({
        ...rule,
        headers: rule.headers.map((header) =>
          header.key === "Content-Security-Policy"
            ? {
                ...header,
                value: header.value.replace(
                  /script-src 'self' 'unsafe-inline'(?: 'unsafe-eval')?/,
                  scriptPolicy,
                ),
              }
            : header,
        ),
      }));
    },
  };
}
