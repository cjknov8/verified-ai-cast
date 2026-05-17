import { AppShell } from "@/components/app-shell";
import { Panel, SectionHeader, Stat } from "@/components/ui";
import { formatCurrency, projects, talents } from "@/lib/mock-data";

export default function AgencyPage() {
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const pendingReviews = talents.reduce(
    (sum, talent) => sum + talent.pendingReviews,
    0,
  );

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Agency dashboard"
        title="Control official AI appearances before public release."
        description="A safe operating room for agencies to review demand, protect talent boundaries, and decide which AI works can use an actor's name officially."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Represented talent" value={String(talents.length)} detail="Verified profiles" />
        <Stat label="Pending reviews" value={String(pendingReviews)} detail="Across active policies" />
        <Stat label="Pipeline value" value={formatCurrency(totalBudget)} detail="Submitted project budget" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {talents.map((talent) => (
          <Panel key={talent.id}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-[#6b665d]">{talent.agency}</p>
                <h2 className="mt-1 text-2xl font-semibold">{talent.name}</h2>
                <p className="mt-2 text-sm text-[#625d55]">
                  {talent.category} / {talent.territory}
                </p>
              </div>
              <div className="rounded border border-[#d8cebf] bg-white px-3 py-2 text-right">
                <p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">Score</p>
                <p className="text-xl font-semibold text-[#16302b]">{talent.reputationScore}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-[#e1d8ca] bg-white p-3">
                <p className="text-xs text-[#837c71]">Active licenses</p>
                <p className="mt-1 text-lg font-semibold">{talent.activeLicenses}</p>
              </div>
              <div className="rounded border border-[#e1d8ca] bg-white p-3">
                <p className="text-xs text-[#837c71]">Minimum fee</p>
                <p className="mt-1 text-lg font-semibold">
                  {formatCurrency(talent.policy.minimumLicenseFee)}
                </p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}
