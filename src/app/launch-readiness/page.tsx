import type { Metadata } from "next";
import Link from "next/link";
import { LanguageSwitch } from "@/components/language-switch";
import { brand } from "@/lib/brand";
import { getLaunchReadiness } from "@/lib/launch-readiness";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Launch Readiness",
  robots: { index: false, follow: false },
};

export default function LaunchReadinessPage() {
  const readiness = getLaunchReadiness();

  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.16em]">{brand.name}</Link>
          <div className="flex items-center gap-3">
            <span className={`border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${readiness.launchReady ? "border-[#769584] bg-[#243a34] text-[#c8ddcf]" : "border-[#b79a58] bg-[#423a22] text-[#f1d898]"}`}>
              {readiness.launchReady ? "Launch ready" : "Launch blocked"}
            </span>
            <LanguageSwitch locale="en" />
          </div>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">Release control</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-tight sm:text-7xl">
          {readiness.readyCount} of {readiness.requiredCount} commercial launch gates are ready.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/60">
          Live certificates, payments, and production onboarding must remain disabled until every required gate is satisfied.
        </p>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {readiness.gates.map((gate) => (
            <article key={gate.id} className="border border-white/12 bg-[#182321] p-5">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-semibold">{gate.label}</h2>
                <span className={`border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${gate.ready ? "border-[#769584] text-[#c8ddcf]" : "border-[#a9615f] text-[#f2c2bd]"}`}>
                  {gate.ready ? "Ready" : "Blocked"}
                </span>
              </div>
              <p className="mt-4 text-sm leading-6 text-white/50">{gate.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
