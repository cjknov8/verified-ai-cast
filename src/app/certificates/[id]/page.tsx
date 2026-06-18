import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { StatusPill } from "@/components/ui";
import { brand } from "@/lib/brand";
import { findCertificate, findProject, findTalent, isApprovedSourceUrl } from "@/lib/mock-data";

export default async function CertificatePage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ source?: string | string[] }> }) {
  const { id } = await params;
  const { source } = await searchParams;
  const certificate = findCertificate(id);
  if (!certificate) notFound();
  const project = findProject(certificate.projectId);
  if (!project) notFound();
  const talent = findTalent(project.talentId);
  if (!talent) notFound();
  const claimedSourceUrl = Array.isArray(source) ? source[0] : source;
  const sourceMatches = claimedSourceUrl ? isApprovedSourceUrl(certificate, claimedSourceUrl) : null;

  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">{brand.shortName}</span><span className="text-xs font-semibold uppercase tracking-[0.14em]">{brand.name}</span></Link>
          <div className="flex items-center gap-3">
            <Link href="/verify" className="text-xs uppercase tracking-[0.14em] text-white/60 hover:text-white">Verify an asset</Link>
            <LanguageSwitch locale="en" />
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">Public asset certificate</p>
          <StatusPill status={certificate.status} />
        </div>
        <h1 className="mt-8 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">Official asset approval for {project.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/60">This public record identifies the reviewed project, represented rights holder, approval state, and exact publishing URLs covered by the decision.</p>

        <div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Certificate" value={certificate.id} />
          <Fact label="Rights asset" value={talent.name} />
          <Fact label="Issuer" value={talent.agency} />
          <Fact label="Expires" value={certificate.expiresAt} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.74fr]">
          <section className="border border-white/12 bg-[#182321] p-5 sm:p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">Approved scope</p>
            <p className="mt-4 text-base leading-7 text-white/72">{certificate.licenseScope}</p>
            <div className="mt-7 border-t border-white/10 pt-5">
              <p className="text-xs uppercase tracking-[0.14em] text-white/42">Approved publishing URLs</p>
              <div className="mt-3 space-y-3">{certificate.approvedUrls.map((url) => <p key={url} className="break-all border border-white/10 bg-[#111817] p-3 font-mono text-sm text-[#c6dfd4]">{url}</p>)}</div>
            </div>
          </section>
          <section className="border border-white/12 bg-[#182321] p-5 sm:p-7">
            <p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">Verify a source URL</p>
            <p className="mt-3 text-sm leading-6 text-white/58">Paste the page claiming this certificate. A copied link does not approve a different URL.</p>
            <form className="mt-5 space-y-3">
              <input name="source" type="url" defaultValue={claimedSourceUrl} placeholder="https://example.com/published-work" className="w-full border border-white/18 bg-[#111817] px-3 py-3 text-sm text-white placeholder:text-white/28" />
              <button className="bg-[#d4b477] px-4 py-2.5 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">Verify source</button>
            </form>
            <VerificationResult claimedSourceUrl={claimedSourceUrl} sourceMatches={sourceMatches} status={certificate.status} />
            <div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs uppercase tracking-[0.14em] text-white/42">Verification hash</p><p className="mt-2 break-all font-mono text-sm text-[#c6dfd4]">{certificate.verificationHash}</p></div>
          </section>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 border-t border-white/10 pt-6 text-sm text-white/55">
          <Link href="/trust" className="hover:text-white">What this record proves</Link>
          <a href={`mailto:trust@verified-ai-cast.com?subject=Report%20${certificate.id}`} className="hover:text-white">Report misuse</a>
        </div>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#182321] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/38">{label}</p><p className="mt-2 text-sm text-white/86">{value}</p></div>;
}

function VerificationResult({ claimedSourceUrl, sourceMatches, status }: { claimedSourceUrl?: string; sourceMatches: boolean | null; status: "active" | "revoked" | "expired" }) {
  if (!claimedSourceUrl) return <p className="mt-4 border border-white/12 bg-white/5 p-3 text-sm text-white/55">Enter a source URL to confirm its publishing scope.</p>;
  if (status !== "active") return <p className="mt-4 border border-[#a9615f] bg-[#4a2828] p-3 text-sm text-[#f2c2bd]">This certificate is {status}. It must not be presented as an active approval.</p>;
  return sourceMatches
    ? <p className="mt-4 border border-[#6f927f] bg-[#243a34] p-3 text-sm text-[#b9d6c6]">Verified: this URL is included in the approved publishing scope.</p>
    : <p className="mt-4 border border-[#a9615f] bg-[#4a2828] p-3 text-sm text-[#f2c2bd]">Not approved: this URL is outside the approved publishing scope.</p>;
}
