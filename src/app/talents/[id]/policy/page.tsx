import { AppShell } from "@/components/app-shell";
import { Panel, PrimaryButton, SectionHeader, SecondaryButton } from "@/components/ui";
import { formatCurrency, getTalent } from "@/lib/mock-data";

export default async function PolicyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const talent = getTalent(id);
  const { policy } = talent;

  return (
    <AppShell>
      <SectionHeader
        eyebrow="AI appearance policy"
        title={`${talent.name} approval policy`}
        description="Policy settings define what a producer may submit, what requires escalation, and what public disclosure must accompany an approved output."
      />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Panel>
          <h2 className="text-lg font-semibold">Commercial guardrails</h2>
          <div className="mt-4 space-y-4 text-sm">
            <label className="block">
              <span className="text-[#625d55]">Review SLA</span>
              <input defaultValue={policy.reviewSlaHours} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-[#625d55]">Minimum license fee</span>
              <input defaultValue={formatCurrency(policy.minimumLicenseFee)} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" />
            </label>
            <label className="block">
              <span className="text-[#625d55]">Approved territories</span>
              <input defaultValue={talent.territory} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" />
            </label>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <PrimaryButton>Save draft policy</PrimaryButton>
            <SecondaryButton>Preview certificate terms</SecondaryButton>
          </div>
        </Panel>
        <div className="grid gap-5">
          <PolicyList title="Allowed uses" items={policy.allowedUses} />
          <PolicyList title="Restricted uses" items={policy.restrictedUses} />
          <PolicyList title="Likeness boundaries" items={policy.likenessBoundaries} />
          <PolicyList title="Required disclosures" items={policy.requiredDisclosures} />
        </div>
      </div>
    </AppShell>
  );
}

function PolicyList({ title, items }: { title: string; items: string[] }) {
  return (
    <Panel>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <label key={item} className="flex items-start gap-3 rounded border border-[#e1d8ca] bg-white p-3 text-sm">
            <input type="checkbox" defaultChecked className="mt-1" />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </Panel>
  );
}
