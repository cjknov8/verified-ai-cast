import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://verified-ai-cast.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/ko", "/verify", "/certificates/"],
      disallow: ["/operations", "/agency", "/projects", "/reviews", "/settlements", "/talents"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
