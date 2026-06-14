import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { Notice, Panel, PanelHeader, SectionHeader } from "@/components/ui";
import { getPlatformProviders } from "@/lib/platform-providers";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Platform Infrastructure",
  robots: { index: false, follow: false },
};

const decisions = [
  {
    area: "Account",
    selected: "Supabase Auth + Google OAuth",
    reason: "Free-tier pilot, managed sessions, Postgres RLS integration, one login path.",
    revisit: "Add enterprise SSO or recovery methods when paid organizations require them.",
  },
  {
    area: "Seller asset vault",
    selected: "Cloudflare R2 private bucket",
    reason: "S3-compatible signed access with low early-stage operating overhead and no public master files.",
    revisit: "Consider AWS S3 + KMS + Object Lock for regulated enterprise contracts.",
  },
  {
    area: "Korea checkout",
    selected: "PortOne V2 + Toss Payments",
    reason: "Korean cards, local settlement, and one integration layer for changing PG channels.",
    revisit: "Add another PG only after approval-rate or commercial data justifies it.",
  },
  {
    area: "Global checkout",
    selected: "Stripe Checkout, conditional",
    reason: "Managed checkout and webhooks, but only through an eligible operating entity.",
    revisit: "Use invoices during the pilot if no Stripe-supported entity exists.",
  },
];

export default function InfrastructurePage() {
  const providers = getPlatformProviders();

  return (
    <AppShell>
      <SectionHeader
        eyebrow="Build vs buy decision"
        title="Managed infrastructure for a zero-revenue pilot"
        description="The platform owns authorization rules, provenance, and audit records. Commodity identity, object storage, and checkout are delegated to managed providers."
        aside={
          <span className="border border-[#b9afa1] bg-[#f8f5ef] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
            Launch market: {providers.launchMarket}
          </span>
        }
      />

      <Notice tone="warning">
        “Google 로그인 완료”는 판매 권한이나 에셋 소유권 인증이 아닙니다. 판매자 KYB/KYC,
        권리 증빙, 검수자 승인 기록은 별도 절차로 유지해야 합니다.
      </Notice>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <ProviderCard
          title="Identity"
          provider={providers.auth.provider}
          configured={providers.auth.configured}
          detail={providers.auth.mode}
        />
        <ProviderCard
          title="Private storage"
          provider={providers.storage.provider}
          configured={providers.storage.configured}
          detail={providers.storage.mode}
        />
        <ProviderCard
          title="Launch payments"
          provider={providers.launchMarket === "GLOBAL" ? "Stripe Checkout" : "PortOne + Toss"}
          configured={providers.payments.configured}
          detail={`${providers.launchMarket} market gate`}
        />
      </div>

      <Panel className="mt-6">
        <PanelHeader
          eyebrow="Current decision record"
          title="What we buy now, and when to revisit it"
          description="Each choice minimizes irreversible engineering while preserving a migration path."
        />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#d2cbc1] text-xs uppercase tracking-[0.12em] text-[#827d75]">
              <tr>
                <th className="px-3 py-3">Area</th>
                <th className="px-3 py-3">Selected</th>
                <th className="px-3 py-3">Why now</th>
                <th className="px-3 py-3">Revisit trigger</th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((decision) => (
                <tr key={decision.area} className="border-b border-[#e1dbd2] align-top">
                  <td className="px-3 py-4 font-semibold">{decision.area}</td>
                  <td className="px-3 py-4 text-[#8b6234]">{decision.selected}</td>
                  <td className="px-3 py-4 leading-6 text-[#64706d]">{decision.reason}</td>
                  <td className="px-3 py-4 leading-6 text-[#64706d]">{decision.revisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Storage security boundary" />
          <ol className="mt-4 space-y-3 text-sm leading-6 text-[#64706d]">
            <li><strong className="text-[#31403d]">01.</strong> Authenticated user submits file metadata and SHA-256.</li>
            <li><strong className="text-[#31403d]">02.</strong> Server issues a private, 10-minute R2 upload URL.</li>
            <li><strong className="text-[#31403d]">03.</strong> Server verifies the stored object metadata after upload.</li>
            <li><strong className="text-[#31403d]">04.</strong> Supabase records ownership and immutable object identity.</li>
            <li><strong className="text-[#31403d]">05.</strong> Downloads stay disabled until project-level authorization is connected.</li>
          </ol>
        </Panel>
        <Panel>
          <PanelHeader title="Payment rollout boundary" />
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[#64706d]">
            <li><strong className="text-[#31403d]">Korea:</strong> PortOne V2 coordinates a contracted Toss Payments channel.</li>
            <li><strong className="text-[#31403d]">Global:</strong> Stripe is enabled only for a supported legal entity.</li>
            <li><strong className="text-[#31403d]">Before approval:</strong> use test mode or manual invoices, never simulated live capture.</li>
            <li><strong className="text-[#31403d]">Seller payout:</strong> remains a separate ledger and legal workflow, not a simple checkout transfer.</li>
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}

function ProviderCard({
  title,
  provider,
  configured,
  detail,
}: {
  title: string;
  provider: string;
  configured: boolean;
  detail: string;
}) {
  return (
    <article className="border border-[#d2cbc1] bg-[#f8f5ef] p-5">
      <div className="flex items-start justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#827d75]">{title}</p>
        <span className={`border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${configured ? "border-[#9db59b] bg-[#edf5ea] text-[#28522e]" : "border-[#d7bd8d] bg-[#fbf4e5] text-[#72551d]"}`}>
          {configured ? "Configured" : "Setup required"}
        </span>
      </div>
      <h2 className="mt-4 text-lg font-semibold text-[#21312e]">{provider}</h2>
      <p className="mt-2 text-sm leading-6 text-[#64706d]">{detail}</p>
    </article>
  );
}
