import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, StatusPill } from "@/components/ui";
import { formatCurrency, getProject, getTalent, ledger } from "@/lib/mock-data";

export default function SettlementsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Settlement ledger"
        title="Track the money attached to approved actor usage."
        description="The first version keeps the ledger simple: review fees, license fees, royalties, status, and the project each line belongs to."
      />

      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#ded8cd] text-xs uppercase tracking-[0.12em] text-[#837c71]">
              <tr>
                <th className="py-3">Date</th>
                <th className="py-3">Project</th>
                <th className="py-3">Talent</th>
                <th className="py-3">Type</th>
                <th className="py-3">Status</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4ded4]">
              {ledger.map((entry) => {
                const project = getProject(entry.projectId);
                const talent = getTalent(entry.talentId);

                return (
                  <tr key={entry.id}>
                    <td className="py-4 text-[#625d55]">{entry.date}</td>
                    <td className="py-4 font-medium">{project.title}</td>
                    <td className="py-4 text-[#625d55]">{talent.name}</td>
                    <td className="py-4 text-[#625d55]">{entry.type.replace("_", " ")}</td>
                    <td className="py-4">
                      <StatusPill status={entry.status} />
                    </td>
                    <td className="py-4 text-right font-semibold">
                      {formatCurrency(entry.amount)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}
