import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitch } from "@/components/language-switch";
import { TransactionSimulator } from "@/components/transaction-simulator";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Transaction UX Lab",
  description: "Buyer, seller, asset, and registry simulations for verified premium digital rights transactions.",
};

export default function ScenariosPage() {
  return (
    <main className="min-h-screen bg-[#ebe6de] text-[#17211f]">
      <header className="border-b border-white/10 bg-[#111817] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.16em]">{brand.name}</Link>
          <div className="flex items-center gap-4 text-xs uppercase tracking-[0.12em] text-white/60">
            <LanguageSwitch locale="en" />
            <Link href="/authenticity" className="hover:text-white">Authenticity standard</Link>
            <Link href="/verify" className="hover:text-white">Verify</Link>
          </div>
        </div>
      </header>
      <section className="border-b border-[#d2cbc1] bg-[#f4efe7]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8b6234]">Buyer and seller experience lab</p>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <h1 className="font-serif text-5xl leading-tight sm:text-7xl">Trade permission, not ambiguity.</h1>
            <p className="max-w-2xl text-base leading-8 text-[#596561] lg:justify-self-end">
              Three fictional transactions test how a premium rights asset moves from a verified seller to a verified buyer, what each party exchanges, when money moves, and when the registry must stop the deal.
            </p>
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <TransactionSimulator />
      </div>
    </main>
  );
}
