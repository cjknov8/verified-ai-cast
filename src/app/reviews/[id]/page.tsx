import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionHeader, SecondaryButton, StatusPill } from "@/components/ui";
import { formatCurrency, getProject, getTalent } from "@/lib/mock-data";

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  const talent = getTalent(project.talentId);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Submitted AI video review"
        title={project.title}
        description="Reviewer workspace for comparing the submitted result against talent policy, then approving, rejecting, or requesting revision."
      />
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel>
          <div className="aspect-video rounded border border-[#d6cdbf] bg-[#1b1b19] p-5 text-white">
            <div className="flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="rounded border border-white/25 px-3 py-1 text-xs">Secure screener placeholder</span>
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
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <DecisionCard title="Approve" copy="Issue certificate and release license terms." />
            <DecisionCard title="Request changes" copy="Send revision notes while holding review fee." />
            <DecisionCard title="Reject" copy="Block certification and record policy reason." />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>Approve and issue certificate</PrimaryButton>
            <SecondaryButton>Request modifications</SecondaryButton>
            <SecondaryButton>Reject submission</SecondaryButton>
          </div>
        </Panel>
        <div className="grid gap-5">
          <Panel>
            <h2 className="text-lg font-semibold">Submission facts</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <Fact label="Talent" value={talent.name} />
              <Fact label="Producer" value={project.producer} />
              <Fact label="Territory" value={project.territory} />
              <Fact label="Duration" value={project.duration} />
              <Fact label="Budget" value={formatCurrency(project.budget)} />
            </dl>
          </Panel>
          <Panel>
            <h2 className="text-lg font-semibold">Risk and notes</h2>
            <div className="mt-3 space-y-2 text-sm">
              {[...project.riskFlags, ...project.reviewerNotes].map((item) => (
                <p key={item} className="rounded border border-[#e1d8ca] bg-white p-3 text-[#4d4941]">{item}</p>
              ))}
            </div>
            {project.certificateId ? (
              <Link href={`/certificates/${project.certificateId}`} className="mt-4 inline-flex rounded bg-[#16302b] px-4 py-2 text-sm font-semibold text-white">
                View public certificate
              </Link>
            ) : null}
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

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#e5ded5] pb-2">
      <dt className="text-[#625d55]">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
