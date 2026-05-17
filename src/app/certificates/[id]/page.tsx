import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, StatusPill } from "@/components/ui";
import { getCertificate, getProject, getTalent } from "@/lib/mock-data";

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const certificate = getCertificate(id);
  const project = getProject(certificate.projectId);
  const talent = getTalent(project.talentId);

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
            <CertFact label="Status" value="Approved" />
            <CertFact label="Issued" value={certificate.issuedAt} />
            <CertFact label="Expires" value={certificate.expiresAt} />
          </div>
        </Panel>
        <Panel>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Verification</h2>
            <StatusPill status="approved" />
          </div>
          <div className="mt-4 rounded border border-[#d6cdbf] bg-white p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">Verification hash</p>
            <p className="mt-2 font-mono text-lg font-semibold text-[#16302b]">{certificate.verificationHash}</p>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#625d55]">
            The certificate page is intentionally public and lightweight. In production, it can be backed by immutable audit records,
            signed media manifests, and revocation history.
          </p>
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
