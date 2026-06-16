import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { Notice, Panel, PanelHeader, SectionHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "Business Launch Plan",
  robots: { index: false, follow: false },
};

const phases = [
  {
    days: "0-30",
    title: "Company and problem validation",
    target: "30 interviews, one design-partner commitment, legal/accounting consultations",
  },
  {
    days: "31-60",
    title: "Design partner operations",
    target: "2-3 agencies, three rights-holder reviews, measured review time",
  },
  {
    days: "61-90",
    title: "Paid pilot",
    target: "Three paid pilots and one certified public release",
  },
  {
    days: "91-180",
    title: "Repeatability and pre-seed",
    target: "10-20 certificates, repeat projects, incorporation and investor meetings",
  },
];

const channels = [
  ["Customer", "Boutique agencies", "60-day design partner", "Now"],
  ["Customer", "AI video studios", "Private paid pilot", "Now"],
  ["Support", "K-Startup", "Business grants and one-stop consulting", "Rolling notices"],
  ["Support", "KOCCA", "Content startup and industry programs", "Rolling notices"],
  ["Capital", "Angels / accelerators", "Introductions and office hours", "After 3 paid pilots"],
  ["Capital", "TIPS operators", "Operator investment and recommendation", "After incorporation and traction"],
];

export default function BusinessPlanPage() {
  return (
    <AppShell>
      <SectionHeader
        eyebrow="Commercial execution"
        title="A 180-day path from prototype to trusted pilot"
        description="The immediate goal is not broad self-service growth. It is proving that rights holders and buyers will repeatedly use a controlled verification workflow."
        aside={
          <span className="border border-[#b9afa1] bg-[#f8f5ef] px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]">
            Korea · founder-led
          </span>
        }
      />

      <Notice tone="warning">
        개인사업자는 빠른 유료 검증에는 적합하지만 일반적인 지분투자를 받을 주식이 없습니다.
        6개월 내 투자를 추진한다면 1인 주식회사 설립 또는 법인 전환 시점을 미리 정해야 합니다.
      </Notice>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {phases.map((phase) => (
          <article key={phase.days} className="border border-[#d2cbc1] bg-[#f8f5ef] p-5">
            <p className="font-mono text-xs text-[#8b6234]">DAY {phase.days}</p>
            <h2 className="mt-3 text-lg font-semibold text-[#21312e]">{phase.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#64706d]">{phase.target}</p>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader
            eyebrow="Beachhead market"
            title="Who pays first"
            description="Start with a narrow service-assisted transaction, not an open marketplace."
          />
          <div className="mt-5 space-y-5 text-sm leading-6 text-[#64706d]">
            <div>
              <h3 className="font-semibold text-[#31403d]">Supply</h3>
              <p>Boutique actor, model, voice, and creator agencies with 5-50 represented people and no dedicated digital-rights team.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#31403d]">Demand</h3>
              <p>AI video studios, branded-content producers, and advertising teams that must show a client that a final result is authorized.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#31403d]">Initial transaction</h3>
              <p>The rights holder invoices the license directly. Verified Presence separately invoices review, evidence, and certification services.</p>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            eyebrow="Founder sales"
            title="Weekly operating cadence"
            description="Paid advertising waits until the sales message and customer profile are proven."
          />
          <dl className="mt-4">
            <Metric label="Personalized outreach" value="20 / week" />
            <Metric label="Customer interviews" value="5 / week" />
            <Metric label="Product demos" value="2 / week" />
            <Metric label="Pilot proposals" value="1 / week" />
            <Metric label="Existing-account follow-ups" value="5 / week" />
          </dl>
        </Panel>
      </div>

      <Panel className="mt-6">
        <PanelHeader
          eyebrow="Contact map"
          title="Where to take the pitch"
          description="Customer proof comes first; grants and investors accelerate a process that already works."
        />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-[#d2cbc1] text-xs uppercase tracking-[0.12em] text-[#827d75]">
              <tr>
                <th className="px-3 py-3">Type</th>
                <th className="px-3 py-3">Channel</th>
                <th className="px-3 py-3">Ask</th>
                <th className="px-3 py-3">Timing</th>
              </tr>
            </thead>
            <tbody>
              {channels.map(([type, channel, ask, timing]) => (
                <tr key={channel} className="border-b border-[#e1dbd2]">
                  <td className="px-3 py-4 font-semibold">{type}</td>
                  <td className="px-3 py-4 text-[#8b6234]">{channel}</td>
                  <td className="px-3 py-4 text-[#64706d]">{ask}</td>
                  <td className="px-3 py-4 text-[#64706d]">{timing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHeader title="Investment trigger" />
          <p className="mt-4 text-sm leading-6 text-[#64706d]">
            Begin a formal pre-seed round after 3 design partners, 5 paid pilots, 10 certificates,
            and evidence of repeat usage or signed LOIs.
          </p>
        </Panel>
        <Panel>
          <PanelHeader title="Recommended round" />
          <p className="mt-4 text-sm leading-6 text-[#64706d]">
            KRW 300-700M for 12-18 months, primarily product security, legal and trust operations,
            and founder-led partnerships.
          </p>
        </Panel>
        <Panel>
          <PanelHeader title="No paid ads yet" />
          <p className="mt-4 text-sm leading-6 text-[#64706d]">
            Publish rights checklists and real case studies. Use direct agency and studio outreach
            until one message reliably creates qualified pilot demand.
          </p>
        </Panel>
      </div>
    </AppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#e1dbd2] py-3 text-sm">
      <dt className="text-[#64706d]">{label}</dt>
      <dd className="font-semibold text-[#31403d]">{value}</dd>
    </div>
  );
}
