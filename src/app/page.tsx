import Image from "next/image";
import Link from "next/link";

const trustPoints = [
  ["01", "Review the result", "Actors and agencies review the finished appearance, not an uncontrolled asset library."],
  ["02", "Approve the scope", "Each decision binds a project, release window, usage terms, and publishing URLs."],
  ["03", "Publish with proof", "An active public certificate lets viewers verify where official approval applies."],
];

const certificateFacts = [
  ["Certificate", "cert-2026-0007"],
  ["Appearance", "Mina Park / Luma Seoul"],
  ["Scope", "Teaser, microsite, owned social"],
  ["State", "Active"],
];

export default function Home() {
  return (
    <main className="bg-[#0f1514] text-[#f5f0e7]">
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/10">
        <Image
          src="/images/verified-ai-cast-hero.png"
          alt="A cinematic studio set with a fictional actor in profile"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,10,0.96)_0%,rgba(5,10,10,0.84)_38%,rgba(5,10,10,0.34)_72%,rgba(5,10,10,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,12,0.34)_0%,rgba(8,12,12,0.05)_52%,rgba(8,12,12,0.88)_100%)]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">
              VA
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-white">Verified AI Cast</span>
          </Link>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.14em] text-white/70 md:flex">
            <a href="#framework" className="hover:text-white">Framework</a>
            <a href="#certificate" className="hover:text-white">Certificate</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <Link href="/operations" className="hover:text-white">Console</Link>
          </nav>
          <Link
            href="/projects/new"
            className="border border-[#d4b477]/70 bg-[#d4b477]/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1d79f] hover:bg-[#d4b477]/20"
          >
            Start approval
          </Link>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-80px)] max-w-7xl items-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4b477]">
              Official AI appearance infrastructure
            </p>
            <h1 className="font-serif text-5xl leading-[1.02] text-white sm:text-7xl lg:text-[6.5rem]">
              Every likeness deserves a final cut.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              Review AI performances with the people they represent. Issue public,
              revocable certificates for the exact projects and URLs that earned approval.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/projects/new" className="bg-[#d4b477] px-5 py-3 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">
                Submit a project
              </Link>
              <Link href="/certificates/cert-2026-0007" className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                View a certificate
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.14em] text-white/55">
              <span>Actor-first review</span>
              <span>URL-bound certificates</span>
              <span>Revocable approval</span>
            </div>
          </div>
        </div>
      </section>

      <section className="scroll-reveal border-b border-white/10 bg-[#17211f] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">The premise</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
              Control the official claim, not the creative tool.
            </h2>
          </div>
          <div className="max-w-2xl text-base leading-8 text-[#c5cbc5] sm:text-lg">
            <p>
              AI media can be made anywhere. Official approval should remain scarce,
              inspectable, and commercially meaningful.
            </p>
            <p className="mt-5">
              Verified AI Cast creates a rights-holder review layer between a finished
              performance and its public release. Creators gain legitimacy. Actors and
              agencies retain boundaries, visibility, and the ability to revoke.
            </p>
          </div>
        </div>
      </section>

      <section id="framework" className="scroll-reveal bg-[#e9e2d8] py-20 text-[#17211f] sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#875b36]">Approval framework</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">From finished frame to official release.</h2>
            <p className="max-w-xl text-base leading-7 text-[#52605d] lg:justify-self-end">
              A clear sequence for studios, talent teams, and viewers. Every transition
              is designed to become an immutable audit event in Phase 2.
            </p>
          </div>
          <div className="mt-12 grid border-t border-[#b9ada0] md:grid-cols-3">
            {trustPoints.map(([index, title, copy]) => (
              <article key={index} className="border-b border-[#b9ada0] py-7 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <p className="font-mono text-xs text-[#875b36]">{index}</p>
                <h3 className="mt-12 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#5d6865]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="certificate" className="scroll-reveal bg-[#111817] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div className="lg:sticky lg:top-12 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">Public certificate</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-6xl">
              Trust that can be checked at the source.
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/62">
              A certificate belongs to approved work and approved URLs. Copying a link
              to another page does not copy the approval.
            </p>
          </div>
          <div className="border border-white/14 bg-[#182321]">
            <div className="border-b border-white/12 px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#d4b477]">Verified AI Cast / Public record</p>
                <span className="border border-[#7d9c89] bg-[#243a34] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b9d6c6]">
                  Active
                </span>
              </div>
              <h3 className="mt-8 max-w-2xl font-serif text-3xl text-white sm:text-5xl">
                Official AI appearance approval for Luma Seoul Season Teaser
              </h3>
            </div>
            <div className="grid sm:grid-cols-2">
              {certificateFacts.map(([label, value]) => (
                <div key={label} className="border-b border-white/10 px-5 py-5 sm:border-r sm:px-7">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/42">{label}</p>
                  <p className="mt-2 text-sm text-white/85">{value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-6 sm:px-7">
              <p className="text-xs uppercase tracking-[0.14em] text-white/42">Approved publishing URL</p>
              <p className="mt-3 break-all font-mono text-sm text-[#c6dfd4]">https://campaigns.lumaseoul.example/season-teaser</p>
              <Link href="/certificates/cert-2026-0007" className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                Inspect public certificate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-reveal bg-[#d7c9b9] py-20 text-[#17211f] sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#875b36]">Creator access</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">Start with one review.</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#56615e] lg:justify-self-end">
              The first commercial step is intentionally simple: submit one finished
              result, receive a policy review, and move to licensing only after approval.
            </p>
          </div>
          <div className="mt-12 grid border-t border-[#ad9d8c] lg:grid-cols-[1fr_0.62fr]">
            <div className="border-b border-[#ad9d8c] py-7 lg:border-r lg:px-7 lg:first:pl-0">
              <p className="text-xs uppercase tracking-[0.16em] text-[#875b36]">Project review deposit</p>
              <p className="mt-4 font-serif text-6xl">$2,500</p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#596360]">
                Covers policy review, result inspection, and a documented decision.
                License terms are issued separately when the appearance is approved.
              </p>
            </div>
            <div className="py-7 lg:px-7">
              <ul className="space-y-3 text-sm text-[#485451]">
                <li>Finished-result review</li>
                <li>Talent policy comparison</li>
                <li>Revision request support</li>
                <li>Public certificate on approval</li>
              </ul>
              <Link href="/checkout" className="mt-7 inline-flex bg-[#17211f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#24322f]">
                Reserve a review
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0f1514] px-5 py-6 text-xs uppercase tracking-[0.12em] text-white/45 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <p>Verified AI Cast / Official AI appearance infrastructure</p>
          <Link href="/operations" className="text-white/65 hover:text-white">Open operations console</Link>
        </div>
      </footer>
    </main>
  );
}
