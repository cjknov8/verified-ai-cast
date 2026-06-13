import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "https://verified-ai-cast.vercel.app"),
  title: {
    default: "Verified AI Cast | Official AI Appearance Infrastructure",
    template: "%s | Verified AI Cast",
  },
  description:
    "Actor-first review, approval, and public certification for official AI screen appearances.",
  applicationName: "Verified AI Cast",
  openGraph: {
    type: "website",
    title: "Verified AI Cast",
    description: "Official review, approval, and public records for AI screen appearances.",
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
