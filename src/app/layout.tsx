import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Verified AI Cast",
  description:
    "Actor-first AI appearance approval and certification platform MVP.",
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
