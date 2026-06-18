import Link from "next/link";
import { Notice, Panel, PanelHeader, SectionHeader, Stat, StatusPill } from "@/components/ui";
import { certificates, formatCurrency, ledger, projects, talents } from "@/lib/mock-data";

type Locale = "en" | "ko";

const roleGuides = {
  en: [
    {
      role: "Seller",
      title: "Register an asset and prove you can sell it.",
      copy: "Use this path when you represent a person, product, brand, character, or other premium asset.",
      href: "/projects/new",
      action: "Start seller checklist",
      steps: ["Create a profile", "Register the asset", "Attach authority evidence", "Request verification", "Share the certificate URL"],
    },
    {
      role: "Buyer",
      title: "Check what is genuine before you pay or publish.",
      copy: "Use this path when you need to know whether a seller, asset, certificate, and URL are safe to rely on.",
      href: "/verify",
      action: "Verify an asset",
      steps: ["Enter certificate ID", "Check active status", "Confirm approved URLs", "Read usage scope", "Request a deal room"],
    },
    {
      role: "Brand",
      title: "Control product placement and official claims.",
      copy: "Use this path when a luxury or VIP brand wants a product to appear in media with URL-bound proof.",
      href: "/brand-assets/new",
      action: "Prepare product asset",
      steps: ["Add product identity", "Choose approved markets", "Set placement channels", "Assign review level", "Approve public URLs"],
    },
    {
      role: "Reviewer",
      title: "Approve only what the evidence supports.",
      copy: "Use this path when you need to approve, request revision, reject, or revoke a certification claim.",
      href: "/reviews/project-01",
      action: "Review a request",
      steps: ["Open request", "Compare scope and rules", "Check risk flags", "Record decision", "Publish or block certificate"],
    },
  ],
  ko: [
    {
      role: "판매자",
      title: "에셋을 등록하고 판매 권한을 증명합니다.",
      copy: "배우, 제품, 브랜드, 캐릭터 등 프리미엄 에셋을 대표하거나 판매하려는 경우의 흐름입니다.",
      href: "/ko/projects/new",
      action: "판매자 체크리스트 시작",
      steps: ["프로필 만들기", "에셋 등록", "권한 증빙 첨부", "검수 요청", "인증 URL 공유"],
    },
    {
      role: "구매자",
      title: "결제하거나 공개하기 전에 정품 여부를 확인합니다.",
      copy: "판매자, 에셋, 인증서, URL을 믿어도 되는지 빠르게 판단해야 할 때 사용하는 흐름입니다.",
      href: "/ko/verify",
      action: "에셋 인증 확인",
      steps: ["인증서 ID 입력", "활성 상태 확인", "승인 URL 확인", "사용 범위 확인", "거래 공간 요청"],
    },
    {
      role: "브랜드",
      title: "제품 배치와 공식 정품 주장을 통제합니다.",
      copy: "명품/VIP 브랜드가 제품을 영상 안에 배치하고 URL 단위의 공식 증거를 남길 때 사용하는 흐름입니다.",
      href: "/ko/brand-assets/new",
      action: "제품 에셋 준비",
      steps: ["제품 정체성 입력", "승인 시장 선택", "배치 채널 선택", "검수 단계 지정", "공개 URL 승인"],
    },
    {
      role: "검수자",
      title: "증거가 뒷받침하는 범위만 승인합니다.",
      copy: "승인, 수정 요청, 반려, 철회 결정을 기록해야 할 때 사용하는 흐름입니다.",
      href: "/ko/reviews/project-01",
      action: "요청 검수",
      steps: ["요청 열기", "범위와 규칙 비교", "리스크 확인", "결정 기록", "인증서 발급 또는 차단"],
    },
  ],
} satisfies Record<Locale, Array<{ role: string; title: string; copy: string; href: string; action: string; steps: string[] }>>;

const dealRooms = {
  en: [
    {
      name: "Actor appearance approval",
      seller: "Aster Rights Studio",
      buyer: "Luma Seoul Production",
      asset: "Mina Park appearance",
      status: "approved",
      next: "Buyer can publish only on two approved URLs.",
    },
    {
      name: "Luxury product placement",
      seller: "Maison Aureline Brand Office",
      buyer: "Nocturne Campaign Team",
      asset: "Nocturne leather bag",
      status: "reviewing",
      next: "Brand legal must approve the final edit before the certificate is active.",
    },
    {
      name: "Blocked resale claim",
      seller: "Unverified reseller",
      buyer: "Global game studio",
      asset: "Character and product likeness bundle",
      status: "rejected",
      next: "The buyer should not pay because the seller cannot grant the requested rights.",
    },
  ],
  ko: [
    {
      name: "배우 출연 승인",
      seller: "Aster Rights Studio",
      buyer: "Luma Seoul Production",
      asset: "Mina Park 출연 에셋",
      status: "approved",
      next: "구매자는 승인된 URL 2곳에서만 공개할 수 있습니다.",
    },
    {
      name: "명품 제품 배치",
      seller: "Maison Aureline Brand Office",
      buyer: "Nocturne Campaign Team",
      asset: "Nocturne leather bag",
      status: "reviewing",
      next: "인증서를 활성화하기 전 브랜드 법무팀이 최종 편집본을 승인해야 합니다.",
    },
    {
      name: "차단된 재판매 주장",
      seller: "미검증 리셀러",
      buyer: "Global game studio",
      asset: "캐릭터·제품 초상 번들",
      status: "rejected",
      next: "판매자가 요청 권리를 부여할 수 없으므로 구매자는 결제하면 안 됩니다.",
    },
  ],
} satisfies Record<Locale, Array<{ name: string; seller: string; buyer: string; asset: string; status: string; next: string }>>;

export function GuidedWorkspace({ locale = "en" }: { locale?: Locale }) {
  const pending = projects.filter((project) => !["approved", "revoked"].includes(project.status)).length;
  const approved = certificates.filter((certificate) => certificate.status === "active").length;
  const held = ledger.filter((entry) => entry.status === "held").reduce((sum, entry) => sum + entry.amount, 0);
  const prefix = locale === "ko" ? "/ko" : "";
  const guides = roleGuides[locale];
  const rooms = dealRooms[locale];

  return (
    <AppContent
      locale={locale}
      stats={[
        [locale === "ko" ? "진행 중인 검수" : "Open reviews", String(pending), locale === "ko" ? "결정이 필요한 요청" : "Requests needing a decision"],
        [locale === "ko" ? "활성 인증서" : "Active certificates", String(approved), locale === "ko" ? `${certificates.length}개 공개 기록 중` : `Out of ${certificates.length} public records`],
        [locale === "ko" ? "관리 에셋" : "Managed assets", String(talents.length), locale === "ko" ? "사람/제품 에셋 샘플" : "People and product samples"],
        [locale === "ko" ? "보류 금액" : "Held amount", formatCurrency(held), locale === "ko" ? "승인 후 릴리즈" : "Released after approval"],
      ]}
      guides={guides}
      rooms={rooms}
      prefix={prefix}
    />
  );
}

function AppContent({
  locale,
  stats,
  guides,
  rooms,
  prefix,
}: {
  locale: Locale;
  stats: string[][];
  guides: (typeof roleGuides)["en"];
  rooms: (typeof dealRooms)["en"];
  prefix: string;
}) {
  return (
    <>
      <SectionHeader
        eyebrow={locale === "ko" ? "따라하기 워크스페이스" : "Guided workspace"}
        title={locale === "ko" ? "내 역할을 고르면 다음 행동이 보입니다." : "Choose your role, then follow the next action."}
        description={
          locale === "ko"
            ? "판매자, 구매자, 브랜드, 검수자가 같은 서비스를 다른 시점에서 이해할 수 있도록 체크리스트와 샘플 거래 공간을 먼저 보여줍니다."
            : "Seller, buyer, brand, and reviewer journeys are separated so each user sees what to do, what to check, and where the proof appears."
        }
        aside={<Link href={`${prefix}/scenarios`} className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">{locale === "ko" ? "샘플 거래 보기" : "Open sample transactions"}</Link>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value, detail]) => <Stat key={label} label={label} value={value} detail={detail} />)}
      </div>

      <section className="mt-6 grid gap-4 xl:grid-cols-4">
        {guides.map((guide, index) => (
          <Panel key={guide.role} className={index === 0 ? "bg-[#17211f] text-white" : ""}>
            <div className="flex h-full flex-col">
              <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${index === 0 ? "text-[#d4b477]" : "text-[#8b6234]"}`}>{guide.role}</p>
              <h2 className={`mt-3 text-xl font-semibold leading-7 ${index === 0 ? "text-white" : "text-[#21312e]"}`}>{guide.title}</h2>
              <p className={`mt-3 text-sm leading-6 ${index === 0 ? "text-white/62" : "text-[#64706d]"}`}>{guide.copy}</p>
              <ol className="mt-5 space-y-2">
                {guide.steps.map((step, stepIndex) => (
                  <li key={step} className={`flex gap-3 text-sm ${index === 0 ? "text-white/74" : "text-[#53605c]"}`}>
                    <span className={`font-mono text-xs ${index === 0 ? "text-[#d4b477]" : "text-[#9b713d]"}`}>0{stepIndex + 1}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <Link href={guide.href} className={`mt-6 inline-flex justify-center px-4 py-2.5 text-sm font-semibold ${index === 0 ? "bg-[#d4b477] text-[#111817] hover:bg-[#e3c98f]" : "bg-[#253b37] text-white hover:bg-[#31504a]"}`}>
                {guide.action}
              </Link>
            </div>
          </Panel>
        ))}
      </section>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Panel>
          <PanelHeader
            eyebrow={locale === "ko" ? "샘플 거래 공간" : "Sample deal rooms"}
            title={locale === "ko" ? "판매자와 구매자가 같은 거래를 각자 다른 시점으로 봅니다." : "Seller and buyer see the same deal from different sides."}
            description={locale === "ko" ? "피칭과 UX 테스트에서는 이 3개 케이스만 따라가도 핵심 흐름을 설명할 수 있습니다." : "These three cases make the product explainable without asking users to decode internal menus."}
          />
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {rooms.map((room) => (
              <article key={room.name} className="border border-[#ddd6cc] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-[#21312e]">{room.name}</h3>
                  <StatusPill status={room.status} locale={locale} />
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <Meta label={locale === "ko" ? "판매자" : "Seller"} value={room.seller} />
                  <Meta label={locale === "ko" ? "구매자" : "Buyer"} value={room.buyer} />
                  <Meta label={locale === "ko" ? "에셋" : "Asset"} value={room.asset} />
                </dl>
                <p className="mt-4 border-t border-[#e5ded5] pt-3 text-sm leading-6 text-[#64706d]">{room.next}</p>
              </article>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader eyebrow={locale === "ko" ? "빠른 길찾기" : "Quick paths"} title={locale === "ko" ? "목적별로 바로 이동" : "Jump by intent"} />
          <div className="mt-4 space-y-3">
            <QuickLink href={`${prefix}/projects/new`} title={locale === "ko" ? "에셋 검수 요청" : "Request asset verification"} copy={locale === "ko" ? "판매자나 제작자가 결과물과 사용 범위를 제출합니다." : "Seller or creator submits output and usage scope."} />
            <QuickLink href={`${prefix}/verify`} title={locale === "ko" ? "정품 인증 확인" : "Verify a certificate"} copy={locale === "ko" ? "구매자가 결제 또는 공개 전 상태와 URL을 확인합니다." : "Buyer checks status and approved URLs before payment or release."} />
            <QuickLink href={`${prefix}/brand-assets/new`} title={locale === "ko" ? "제품 배치 에셋 준비" : "Prepare product placement asset"} copy={locale === "ko" ? "브랜드가 제품, 시장, 배치 채널, 검수 단계를 선택합니다." : "Brand selects product, market, placement channel, and review level."} />
            <QuickLink href={`${prefix}/reviews/project-01`} title={locale === "ko" ? "요청 검수" : "Review a request"} copy={locale === "ko" ? "검수자가 증거와 사용 규칙을 비교해 결정을 기록합니다." : "Reviewer compares evidence and usage rules, then records a decision."} />
          </div>
          <Notice tone="neutral">
            {locale === "ko"
              ? "이 화면은 도움말이 아니라 기본 내비게이션입니다. 사용자가 처음 들어와도 무엇을 해야 하는지 바로 보여주는 것이 목표입니다."
              : "This page is the navigation, not a hidden help center. The goal is to make the next step visible before users ask what to do."}
          </Notice>
        </Panel>
      </div>
    </>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-[#eee8df] pb-2">
      <dt className="text-[#7a746c]">{label}</dt>
      <dd className="text-right font-medium text-[#31403d]">{value}</dd>
    </div>
  );
}

function QuickLink({ href, title, copy }: { href: string; title: string; copy: string }) {
  return (
    <Link href={href} className="block border border-[#d8d0c4] bg-white p-4 hover:border-[#a8844f] hover:bg-[#f4efe7]">
      <p className="font-semibold text-[#21312e]">{title}</p>
      <p className="mt-1 text-sm leading-5 text-[#64706d]">{copy}</p>
    </Link>
  );
}
