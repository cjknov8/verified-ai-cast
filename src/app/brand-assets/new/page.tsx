import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { Notice, Panel, PanelHeader, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Prepare Brand Asset",
  robots: { index: false, follow: false },
};

export default function NewBrandAssetPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Brand asset intake"
        title="Prepare a product asset for official placement review."
        description="This demo form uses choices for repeat values so brand teams do not have to type market, category, and usage terms by hand."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
        <Panel>
          <PanelHeader eyebrow="Product identity" title="Structured upload brief" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <TextField label="Brand name" placeholder="Brand-controlled issuer" />
            <TextField label="Product name" placeholder="Product, edition, or SKU family" />
            <SelectField label="Product category" values={["Luxury accessory", "Fashion", "Watch", "Beauty", "Vehicle", "Consumer electronics"]} />
            <SelectField label="Approved market" values={["KR", "JP", "US", "EU", "Global", "Global excluding CN"]} />
            <SelectField label="Placement channel" values={["Owned social", "Paid digital ads", "Campaign microsite", "Streaming teaser", "OTT / broadcast", "OOH"]} />
            <SelectField label="Review level" values={["Brand manager review", "Legal review", "Dual approval", "Executive approval"]} />
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">Approved URLs</span>
              <textarea className="field min-h-28" placeholder="https://campaign.example.com/product-placement" />
            </label>
          </div>
          <div className="mt-6 border-t border-[#ddd6cc] pt-4">
            <button type="button" className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">
              Save intake draft
            </button>
          </div>
        </Panel>
        <div className="space-y-4">
          <Notice tone="neutral">A product can be genuine but still not approved for a specific placement. The certificate must show both.</Notice>
          <Notice tone="warning">Do not upload confidential masters until private storage, legal terms, and brand authority checks are enabled.</Notice>
        </div>
      </div>
    </AppShell>
  );
}

function TextField({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{label}</span>
      <input className="field" placeholder={placeholder} />
    </label>
  );
}

function SelectField({ label, values }: { label: string; values: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{label}</span>
      <select className="field" defaultValue="">
        <option value="">Select one</option>
        {values.map((value) => <option key={value}>{value}</option>)}
      </select>
    </label>
  );
}
