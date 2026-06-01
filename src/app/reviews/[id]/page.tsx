import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { MetaRow, Notice, Panel, PanelHeader, PrimaryButton, SectionHeader, SecondaryButton, StatusPill } from "@/components/ui";
import {
  formatCurrency,
  getAuditLogsForProject,
  getCertificate,
  getProject,
  getTalent,
} from "@/lib/mock-data";

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  const talent = getTalent(project.talentId);
  const auditLogs = getAuditLogsForProject(project.id);
  const certificate = project.certificateId
    ? getCertificate(project.certificateId)
    : null;

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Submitted AI video review"
        title={project.title}
        description="Reviewer workspace for comparing the submitted result against talent policy, then approving, rejecting, or requesting revision."
        aside={<StatusPill status={project.status} />}
      />
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel>
          <PanelHeader eyebrow="Secure screener" title="Review the submitted final output" description="Compare the result with the declared rights scope and represented talent policy before recording a decision." />
          <div className="mt-5 aspect-video border border-[#d6cdbf] bg-[#111817] p-5 text-white">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="border border-white/25 px-3 py-1 text-xs">Secure screener placeholder</span>
                <StatusPill status={project.status} />
              </div>
              <div>
                <p className="text-2xl font-semibold">{project.title}</p>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Video playback, frame comments, and model provenance inspection will connect here later.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <DecisionCard title="Approve" copy="Issue certificate and release license terms." />
            <DecisionCard title="Request changes" copy="Send revision notes while holding review fee." />
            <DecisionCard title="Reject" copy="Block certification and record policy reason." />
            <DecisionCard title="Revoke" copy="Deactivate an issued certificate and preserve the reason in the audit log." />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>Approve and issue certificate</PrimaryButton>
            <SecondaryButton>Request modifications</SecondaryButton>
            <SecondaryButton>Reject submission</SecondaryButton>
            <SecondaryButton>Revoke certificate</SecondaryButton>
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel>
            <PanelHeader eyebrow="Decision context" title="Submission facts" />
            <dl className="mt-3">
              <MetaRow label="Talent" value={talent.name} />
              <MetaRow label="Producer" value={project.producer} />
              <MetaRow label="Territory" value={project.territory} />
              <MetaRow label="Duration" value={project.duration} />
              <MetaRow label="Budget" value={formatCurrency(project.budget)} />
            </dl>
          </Panel>
          <Panel>
            <PanelHeader eyebrow="Reviewer attention" title="Risk and notes" />
            <div className="mt-3 space-y-2 text-sm">
              {[...project.riskFlags, ...project.reviewerNotes].map((item) => (
                <Notice key={item} tone="warning">{item}</Notice>
              ))}
            </div>
            {project.certificateId ? (
              <Link href={`/certificates/${project.certificateId}`} className="mt-4 inline-flex rounded bg-[#16302b] px-4 py-2 text-sm font-semibold text-white">
                View public certificate
              </Link>
            ) : null}
          </Panel>
          {certificate ? (
            <Panel>
              <PanelHeader eyebrow="Public trust" title="Issued certificate" />
              <div className="flex items-center justify-between gap-3">
                <p className="mt-3 font-mono text-sm text-[#31554f]">{certificate.id}</p>
                <StatusPill status={certificate.status} />
              </div>
              <p className="mt-2 text-sm text-[#625d55]">
                {certificate.approvedUrls.length} approved publishing URLs
              </p>
            </Panel>
          ) : null}
          <Panel>
            <PanelHeader eyebrow="Immutable history" title="Audit log" />
            <div className="mt-3 space-y-3">
              {auditLogs.map((entry) => (
                <div key={entry.id} className="rounded border border-[#e1d8ca] bg-white p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <StatusPill status={entry.action} />
                    <time className="text-xs text-[#837c71]">{entry.createdAt}</time>
                  </div>
                  <p className="mt-2 text-sm font-medium">{entry.actorName}</p>
                  <p className="mt-1 text-sm leading-5 text-[#625d55]">{entry.note}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}

function DecisionCard({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded border border-[#e1d8ca] bg-white p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-[#625d55]">{copy}</p>
    </div>
  );
}
