import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, Stat, StatusPill } from "@/components/ui";
import { certificates, formatCurrency, ledger, projects, talents } from "@/lib/mock-data";

export default function Home() {
  const pending = projects.filter((project) => project.status !== "approved").length;
  const approved = projects.filter((project) => project.status === "approved").length;
  const held = ledger.filter((entry) => entry.status === "held").reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Operations dashboard"
        title="Protect actor reputation while issuing official AI appearance approvals."
        description="A rights-first operating console for reviewing finished AI video outputs, recording approval decisions, and publishing public certificate pages."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pending reviews" value={String(pending)} detail="Across agency queues" />
        <Stat label="Approved works" value={String(approved)} detail={`${certificates.length} public certificate issued`} />
        <Stat label="Managed talent" value={String(talents.length)} detail="Policy-backed profiles" />
        <Stat label="Funds on hold" value={formatCurrency(held)} detail="Released after approval" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Review command center</h2>
              <p className="text-sm text-[#6b665d]">Prioritize submissions by risk, policy fit, and certification readiness.</p>
            </div>
            <Link href="/reviews/project-01" className="rounded bg-[#16302b] px-4 py-2 text-sm font-semibold text-white">
              Open review
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#ded8cd] text-xs uppercase tracking-[0.12em] text-[#837c71]">
                <tr>
                  <th className="py-3">Project</th>
                  <th className="py-3">Talent</th>
                  <th className="py-3">Use</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Budget</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4ded4]">
                {projects.map((project) => {
                  const talent = talents.find((item) => item.id === project.talentId);
                  return (
                    <tr key={project.id}>
                      <td className="py-4 font-medium">{project.title}</td>
                      <td className="py-4 text-[#625d55]">{talent?.name}</td>
                      <td className="py-4 text-[#625d55]">{project.intendedUse}</td>
                      <td className="py-4">
                        <StatusPill status={project.status} />
                      </td>
                      <td className="py-4 text-[#625d55]">{formatCurrency(project.budget)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <h2 className="text-lg font-semibold">MVP workflow</h2>
          <div className="mt-4 space-y-3 text-sm">
            {[
              "Producer submits finished AI video output.",
              "Actor or agency reviews policy compliance.",
              "Reviewer approves, rejects, or requests revisions.",
              "Approved output receives a public certificate URL.",
              "Ledger records license and review fee status.",
            ].map((item, index) => (
              <div key={item} className="flex gap-3 rounded border border-[#e1d8ca] bg-white p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e7ded1] text-xs font-semibold text-[#5f4325]">
                  {index + 1}
                </span>
                <p className="text-[#4d4941]">{item}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
