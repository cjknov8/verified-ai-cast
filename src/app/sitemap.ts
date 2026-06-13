import type { MetadataRoute } from "next";
import { certificates } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://verified-ai-cast.vercel.app";
  const publicRoutes = ["", "/ko", "/verify", "/trust", "/privacy", "/terms"];

  return [
    ...publicRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...certificates.flatMap((certificate) => [
      {
        url: `${baseUrl}/certificates/${certificate.id}`,
        lastModified: new Date(certificate.issuedAt),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
      {
        url: `${baseUrl}/ko/certificates/${certificate.id}`,
        lastModified: new Date(certificate.issuedAt),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ]),
  ];
}
