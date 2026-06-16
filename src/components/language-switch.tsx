"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizedPath, type Locale } from "@/lib/brand";

export function LanguageSwitch({ locale, tone = "dark" }: { locale: Locale; tone?: "dark" | "light" }) {
  const pathname = usePathname();
  const base = tone === "dark" ? "border-white/20 bg-black/15" : "border-[#c9beb0] bg-white/70";
  const inactive = tone === "dark" ? "text-white/65 hover:bg-white/10 hover:text-white" : "text-[#68736f] hover:bg-[#eee9e1] hover:text-[#17211f]";

  return (
    <div className={`flex border p-0.5 text-xs font-semibold uppercase tracking-[0.1em] ${base}`} aria-label="Language selector">
      {(["en", "ko"] as const).map((option) => {
        const active = option === locale;
        return (
          <Link
            key={option}
            href={localizedPath(pathname, option)}
            className={`px-2.5 py-2 ${active ? "bg-[#d4b477] text-[#111817]" : inactive}`}
            aria-current={active ? "page" : undefined}
          >
            {option === "ko" ? "한국어" : "EN"}
          </Link>
        );
      })}
    </div>
  );
}
