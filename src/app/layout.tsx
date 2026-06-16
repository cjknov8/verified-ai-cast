import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://verified-ai-cast.vercel.app"),
  title: {
    default: "Verified Presence | Official Asset Appearance Registry",
    template: "%s | Verified Presence",
  },
  description:
    "Rights-holder review, approval, and public certification for official digital appearances and product placements.",
  applicationName: "Verified Presence",
  openGraph: {
    type: "website",
    title: "Verified Presence",
    description: "Official review, approval, and public records for digital appearances and product placements.",
    images: ["/images/verified-ai-cast-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
