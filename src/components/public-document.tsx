import Link from "next/link";
import { LanguageSwitch } from "@/components/language-switch";
import { brand, type Locale } from "@/lib/brand";

export function PublicDocument({
  eyebrow,
  title,
  updated,
  children,
  locale = "en",
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
  locale?: Locale;
}) {
  return (
    <main className="min-h-screen bg-[#f4efe7] text-[#17211f]">
      <header className="border-b border-[#d8d0c4] bg-[#111817] text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href={locale === "ko" ? "/ko" : "/"} className="text-xs font-semibold uppercase tracking-[0.14em]">{brand.name}</Link>
          <div className="flex items-center gap-3">
            <LanguageSwitch locale={locale} />
            <Link href={locale === "ko" ? "/ko/verify" : "/verify"} className="text-xs uppercase tracking-[0.14em] text-white/60 hover:text-white">{locale === "ko" ? "에셋 인증 확인" : "Verify an asset"}</Link>
          </div>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6234]">{eyebrow}</p>
        <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-[#6c746f]">Last updated: {updated}</p>
        <div className="mt-10 space-y-8 text-[15px] leading-7 text-[#4e5855]">{children}</div>
      </article>
    </main>
  );
}
