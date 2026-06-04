import { AppShell } from "@/components/app-shell";
import { Panel, PanelHeader, SectionHeader, Stat } from "@/components/ui";
import {
  formatCurrencyKrw,
  licenseMultipliers,
  platformRevenueLines,
  talentCommercialTiers,
} from "@/lib/mock-data";

function formatRange(range: [number, number]) {
  return `${formatCurrencyKrw(range[0])} - ${formatCurrencyKrw(range[1])}`;
}

export default function PricingModelPage() {
  const medianBase = talentCommercialTiers.map((tier) =>
    Math.round((tier.baseLicenseFeeKrw[0] + tier.baseLicenseFeeKrw[1]) / 2),
  );
  const accessibleEntry = talentCommercialTiers[0].baseLicenseFeeKrw[0];
  const iconCeiling = talentCommercialTiers[talentCommercialTiers.length - 1].baseLicenseFeeKrw[1];

  return (
    <AppShell>
      <SectionHeader
        eyebrow="2026 pricing model"
        title="Price official AI appearances by talent value, usage scope, and trust burden."
        description="This mock model separates generation cost from commercial rights. Sellers are paid for consent, reputation risk, scarcity, and approval labor; buyers get predictable scope, previews, and certificate-backed public use."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat
          label="Entry license"
          value={formatCurrencyKrw(accessibleEntry)}
          detail="Emerging talent, controlled campaign"
        />
        <Stat
          label="Median anchors"
          value={String(medianBase.length)}
          detail="Four talent tiers with KRW bands"
        />
        <Stat
          label="Top custom ceiling"
          value={`${formatCurrencyKrw(iconCeiling)}+`}
          detail="Icon tier before enterprise negotiation"
        />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <PanelHeader
            eyebrow="Talent tiers"
            title="Seller-friendly price bands that buyers can understand"
            description="The tier should be assigned by a weighted score: filmography, public awareness, audience trust, category conflict risk, territory, exclusivity pressure, and approval workload."
          />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-[#ded8cd] text-xs uppercase tracking-[0.12em] text-[#837c71]">
                <tr>
                  <th className="py-3">Tier</th>
                  <th className="py-3">Base license</th>
                  <th className="py-3">Review fee</th>
                  <th className="py-3">Controlled rental</th>
                  <th className="py-3">Platform fee</th>
                  <th className="py-3">Seller payout</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4ded4]">
                {talentCommercialTiers.map((tier) => (
                  <tr key={tier.id} className="align-top">
                    <td className="py-4">
                      <p className="font-semibold text-[#21312e]">{tier.name}</p>
                      <p className="mt-1 text-xs text-[#7a746c]">Score {tier.scoreRange}</p>
                      <p className="mt-2 max-w-[230px] text-xs leading-5 text-[#6c7773]">{tier.sellerProfile}</p>
                    </td>
                    <td className="py-4 font-medium">{formatRange(tier.baseLicenseFeeKrw)}</td>
                    <td className="py-4 text-[#625d55]">{formatRange(tier.reviewFeeKrw)}</td>
                    <td className="py-4 text-[#625d55]">{formatRange(tier.controlledRentalMonthlyKrw)} / month</td>
                    <td className="py-4 text-[#625d55]">{tier.platformServiceFeePercent}%</td>
                    <td className="py-4 text-[#625d55]">{tier.minimumSellerPayoutPercent}% minimum</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow="Scoring" title="Tier assignment rules" />
          <div className="mt-4 space-y-4 text-sm">
            {[
              ["Filmography", "Lead/supporting credits, recency, genre authority, awards, press recognition."],
              ["Market awareness", "Search demand, social reach quality, regional vs global recognition."],
              ["Trust and risk", "Brand safety, endorsement sensitivity, policy restrictions, public controversy risk."],
              ["Scarcity", "Exclusivity pressure, competing brand conflicts, willingness to license AI appearances."],
              ["Operational load", "Review SLA, number of deliverables, voice inclusion, URL monitoring burden."],
            ].map(([label, description], index) => (
              <div key={label} className="border-b border-[#e1dbd2] pb-3">
                <p className="font-mono text-xs text-[#9b713d]">0{index + 1}</p>
                <p className="mt-1 font-semibold text-[#21312e]">{label}</p>
                <p className="mt-1 leading-5 text-[#65706c]">{description}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            eyebrow="Usage multipliers"
            title="Adjust price by commercial exposure"
            description="A buyer should see why the quote changes before requesting approval."
          />
          <div className="mt-5 grid gap-3">
            {licenseMultipliers.map((item) => (
              <div key={item.id} className="grid gap-3 border border-[#e1dbd2] bg-white p-4 sm:grid-cols-[150px_90px_1fr]">
                <p className="font-semibold text-[#21312e]">{item.label}</p>
                <p className="font-mono text-sm text-[#8b6234]">{item.multiplier}</p>
                <p className="text-sm leading-5 text-[#64706d]">{item.rationale}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            eyebrow="Business model"
            title="How the platform earns without enabling unapproved use"
            description="Revenue should come from verified workflow, certification, monitoring, and transaction infrastructure."
          />
          <div className="mt-5 space-y-3">
            {platformRevenueLines.map((line) => (
              <div key={line.id} className="border border-[#e1dbd2] bg-white p-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <p className="font-semibold text-[#21312e]">{line.name}</p>
                  <p className="text-sm font-semibold text-[#8b6234]">{line.rate}</p>
                </div>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#837c71]">Charged to {line.chargedTo}</p>
                <p className="mt-2 text-sm leading-5 text-[#64706d]">{line.whenApplied}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
