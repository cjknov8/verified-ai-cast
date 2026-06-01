import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, StatusPill } from "@/components/ui";
import {
  getCertificate,
  getProject,
  getTalent,
  isApprovedSourceUrl,
} from "@/lib/mock-data";

export default async function CertificatePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ source?: string | string[] }>;
}) {
  const { id } = await params;
  const { source } = await searchParams;
  const certificate = getCertificate(id);
  const project = getProject(certificate.projectId);
  const talent = getTalent(project.talentId);
  const claimedSourceUrl = Array.isArray(source) ? source[0] : source;
  const sourceMatches = claimedSourceUrl
    ? isApprovedSourceUrl(certificate, claimedSourceUrl)
    : null;

  return (
    <AppShell>
      <div className="rounded border border-[#cfc0a8] bg-[#16302b] p-6 text-white sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d8c7a6]">Public certification page</p>
        <h1 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
          Official AI appearance approval for {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75">
          This page verifies that the submitted AI video result was reviewed and approved under the represented actor policy.
        </p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <Panel>
          <SectionHeader
            eyebrow="Certificate"
            title={certificate.id}
            description={certificate.licenseScope}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <CertFact label="Actor" value={talent.name} />
            <CertFact label="Agency" value={talent.agency} />
            <CertFact label="Producer" value={project.producer} />
            <CertFact label="Status" value={certificate.status} />
            <CertFact label="Issued" value={certificate.issuedAt} />
            <CertFact label="Expires" value={certificate.expiresAt} />
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Verification</h2>
            <StatusPill status={certificate.status} />
          </div>
          <div className="mt-4 rounded border border-[#d6cdbf] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">Verification hash</p>
            <p className="mt-2 font-mono text-lg font-semibold text-[#16302b]">{certificate.verificationHash}</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#625d55]">
            This certificate is valid only for the approved publishing URLs below.
            A copied certificate link does not approve a different source URL.
          </p>
        </Panel>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <Panel>
          <h2 className="text-lg font-semibold">Approved publishing URLs</h2>
          <div className="mt-4 space-y-3">
            {certificate.approvedUrls.map((url) => (
              <div key={url} className="rounded border border-[#e1d8ca] bg-white p-4">
                <p className="break-all font-mono text-sm text-[#31554f]">{url}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-semibold">Check a source URL</h2>
          <p className="mt-2 text-sm leading-6 text-[#625d55]">
            Paste the page claiming this certificate to confirm whether it is on the approved URL list.
          </p>
          <form className="mt-4 space-y-3">
            <label className="block">
              <span className="text-xs uppercase tracking-[0.14em] text-[#837c71]">Claimed source URL</span>
              <input
                name="source"
                type="url"
                defaultValue={claimedSourceUrl}
                placeholder="https://example.com/published-work"
                className="mt-2 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2 text-sm"
              />
            </label>
            <button className="rounded bg-[#16302b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#21483f]">
              Verify source
            </button>
          </form>
          <SourceVerificationResult
            claimedSourceUrl={claimedSourceUrl}
            sourceMatches={sourceMatches}
            certificateStatus={certificate.status}
          />
        </Panel>
      </div>
    </AppShell>
  );
}

function CertFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[#e1d8ca] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">{label}</p>
      <p className="mt-2 font-medium">{value}</p>
    </div>
  );
}

function SourceVerificationResult({
  claimedSourceUrl,
  sourceMatches,
  certificateStatus,
}: {
  claimedSourceUrl?: string;
  sourceMatches: boolean | null;
  certificateStatus: "active" | "revoked" | "expired";
}) {
  if (!claimedSourceUrl) {
    return (
      <p className="mt-4 rounded border border-[#d8cebf] bg-[#f6f4ef] p-3 text-sm text-[#625d55]">
        Enter a source URL to check whether this certificate may be displayed there.
      </p>
    );
  }

  if (certificateStatus !== "active") {
    return (
      <p className="mt-4 rounded border border-[#d08d8a] bg-[#fff0ef] p-3 text-sm text-[#8a2b27]">
        This certificate is {certificateStatus}. It must not be presented as an active approval.
      </p>
    );
  }

  return sourceMatches ? (
    <p className="mt-4 rounded border border-[#9db59b] bg-[#edf5ea] p-3 text-sm text-[#28522e]">
      Verified: this URL is included in the approved publishing scope.
    </p>
  ) : (
    <p className="mt-4 rounded border border-[#d08d8a] bg-[#fff0ef] p-3 text-sm text-[#8a2b27]">
      Not approved: this certificate link is being used on a URL outside its approved publishing scope.
    </p>
  );
}
