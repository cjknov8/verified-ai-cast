import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, Stat, StatusPill } from "@/components/ui";
import { certificates, formatCurrency, ledger, projects, talents } from "@/lib/mock-data";

export default function OperationsPage() {
  const pending = projects.filter((project) => !["approved", "revoked"].includes(project.status)).length;
  const approved = certificates.filter((certificate) => certificate.status === "active").length;
  const held = ledger.filter((entry) => entry.status === "held").reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Operations dashboard"
        title="Protect actor reputation while issuing official AI appearance approvals."
        description="A rights-first operating console for reviewing finished AI video outputs, recording decisions, and publishing public certificate pages."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Pending reviews" value={String(pending)} detail="Across agency queues" />
        <Stat label="Active certificates" value={String(approved)} detail={`${certificates.length} total public records`} />
        <Stat label="Managed talent" value={String(talents.length)} detail="Policy-backed profiles" />
        <Stat label="Funds on hold" value={formatCurrency(held)} detail="Released after approval" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Panel>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Review command center</h2>
              <p className="text-sm text-[#78837f]">Prioritize submissions by risk, policy fit, and certification readiness.</p>
            </div>
            <Link href="/reviews/project-01" className="bg-[#c9a86c] px-4 py-2 text-sm font-semibold text-[#182321]">
              Open review
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#d5cec5] text-xs uppercase tracking-[0.12em] text-[#7e7971]">
                <tr><th className="py-3">Project</th><th className="py-3">Talent</th><th className="py-3">Use</th><th className="py-3">Status</th><th className="py-3">Budget</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e1dbd2]">
                {projects.map((project) => {
                  const talent = talents.find((item) => item.id === project.talentId);
                  return (
                    <tr key={project.id}>
                      <td className="py-4 font-medium">{project.title}</td>
                      <td className="py-4 text-[#67716e]">{talent?.name}</td>
                      <td className="py-4 text-[#67716e]">{project.intendedUse}</td>
                      <td className="py-4"><StatusPill status={project.status} /></td>
                      <td className="py-4 text-[#67716e]">{formatCurrency(project.budget)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <h2 className="text-lg font-semibold">Approval workflow</h2>
          <div className="mt-4 space-y-4 text-sm">
            {["Finished output submitted", "Policy and risk review", "Talent decision recorded", "Certificate issued", "Usage and settlement tracked"].map((item, index) => (
              <div key={item} className="flex gap-3 border-b border-[#e1dbd2] pb-3">
                <span className="font-mono text-xs text-[#9b713d]">0{index + 1}</span>
                <p className="text-[#56615e]">{item}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
