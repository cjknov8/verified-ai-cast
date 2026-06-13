import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Authenticity Standard",
  description: "The evidence layers required to describe a premium digital rights asset as authentic and officially authorized.",
};

const layers = [
  ["01", "Seller identity", "Who is offering the asset?", "Government or business identity, verified domain, sanctions and fraud checks."],
  ["02", "Legal authority", "Can this seller grant these rights?", "Representation, ownership, delegation, territory, term, and sublicensing scope."],
  ["03", "Asset provenance", "Where did this exact asset come from?", "Creator, source files, issuance history, edition, model and production records."],
  ["04", "Content integrity", "Is this the reviewed version?", "File hash, signed manifest, durable fingerprint, derivative relationship, chain of custody."],
  ["05", "Transaction integrity", "What did buyer and seller agree to?", "Frozen terms, signer authentication, timestamp, payment state, amendments, cancellation."],
  ["06", "Distribution binding", "Where may the asset be used?", "Domains, accounts, platform IDs, URLs, territories, term, disclosures, monitoring."],
  ["07", "Ongoing status", "Is reliance still safe now?", "Active, suspended, revoked, expired, disputed, superseded, and correction history."],
];

export default function AuthenticityPage() {
  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="text-xs font-semibold uppercase tracking-[0.16em]">Verified AI Cast</Link>
          <Link href="/scenarios" className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/70">Open UX lab</Link>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">Authenticity profile v0.1</p>
        <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[1.05] sm:text-7xl">Authentic is not one check. It is a chain of evidence.</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/62">
          A premium asset may be genuine but offered by an unauthorized seller, or correctly licensed but replaced with a different file. The registry must show each claim separately.
        </p>
      </section>
      <section className="border-y border-white/10 bg-[#182321]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          {layers.map(([index, title, question, evidence]) => (
            <article key={index} className="border-b border-white/10 p-5 sm:p-8 lg:border-r">
              <div className="flex items-center justify-between gap-4">
                <span className="font-mono text-xs text-[#d4b477]">{index}</span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-white/35">Independent claim</span>
              </div>
              <h2 className="mt-9 font-serif text-3xl">{title}</h2>
              <p className="mt-3 text-sm font-semibold text-[#c6dfd4]">{question}</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/52">{evidence}</p>
            </article>
          ))}
          <article className="flex flex-col justify-between bg-[#d4b477] p-5 text-[#111817] sm:p-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em]">Premium rule</p>
              <h2 className="mt-8 font-serif text-4xl">Never sell the badge before proving the chain.</h2>
            </div>
            <p className="mt-10 text-sm leading-6 opacity-70">High-value transactions require dual approval, evidence retention, clear buyer remedies, and a visible dispute path.</p>
          </article>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="font-serif text-4xl sm:text-5xl">What must be added before commercial launch</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Risk-based seller and buyer onboarding",
              "Scoped authority grants with expiry",
              "Asset edition and derivative graph",
              "Hashing, manifests, and fingerprinting",
              "Escrow and conditional payment release",
              "Buyer protection and financial remedy",
              "Ownership and license transfer history",
              "Brand-controlled issuer profiles",
              "Inspection and expert review records",
              "Disputes, appeals, and correction workflow",
              "Revocation webhooks and monitoring",
              "Independent controls and transparency reports",
            ].map((item) => <div key={item} className="border border-white/12 bg-white/5 p-4 text-sm text-white/68">{item}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
