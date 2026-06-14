export function GET() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  return new Response(
    [
      "Contact: mailto:security@verified-ai-cast.com",
      "Contact: mailto:trust@verified-ai-cast.com",
      `Expires: ${expires.toISOString()}`,
      "Preferred-Languages: en, ko",
      "Policy: https://verified-ai-cast.vercel.app/trust",
      "Canonical: https://verified-ai-cast.vercel.app/.well-known/security.txt",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=86400",
      },
    },
  );
}
