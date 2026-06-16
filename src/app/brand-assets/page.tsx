import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { Notice, Panel, PanelHeader, SectionHeader, Stat } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brand Assets",
  robots: { index: false, follow: false },
};

const productAssets = [
  {
    brand: "Maison Aureline",
    product: "Nocturne leather bag",
    category: "Luxury accessory",
    market: "KR, JP, US",
    status: "Brand controlled",
  },
  {
    brand: "Prism Atelier",
    product: "Archive silk scarf",
    category: "Fashion heritage",
    market: "Global excluding CN",
    status: "Placement ready",
  },
  {
    brand: "Crown & Vale",
    product: "Signature chronograph",
    category: "Watch",
    market: "KR, EU, US",
    status: "Evidence review",
  },
];

export default function BrandAssetsPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Brand placement"
        title="Verify luxury product appearances before they go public."
        description="For VIP brands, the platform records product identity, brand authority, approved visual use, and the exact URLs where the placement may claim official status."
        aside={
          <Link href="/brand-assets/new" className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">
            Prepare upload
          </Link>
        }
      />

      <Notice tone="neutral">
        This is a controlled brand-placement workflow. Buyers do not receive raw product masters or reusable brand assets by default.
      </Notice>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="Asset owners" value="3" detail="Brand-controlled issuers" />
        <Stat label="Placement checks" value="12" detail="URL and scope reviews" />
        <Stat label="Public claims" value="0" detail="No launch before legal approval" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <PanelHeader
            eyebrow="Product asset vault"
            title="Brand-controlled product assets"
            description="Each product record separates genuine product identity from the right to place it in a specific video."
          />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-[#d2cbc1] text-xs uppercase tracking-[0.12em] text-[#827d75]">
                <tr>
                  <th className="py-3">Brand</th>
                  <th className="py-3">Product</th>
                  <th className="py-3">Category</th>
                  <th className="py-3">Markets</th>
                  <th className="py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e1dbd2]">
                {productAssets.map((asset) => (
                  <tr key={`${asset.brand}-${asset.product}`}>
                    <td className="py-4 font-semibold text-[#21312e]">{asset.brand}</td>
                    <td className="py-4 text-[#64706d]">{asset.product}</td>
                    <td className="py-4 text-[#64706d]">{asset.category}</td>
                    <td className="py-4 text-[#64706d]">{asset.market}</td>
                    <td className="py-4 text-[#8b6234]">{asset.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            eyebrow="Placement proof"
            title="What a buyer can verify"
            description="The public certificate should answer these questions without exposing confidential masters."
          />
          <ol className="mt-4 space-y-4 text-sm leading-6 text-[#64706d]">
            <li><strong className="text-[#31403d]">01. Product identity:</strong> this is the genuine product or approved digital twin.</li>
            <li><strong className="text-[#31403d]">02. Brand authority:</strong> the issuer controls the mark, product family, and placement rules.</li>
            <li><strong className="text-[#31403d]">03. Approved use:</strong> video scene, campaign, territory, channel, and duration are scoped.</li>
            <li><strong className="text-[#31403d]">04. URL binding:</strong> only listed URLs may claim official brand placement status.</li>
            <li><strong className="text-[#31403d]">05. Live status:</strong> active, expired, revoked, or disputed status remains visible.</li>
          </ol>
        </Panel>
      </div>

      <Panel className="mt-6">
        <PanelHeader
          eyebrow="Upload preparation"
          title="Brand asset intake should use structured choices"
          description="Manual typing is limited to project-specific notes. Common values are selected, searched, or suggested."
        />
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <SelectPreview label="Product category" values={["Luxury accessory", "Fashion", "Watch", "Beauty", "Vehicle", "Consumer electronics"]} />
          <SelectPreview label="Approved markets" values={["KR", "JP", "US", "EU", "Global", "Global excluding CN"]} />
          <SelectPreview label="Placement channel" values={["Owned social", "Paid digital ads", "Campaign microsite", "OTT", "OOH", "Internal pitch"]} />
        </div>
      </Panel>
    </AppShell>
  );
}

function SelectPreview({ label, values }: { label: string; values: string[] }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{label}</span>
      <select className="field" defaultValue={values[0]}>
        {values.map((value) => <option key={value}>{value}</option>)}
      </select>
    </label>
  );
}
