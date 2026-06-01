import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verified AI Cast | Official AI Appearance Infrastructure",
  description:
    "Actor-first review, approval, and public certification for official AI screen appearances.",
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
