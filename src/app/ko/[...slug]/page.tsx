import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { CertificateLookup } from "@/components/certificate-lookup";
import { DemoReservation } from "@/components/demo-reservation";
import { LanguageSwitch } from "@/components/language-switch";
import { ReviewDecisionConsole } from "@/components/review-decision-console";
import { SubmissionWorkspace } from "@/components/submission-workspace";
import { MetaRow, Notice, Panel, PanelHeader, SectionHeader, Stat, StatusPill } from "@/components/ui";
import { brand } from "@/lib/brand";
import {
  certificates,
  findCertificate,
  findProject,
  findTalent,
  formatCurrency,
  formatCurrencyKrw,
  getAuditLogsForProject,
  getProject,
  getTalent,
  isApprovedSourceUrl,
  ledger,
  licenseMultipliers,
  platformRevenueLines,
  projects,
  talentCommercialTiers,
  talents,
} from "@/lib/mock-data";

const projectUseKo: Record<string, string> = {
  "Premium campaign film and social cutdowns": "프리미엄 캠페인 필름 및 소셜 컷다운",
  "Interactive dealership screen": "인터랙티브 매장 디스플레이",
  "Streaming teaser and press microsite": "스트리밍 티저 및 프레스 마이크로사이트",
  "Virtual event host pilot": "가상 이벤트 호스트 파일럿",
  "Seasonal lookbook microsite": "시즌 룩북 마이크로사이트",
};

const categoryKo: Record<string, string> = {
  Actor: "배우",
};

const ledgerTypeKo: Record<string, string> = {
  license: "라이선스",
  review_fee: "검수비",
  royalty: "로열티",
};

const revenuePartyKo: Record<string, string> = {
  buyer: "구매자",
  seller: "판매자",
  both: "양측",
  enterprise: "엔터프라이즈",
};

const certificateStatusKo: Record<string, string> = {
  active: "활성",
  revoked: "철회",
  expired: "만료",
};

function koUse(value: string) {
  return projectUseKo[value] ?? value;
}

function koCategory(value: string) {
  return categoryKo[value] ?? value;
}

export default async function KoreanRoute({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ source?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const [first, second, third] = slug;

  if (first === "operations" && slug.length === 1) return <OperationsKo />;
  if (first === "agency" && slug.length === 1) return <AgencyKo />;
  if (first === "pricing-model" && slug.length === 1) return <PricingModelKo />;
  if (first === "settlements" && slug.length === 1) return <SettlementsKo />;
  if (first === "brand-assets" && slug.length === 1) return <BrandAssetsKo />;
  if (first === "brand-assets" && second === "new" && slug.length === 2) return <NewBrandAssetKo />;
  if (first === "business-plan" && slug.length === 1) return <KoreanInfoPage eyebrow="피칭 / 내부 자료" title="180일 사업 실행계획" description="사용자에게 공개되는 일반 메뉴가 아니라 투자자 데모와 창업자 운영 점검을 위한 내부 자료입니다." />;
  if (first === "infrastructure" && slug.length === 1) return <KoreanInfoPage eyebrow="피칭 / 내부 자료" title="인프라 구성" description="Google 로그인, 비공개 저장소, 한국·글로벌 결제 제공자 구성을 설명하는 내부 검토 화면입니다." />;
  if (first === "authenticity" && slug.length === 1) return <KoreanInfoPage eyebrow="정품 인증 기준" title="정품은 하나의 배지가 아니라 증거의 연결입니다." description="판매자 신원, 권한, 에셋 출처, 파일 무결성, 거래 범위, 승인 URL, 현재 상태를 분리해 확인합니다." />;
  if (first === "trust" && slug.length === 1) return <KoreanInfoPage eyebrow="신뢰와 검증" title="인증서가 증명하는 것과 증명하지 않는 것을 구분합니다." description="인증서는 승인된 프로젝트와 URL에만 유효하며, 모든 법적 권리를 보증하는 일반 의견서가 아닙니다." />;
  if (first === "privacy" && slug.length === 1) return <KoreanInfoPage eyebrow="개인정보" title="개인정보 처리방침 초안" description="운영 법인, 보관 기간, 처리위탁, 국외 이전, 정보주체 권리는 실제 출시 전 법률 검토 후 확정합니다." />;
  if (first === "terms" && slug.length === 1) return <KoreanInfoPage eyebrow="이용 조건" title="데모 이용 조건" description="현재 서비스는 제품 데모이며, 실제 라이선스·결제·상업 인증을 실행하지 않습니다." />;
  if (first === "scenarios" && slug.length === 1) return <KoreanInfoPage eyebrow="거래 UX 실험" title="구매자, 판매자, 레지스트리가 주고받는 것을 검토합니다." description="정품 에셋 거래에서 각 당사자가 제공하는 정보, 받는 권리, 인증 증거, 중단 조건을 시뮬레이션합니다." />;
  if (first === "launch-readiness" && slug.length === 1) return <KoreanInfoPage eyebrow="피칭 / 내부 자료" title="상용 출시 게이트" description="실제 결제, 인증서 발급, 운영자 온보딩을 켜기 전 충족해야 할 조건을 점검하는 내부 화면입니다." />;
  if (first === "login" && slug.length === 1) return <KoreanInfoPage eyebrow="보안 워크스페이스" title="Google 계정으로 접속합니다." description="로그인은 계정 접근만 확인하며, 판매자·구매자·검수자 권한과 에셋 소유권은 별도 승인되어야 합니다." />;
  if (first === "verify" && slug.length === 1) return <VerifyKo />;
  if (first === "checkout" && slug.length === 1) return <CheckoutKo />;
  if (first === "projects" && second === "new" && slug.length === 2) return <NewProjectKo />;
  if (first === "reviews" && second && slug.length === 2) return <ReviewKo id={second} />;
  if (first === "certificates" && second && slug.length === 2) return <CertificateKo id={second} source={query.source} />;
  if (first === "talents" && second && third === "policy" && slug.length === 3) return <PolicyKo id={second} />;

  notFound();
}

function KoreanInfoPage({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      <Panel>
        <PanelHeader title="한국어 버전 준비 상태" description="이 화면은 언어 전환 흐름이 끊기지 않도록 한국어 요약을 제공합니다. 상세 운영 문서는 저장소의 한국어 문서를 기준으로 관리합니다." />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <Notice tone="neutral">일반 사용자에게 필요한 내용과 피칭/운영자 전용 내용을 분리해 표시합니다.</Notice>
          <Notice tone="neutral">정품성 표현은 승인 범위와 URL에 묶어 사용합니다.</Notice>
          <Notice tone="warning">법률 문서는 실제 출시 전 변호사 검토 후 교체해야 합니다.</Notice>
        </div>
      </Panel>
    </AppShell>
  );
}

function BrandAssetsKo() {
  const assets = [
    ["Maison Aureline", "Nocturne leather bag", "럭셔리 액세서리", "KR, JP, US", "브랜드 권한 확인"],
    ["Prism Atelier", "Archive silk scarf", "패션 아카이브", "Global excluding CN", "배치 준비"],
    ["Crown & Vale", "Signature chronograph", "시계", "KR, EU, US", "증빙 검토"],
  ];

  return (
    <AppShell locale="ko">
      <SectionHeader
        eyebrow="브랜드 제품 배치"
        title="명품·브랜드 제품이 영상 속에 공식적으로 등장했는지 인증합니다."
        description="VIP 브랜드는 제품 정체성, 브랜드 권한, 승인된 장면과 사용 범위, 정품 주장을 할 수 있는 정확한 URL을 등록합니다."
        aside={<Link href="/ko/brand-assets/new" className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">제품 등록 준비</Link>}
      />
      <Notice tone="neutral">브랜드 제품이 진짜라는 사실과 특정 영상에 배치할 권한은 별개입니다. 인증서는 두 가지를 분리해 보여줘야 합니다.</Notice>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat label="브랜드 발급자" value="3" detail="브랜드가 통제하는 프로필" />
        <Stat label="배치 검수" value="12" detail="URL과 범위 기준" />
        <Stat label="공개 주장" value="0" detail="법률 승인 전 공개 금지" />
      </div>
      <Panel className="mt-6">
        <PanelHeader eyebrow="제품 에셋 보관함" title="브랜드가 통제하는 제품 에셋" description="제품 기록은 정품 제품 식별과 특정 영상 배치 승인 권한을 분리합니다." />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-[#d2cbc1] text-xs uppercase tracking-[0.12em] text-[#827d75]"><tr><th className="py-3">브랜드</th><th className="py-3">제품</th><th className="py-3">분류</th><th className="py-3">시장</th><th className="py-3">상태</th></tr></thead>
            <tbody className="divide-y divide-[#e1dbd2]">{assets.map(([brandName, product, category, market, status]) => <tr key={`${brandName}-${product}`}><td className="py-4 font-semibold text-[#21312e]">{brandName}</td><td className="py-4 text-[#64706d]">{product}</td><td className="py-4 text-[#64706d]">{category}</td><td className="py-4 text-[#64706d]">{market}</td><td className="py-4 text-[#8b6234]">{status}</td></tr>)}</tbody>
          </table>
        </div>
      </Panel>
    </AppShell>
  );
}

function NewBrandAssetKo() {
  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="브랜드 에셋 등록" title="제품 배치 인증을 위한 정보를 준비합니다." description="반복되는 값은 직접 입력하지 않고 선택하도록 구성합니다. 고유한 제품명과 URL만 수동 입력합니다." />
      <Panel>
        <PanelHeader eyebrow="제품 정보" title="선택형 등록 초안" />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block"><Label>브랜드명</Label><input className="field" placeholder="브랜드 공식 발급자" /></label>
          <label className="block"><Label>제품명</Label><input className="field" placeholder="제품명, 에디션, SKU 패밀리" /></label>
          <KoSelect label="제품 분류" values={["럭셔리 액세서리", "패션", "시계", "뷰티", "차량", "전자제품"]} />
          <KoSelect label="승인 시장" values={["KR", "JP", "US", "EU", "Global", "Global excluding CN"]} />
          <KoSelect label="배치 채널" values={["자사 소셜", "유료 디지털 광고", "캠페인 마이크로사이트", "스트리밍 티저", "OTT / 방송", "옥외 광고"]} />
          <KoSelect label="검수 단계" values={["브랜드 매니저 검수", "법무 검수", "이중 승인", "임원 승인"]} />
        </div>
      </Panel>
    </AppShell>
  );
}

function KoSelect({ label, values }: { label: string; values: string[] }) {
  return <label className="block"><Label>{label}</Label><select className="field" defaultValue=""><option value="">선택</option>{values.map((value) => <option key={value}>{value}</option>)}</select></label>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{children}</span>;
}

function OperationsKo() {
  const pending = projects.filter((project) => !["approved", "revoked"].includes(project.status)).length;
  const approved = certificates.filter((certificate) => certificate.status === "active").length;
  const held = ledger.filter((entry) => entry.status === "held").reduce((sum, entry) => sum + entry.amount, 0);

  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="운영 대시보드" title="사람과 브랜드 에셋의 공식 등장을 승인합니다." description="완성된 영상·제품 배치 결과물을 검수하고, 결정을 기록하며, 공개 인증서 페이지를 발행하는 권리자 중심 워크스페이스입니다." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="대기 중인 검수" value={String(pending)} detail="권리자 큐 기준" />
        <Stat label="활성 인증서" value={String(approved)} detail={`총 ${certificates.length}개 공개 기록`} />
        <Stat label="관리 에셋" value={String(talents.length)} detail="정책 기반 프로필" />
        <Stat label="보류 금액" value={formatCurrency(held)} detail="승인 후 릴리즈" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
        <Panel>
          <PanelHeader eyebrow="검수 큐" title="검수 커맨드 센터" description="위험도, 정책 적합성, 인증 준비 상태를 기준으로 제출물을 우선순위화합니다." action={<Link href="/ko/reviews/project-01" className="bg-[#c9a86c] px-4 py-2 text-sm font-semibold text-[#182321]">검수 열기</Link>} />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-[#d5cec5] text-xs uppercase tracking-[0.12em] text-[#7e7971]">
                <tr><th className="py-3">프로젝트</th><th className="py-3">배우</th><th className="py-3">사용 목적</th><th className="py-3">상태</th><th className="py-3">예산</th></tr>
              </thead>
              <tbody className="divide-y divide-[#e1dbd2]">
                {projects.map((project) => {
                  const talent = talents.find((item) => item.id === project.talentId);
                  return <tr key={project.id}><td className="py-4 font-medium">{project.title}</td><td className="py-4 text-[#67716e]">{talent?.name}</td><td className="py-4 text-[#67716e]">{koUse(project.intendedUse)}</td><td className="py-4"><StatusPill status={project.status} locale="ko" /></td><td className="py-4 text-[#67716e]">{formatCurrency(project.budget)}</td></tr>;
                })}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <PanelHeader eyebrow="참조" title="승인 워크플로우" />
          <div className="mt-4 space-y-4 text-sm">
            {["완성 결과물 제출", "정책 및 리스크 검토", "배우 측 결정 기록", "인증서 발급", "사용 및 정산 추적"].map((item, index) => (
              <div key={item} className="flex gap-3 border-b border-[#e1dbd2] pb-3"><span className="font-mono text-xs text-[#9b713d]">0{index + 1}</span><p className="text-[#56615e]">{item}</p></div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}

function AgencyKo() {
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const pendingReviews = talents.reduce((sum, talent) => sum + talent.pendingReviews, 0);

  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="권리자 대시보드" title="공개 전 공식 에셋 사용을 통제합니다." description="수요를 검토하고, 사람·제품·브랜드의 경계를 보호하며, 어떤 결과물이 공식 이름을 사용할 수 있는지 결정하는 운영 공간입니다." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="관리 에셋" value={String(talents.length)} detail="검증된 프로필" />
        <Stat label="대기 검수" value={String(pendingReviews)} detail="활성 정책 기준" />
        <Stat label="파이프라인 금액" value={formatCurrency(totalBudget)} detail="제출 프로젝트 예산" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {talents.map((talent) => (
          <Panel key={talent.id}>
            <PanelHeader eyebrow={talent.agency} title={talent.name} action={<Link href={`/ko/talents/${talent.id}/policy`} className="border border-[#b9afa1] px-3 py-2 text-xs font-semibold text-[#31403d] hover:bg-[#e1dbd2]">정책 열기</Link>} />
            <div className="flex items-start justify-between gap-4">
              <p className="mt-4 text-sm text-[#625d55]">{koCategory(talent.category)} / {talent.territory}</p>
              <div className="rounded border border-[#d8cebf] bg-white px-3 py-2 text-right"><p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">점수</p><p className="text-xl font-semibold text-[#16302b]">{talent.reputationScore}</p></div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded border border-[#e1d8ca] bg-white p-3"><p className="text-xs text-[#837c71]">활성 라이선스</p><p className="mt-1 text-lg font-semibold">{talent.activeLicenses}</p></div>
              <div className="rounded border border-[#e1d8ca] bg-white p-3"><p className="text-xs text-[#837c71]">최소 비용</p><p className="mt-1 text-lg font-semibold">{formatCurrency(talent.policy.minimumLicenseFee)}</p></div>
            </div>
          </Panel>
        ))}
      </div>
    </AppShell>
  );
}

function PricingModelKo() {
  const accessibleEntry = talentCommercialTiers[0].baseLicenseFeeKrw[0];
  const iconCeiling = talentCommercialTiers[talentCommercialTiers.length - 1].baseLicenseFeeKrw[1];
  const range = (value: [number, number]) => `${formatCurrencyKrw(value[0])} - ${formatCurrencyKrw(value[1])}`;

  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="2026 가격 모델" title="배우 가치, 사용 범위, 신뢰 운영 부담을 기준으로 공식 AI 출연 가격을 책정합니다." description="이 mock 모델은 생성 비용과 상업 권리를 분리합니다. 판매자는 동의, 평판 리스크, 희소성, 승인 노동에 대해 보상받고 구매자는 예측 가능한 범위와 인증서를 얻습니다." />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="입문 라이선스" value={formatCurrencyKrw(accessibleEntry)} detail="신인/성장 배우, 제한 캠페인" />
        <Stat label="등급 기준" value={String(talentCommercialTiers.length)} detail="KRW 기반 4단계" />
        <Stat label="상위 맞춤 견적" value={`${formatCurrencyKrw(iconCeiling)}+`} detail="아이콘 등급 엔터프라이즈 협상 전" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Panel>
          <PanelHeader eyebrow="배우 등급" title="판매자와 구매자가 모두 이해할 수 있는 가격대" description="등급은 필모그래피, 대중 인지도, 신뢰도, 카테고리 충돌, 지역, 독점성, 검수 부담을 가중 평가해 배정합니다." />
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[980px] text-left text-sm">
              <thead className="border-b border-[#ded8cd] text-xs uppercase tracking-[0.12em] text-[#837c71]"><tr><th className="py-3">등급</th><th className="py-3">기본 라이선스</th><th className="py-3">검수비</th><th className="py-3">제한 렌탈</th><th className="py-3">플랫폼 수수료</th><th className="py-3">판매자 정산</th></tr></thead>
              <tbody className="divide-y divide-[#e4ded4]">
                {talentCommercialTiers.map((tier) => <tr key={tier.id} className="align-top"><td className="py-4"><p className="font-semibold text-[#21312e]">{translateTier(tier.name)}</p><p className="mt-1 text-xs text-[#7a746c]">점수 {tier.scoreRange}</p><p className="mt-2 max-w-[230px] text-xs leading-5 text-[#6c7773]">{translateTierProfile(tier.id)}</p></td><td className="py-4 font-medium">{range(tier.baseLicenseFeeKrw)}</td><td className="py-4 text-[#625d55]">{range(tier.reviewFeeKrw)}</td><td className="py-4 text-[#625d55]">{range(tier.controlledRentalMonthlyKrw)} / 월</td><td className="py-4 text-[#625d55]">{tier.platformServiceFeePercent}%</td><td className="py-4 text-[#625d55]">최소 {tier.minimumSellerPayoutPercent}%</td></tr>)}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel>
          <PanelHeader eyebrow="평가 기준" title="등급 배정 규칙" />
          <div className="mt-4 space-y-4 text-sm">
            {["필모그래피: 주연/조연 크레딧, 최근성, 장르 권위, 수상 및 언론 인지도.", "시장 인지도: 검색 수요, 소셜 도달 품질, 지역/글로벌 인지도.", "신뢰와 리스크: 브랜드 안정성, 보증 민감도, 정책 제한.", "희소성: 독점성 압력, 경쟁 브랜드 충돌, AI 출연 허용 의지.", "운영 부담: 검수 SLA, 산출물 수, 음성 포함, URL 모니터링 부담."].map((item, index) => <div key={item} className="border-b border-[#e1dbd2] pb-3"><p className="font-mono text-xs text-[#9b713d]">0{index + 1}</p><p className="mt-1 leading-5 text-[#65706c]">{item}</p></div>)}
          </div>
        </Panel>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel><PanelHeader eyebrow="사용 배율" title="상업 노출 범위에 따라 가격을 조정합니다." description="구매자는 승인 요청 전에 견적이 왜 달라지는지 이해해야 합니다." /><div className="mt-5 grid gap-3">{licenseMultipliers.map((item) => <div key={item.id} className="grid gap-3 border border-[#e1dbd2] bg-white p-4 sm:grid-cols-[150px_90px_1fr]"><p className="font-semibold text-[#21312e]">{translateMultiplier(item.id)}</p><p className="font-mono text-sm text-[#8b6234]">{item.multiplier}</p><p className="text-sm leading-5 text-[#64706d]">{translateMultiplierReason(item.id)}</p></div>)}</div></Panel>
        <Panel><PanelHeader eyebrow="비즈니스 모델" title="미승인 사용을 조장하지 않고 수익화합니다." description="수익은 검증 워크플로우, 인증, 모니터링, 거래 인프라에서 발생해야 합니다." /><div className="mt-5 space-y-3">{platformRevenueLines.map((line) => <div key={line.id} className="border border-[#e1dbd2] bg-white p-4"><div className="flex flex-col justify-between gap-2 sm:flex-row"><p className="font-semibold text-[#21312e]">{translateRevenueLine(line.id)}</p><p className="text-sm font-semibold text-[#8b6234]">{line.rate}</p></div><p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#837c71]">청구 대상: {revenuePartyKo[line.chargedTo] ?? line.chargedTo}</p><p className="mt-2 text-sm leading-5 text-[#64706d]">{translateRevenueWhen(line.id)}</p></div>)}</div></Panel>
      </div>
    </AppShell>
  );
}

function SettlementsKo() {
  const total = ledger.reduce((sum, entry) => sum + entry.amount, 0);
  const held = ledger.filter((entry) => entry.status === "held").reduce((sum, entry) => sum + entry.amount, 0);
  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="정산 장부" title="승인된 배우 사용에 연결된 금액을 추적합니다." description="첫 버전은 검수비, 라이선스 비용, 로열티, 상태, 연결 프로젝트를 단순 장부로 관리합니다." />
      <div className="mb-6 grid gap-4 sm:grid-cols-3"><Stat label="장부 총액" value={formatCurrency(total)} detail="기록된 항목 기준" /><Stat label="보류 금액" value={formatCurrency(held)} detail="승인 릴리즈 대기" /><Stat label="장부 항목" value={String(ledger.length)} detail="라이선스 및 검수비" /></div>
      <Panel><PanelHeader eyebrow="재무 기록" title="라이선스 및 검수비 장부" description="프로젝트, 배우, 금액별 정산 상태를 확인합니다." /><div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="border-b border-[#ded8cd] text-xs uppercase tracking-[0.12em] text-[#837c71]"><tr><th className="py-3">일자</th><th className="py-3">프로젝트</th><th className="py-3">배우</th><th className="py-3">유형</th><th className="py-3">상태</th><th className="py-3 text-right">금액</th></tr></thead><tbody className="divide-y divide-[#e4ded4]">{ledger.map((entry) => { const project = getProject(entry.projectId); const talent = getTalent(entry.talentId); return <tr key={entry.id}><td className="py-4 text-[#625d55]">{entry.date}</td><td className="py-4 font-medium">{project.title}</td><td className="py-4 text-[#625d55]">{talent.name}</td><td className="py-4 text-[#625d55]">{ledgerTypeKo[entry.type] ?? entry.type}</td><td className="py-4"><StatusPill status={entry.status} locale="ko" /></td><td className="py-4 text-right font-semibold">{formatCurrency(entry.amount)}</td></tr>; })}</tbody></table></div></Panel>
    </AppShell>
  );
}

function VerifyKo() {
  return <AppShell locale="ko"><SectionHeader eyebrow="공개 신뢰" title="출연 인증서를 조회합니다." description="공식 AI 출연 주장에 의존하기 전에 현재 인증서 상태를 확인하세요." /><div className="grid gap-6 lg:grid-cols-[1fr_0.7fr]"><Panel><PanelHeader eyebrow="인증서 조회" title="공개 인증서 ID 입력" description="활성 데모 기록: cert-2026-0007" /><CertificateLookup locale="ko" /></Panel><div className="space-y-4"><Notice tone="neutral">유효한 인증서도 승인된 게시 URL에만 적용됩니다. 인증서 페이지의 URL allowlist를 확인하세요.</Notice><Notice tone="warning">철회되거나 만료된 기록은 투명성을 위해 남지만 활성 승인처럼 표시하면 안 됩니다.</Notice></div></div></AppShell>;
}

function NewProjectKo() {
  return <AppShell locale="ko"><SectionHeader eyebrow="제작자 제출" title="공식 출연 검수를 준비합니다." description="완성된 AI 결과물, 지원 기록, 배우 팀이 검토할 정확한 권리 범위를 제출합니다." /><SubmissionWorkspace locale="ko" /></AppShell>;
}

function CheckoutKo() {
  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10"><div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8"><Link href="/ko" className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">{brand.shortName}</span><span className="text-sm font-semibold uppercase tracking-[0.16em]">{brand.name}</span></Link><div className="flex items-center gap-3"><p className="hidden text-xs uppercase tracking-[0.14em] text-white/45 sm:block">안전한 검수 예약</p><LanguageSwitch locale="ko" /></div></div></header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:py-20">
        <section><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">제작자 온보딩</p><h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">공식 에셋 검수를 예약합니다.</h1><p className="mt-5 max-w-xl text-base leading-7 text-white/62">검수 예약금부터 시작합니다. 실제 결제가 활성화되면 다음 단계에서 Stripe Checkout을 열고 프로젝트 제출로 돌아옵니다.</p><ol className="mt-10 space-y-5 border-t border-white/12 pt-6 text-sm text-white/72"><li className="flex gap-4"><span className="font-mono text-[#d4b477]">01</span><span>검수 슬롯을 예약합니다.</span></li><li className="flex gap-4"><span className="font-mono text-[#d4b477]">02</span><span>완성된 미디어 또는 제품 배치 패키지를 제출합니다.</span></li><li className="flex gap-4"><span className="font-mono text-[#d4b477]">03</span><span>승인, 수정 요청, 또는 문서화된 반려를 받습니다.</span></li></ol></section>
        <aside className="self-start border border-white/14 bg-[#182321] p-5 sm:p-7"><p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">주문 요약</p><div className="mt-6 border-b border-white/12 pb-5"><div className="flex justify-between gap-4"><div><p className="font-semibold">프로젝트 검수 예약금</p><p className="mt-1 text-sm text-white/52">완성된 출연 또는 제품 배치 결과물 1건</p></div><p className="font-semibold">$2,500</p></div></div><div className="flex justify-between gap-4 py-5 text-sm"><span className="text-white/62">오늘 결제 예정</span><span className="text-lg font-semibold">$2,500 USD</span></div><DemoReservation locale="ko" /></aside>
      </div>
    </main>
  );
}

function ReviewKo({ id }: { id: string }) {
  const project = findProject(id);
  if (!project) notFound();
  const talent = findTalent(project.talentId);
  if (!talent) notFound();
  const auditLogs = getAuditLogsForProject(project.id);
  const certificate = project.certificateId ? findCertificate(project.certificateId) : null;

  return (
    <AppShell locale="ko">
      <SectionHeader eyebrow="제출된 AI 영상 검수" title={project.title} description="제출 결과물을 배우 정책과 비교한 뒤 승인, 반려, 수정 요청, 철회를 기록하는 검수자 워크스페이스입니다." aside={<StatusPill status={project.status} locale="ko" />} />
      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <Panel><PanelHeader eyebrow="보안 스크리너" title="제출된 최종 결과물 검수" description="결정을 기록하기 전에 선언된 권리 범위와 배우 정책을 비교합니다." /><div className="mt-5 aspect-video border border-[#d6cdbf] bg-[#111817] p-5 text-white"><div className="flex h-full flex-col justify-between"><div className="flex items-center justify-between"><span className="border border-white/25 px-3 py-1 text-xs">보안 스크리너 준비 중</span><StatusPill status={project.status} locale="ko" /></div><div><p className="text-2xl font-semibold">{project.title}</p><p className="mt-2 max-w-xl text-sm text-white/70">영상 재생, 프레임 코멘트, 모델 출처 검사는 이후 이 영역에 연결됩니다.</p></div></div></div><div className="mt-5 grid gap-3 sm:grid-cols-2"><DecisionCardKo title="승인" copy="인증서를 발급하고 라이선스 조건을 릴리즈합니다." /><DecisionCardKo title="수정 요청" copy="검수비를 보류한 상태로 수정 메모를 보냅니다." /><DecisionCardKo title="반려" copy="인증을 차단하고 정책 사유를 기록합니다." /><DecisionCardKo title="철회" copy="발급된 인증서를 비활성화하고 audit log에 사유를 보존합니다." /></div><ReviewDecisionConsole projectId={project.id} initialStatus={project.status} locale="ko" /></Panel>
        <div className="grid gap-5"><Panel><PanelHeader eyebrow="결정 맥락" title="제출 정보" /><dl className="mt-3"><MetaRow label="배우" value={talent.name} /><MetaRow label="제작자" value={project.producer} /><MetaRow label="지역" value={project.territory} /><MetaRow label="기간" value={project.duration} /><MetaRow label="예산" value={formatCurrency(project.budget)} /></dl></Panel><Panel><PanelHeader eyebrow="검수자 주의" title="리스크와 메모" /><div className="mt-3 space-y-2 text-sm">{[...project.riskFlags, ...project.reviewerNotes].map((item) => <Notice key={item} tone="warning">{translateReviewNote(item)}</Notice>)}</div>{project.certificateId ? <Link href={`/ko/certificates/${project.certificateId}`} className="mt-4 inline-flex rounded bg-[#16302b] px-4 py-2 text-sm font-semibold text-white">공개 인증서 보기</Link> : null}</Panel>{certificate ? <Panel><PanelHeader eyebrow="공개 신뢰" title="발급 인증서" /><div className="flex items-center justify-between gap-3"><p className="mt-3 font-mono text-sm text-[#31554f]">{certificate.id}</p><StatusPill status={certificate.status} locale="ko" /></div><p className="mt-2 text-sm text-[#625d55]">승인 게시 URL {certificate.approvedUrls.length}개</p></Panel> : null}<Panel><PanelHeader eyebrow="변경 불가능한 이력" title="감사 로그" /><div className="mt-3 space-y-3">{auditLogs.map((entry) => <div key={entry.id} className="rounded border border-[#e1d8ca] bg-white p-3"><div className="flex flex-wrap items-center justify-between gap-2"><StatusPill status={entry.action} locale="ko" /><time className="text-xs text-[#837c71]">{entry.createdAt}</time></div><p className="mt-2 text-sm font-medium">{entry.actorName}</p><p className="mt-1 text-sm leading-5 text-[#625d55]">{translateAuditNote(entry.note)}</p></div>)}</div></Panel></div>
      </div>
    </AppShell>
  );
}

function CertificateKo({ id, source }: { id: string; source?: string | string[] }) {
  const certificate = findCertificate(id);
  if (!certificate) notFound();
  const project = findProject(certificate.projectId);
  if (!project) notFound();
  const talent = findTalent(project.talentId);
  if (!talent) notFound();
  const claimedSourceUrl = Array.isArray(source) ? source[0] : source;
  const sourceMatches = claimedSourceUrl ? isApprovedSourceUrl(certificate, claimedSourceUrl) : null;

  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8"><Link href="/ko" className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">{brand.shortName}</span><span className="text-xs font-semibold uppercase tracking-[0.14em]">{brand.name}</span></Link><div className="flex items-center gap-3"><Link href="/ko/verify" className="text-xs uppercase tracking-[0.14em] text-white/60 hover:text-white">인증서 조회</Link><LanguageSwitch locale="ko" /></div></div></header>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/12 pb-5"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">공개 에셋 인증서</p><StatusPill status={certificate.status} locale="ko" /></div><h1 className="mt-8 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl">{project.title} 공식 에셋 승인</h1><p className="mt-5 max-w-2xl text-base leading-7 text-white/60">이 공개 기록은 검수된 프로젝트, 대표 권리자, 승인 상태, 결정이 적용되는 정확한 게시 URL을 식별합니다.</p><div className="mt-10 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4"><Fact label="인증서" value={certificate.id} /><Fact label="권리 에셋" value={talent.name} /><Fact label="발급자" value={talent.agency} /><Fact label="만료일" value={certificate.expiresAt} /></div><div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.74fr]"><section className="border border-white/12 bg-[#182321] p-5 sm:p-7"><p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">승인 범위</p><p className="mt-4 text-base leading-7 text-white/72">{translateScope(certificate.licenseScope)}</p><div className="mt-7 border-t border-white/10 pt-5"><p className="text-xs uppercase tracking-[0.14em] text-white/42">승인된 게시 URL</p><div className="mt-3 space-y-3">{certificate.approvedUrls.map((url) => <p key={url} className="break-all border border-white/10 bg-[#111817] p-3 font-mono text-sm text-[#c6dfd4]">{url}</p>)}</div></div></section><section className="border border-white/12 bg-[#182321] p-5 sm:p-7"><p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">출처 URL 검증</p><p className="mt-3 text-sm leading-6 text-white/58">이 인증서를 주장하는 페이지를 입력하세요. 링크 복사는 다른 URL의 승인을 의미하지 않습니다.</p><form className="mt-5 space-y-3"><input name="source" type="url" defaultValue={claimedSourceUrl} placeholder="https://example.com/published-work" className="w-full border border-white/18 bg-[#111817] px-3 py-3 text-sm text-white placeholder:text-white/28" /><button className="bg-[#d4b477] px-4 py-2.5 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">출처 검증</button></form><VerificationResultKo claimedSourceUrl={claimedSourceUrl} sourceMatches={sourceMatches} status={certificate.status} /><div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs uppercase tracking-[0.14em] text-white/42">검증 해시</p><p className="mt-2 break-all font-mono text-sm text-[#c6dfd4]">{certificate.verificationHash}</p></div></section></div></div>
    </main>
  );
}

function PolicyKo({ id }: { id: string }) {
  const talent = findTalent(id);
  if (!talent) notFound();
  const { policy } = talent;
  return <AppShell locale="ko"><SectionHeader eyebrow="AI 출연 정책" title={`${talent.name} 승인 정책`} description="정책 설정은 제작자가 제출할 수 있는 범위, 에스컬레이션이 필요한 조건, 승인 결과물에 필요한 공개 고지를 정의합니다." /><div className="mb-6"><Notice tone="neutral">백엔드 출시 전 정책 변경은 버전 관리되어야 합니다. 기존 인증서는 승인 당시의 정책 snapshot을 유지해야 합니다.</Notice></div><div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"><Panel><PanelHeader eyebrow="정책 요약" title="상업적 가드레일" description="새 출연 검수 요청의 기본 기준을 설정합니다." /><div className="mt-4 space-y-4 text-sm"><label className="block"><span className="text-[#625d55]">검수 SLA</span><input defaultValue={policy.reviewSlaHours} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" /></label><label className="block"><span className="text-[#625d55]">최소 라이선스 비용</span><input defaultValue={formatCurrency(policy.minimumLicenseFee)} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" /></label><label className="block"><span className="text-[#625d55]">승인 지역</span><input defaultValue={talent.territory} className="mt-1 w-full rounded border border-[#cfc7ba] bg-white px-3 py-2" /></label></div><div className="mt-5 flex flex-wrap gap-3"><button className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">정책 초안 저장</button><button className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">인증서 조건 미리보기</button></div></Panel><div className="grid gap-5"><PolicyListKo title="허용 사용" items={policy.allowedUses} /><PolicyListKo title="제한 사용" items={policy.restrictedUses} /><PolicyListKo title="초상 경계" items={policy.likenessBoundaries} /><PolicyListKo title="필수 고지" items={policy.requiredDisclosures} /></div></div></AppShell>;
}

function DecisionCardKo({ title, copy }: { title: string; copy: string }) {
  return <div className="rounded border border-[#e1d8ca] bg-white p-4"><p className="font-semibold">{title}</p><p className="mt-1 text-sm text-[#625d55]">{copy}</p></div>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#182321] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/38">{label}</p><p className="mt-2 text-sm text-white/86">{value}</p></div>;
}

function VerificationResultKo({ claimedSourceUrl, sourceMatches, status }: { claimedSourceUrl?: string; sourceMatches: boolean | null; status: "active" | "revoked" | "expired" }) {
  if (!claimedSourceUrl) return <p className="mt-4 border border-white/12 bg-white/5 p-3 text-sm text-white/55">출처 URL을 입력하면 게시 범위를 확인할 수 있습니다.</p>;
  if (status !== "active") return <p className="mt-4 border border-[#a9615f] bg-[#4a2828] p-3 text-sm text-[#f2c2bd]">이 인증서는 {certificateStatusKo[status]} 상태입니다. 활성 승인처럼 표시하면 안 됩니다.</p>;
  return sourceMatches ? <p className="mt-4 border border-[#6f927f] bg-[#243a34] p-3 text-sm text-[#b9d6c6]">검증 완료: 이 URL은 승인된 게시 범위에 포함되어 있습니다.</p> : <p className="mt-4 border border-[#a9615f] bg-[#4a2828] p-3 text-sm text-[#f2c2bd]">미승인: 이 URL은 승인된 게시 범위 밖입니다.</p>;
}

function PolicyListKo({ title, items }: { title: string; items: string[] }) {
  return <Panel><PanelHeader title={title} /><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map((item) => <label key={item} className="flex items-start gap-3 rounded border border-[#e1d8ca] bg-white p-3 text-sm"><input type="checkbox" defaultChecked className="mt-1" /><span>{item}</span></label>)}</div></Panel>;
}

function translateTier(name: string) {
  return {
    Emerging: "성장형",
    Select: "선별형",
    Signature: "대표형",
    Icon: "아이콘",
  }[name] ?? name;
}

function translateTierProfile(id: string) {
  return {
    emerging: "독립 배우, 성장 중인 크리에이터, 장르 특화 배우, 신규 소속사 명단.",
    select: "인지도 있는 조연, 연극 기반 스크린 배우, 지역 스타, 카테고리 전문 배우.",
    signature: "주연급 배우, 드라마/영화에서 상업성이 있는 이름, 신뢰도 높은 내레이터.",
    icon: "최상위 배우, 문화적으로 상징적인 얼굴 또는 목소리, 글로벌 인지도를 가진 출연자.",
  }[id] ?? id;
}

function translateMultiplier(id: string) {
  return {
    "owned-social": "자사 소셜 채널",
    "paid-ads": "유료 디지털 광고",
    "all-digital": "전체 디지털 채널",
    "global-territory": "글로벌 지역",
    "six-months": "6개월 기간",
    "twelve-months": "12개월 기간",
    "voice-clone": "음성 복제 포함",
    "category-exclusive": "카테고리 독점",
  }[id] ?? id;
}

function translateMultiplierReason(id: string) {
  return {
    "owned-social": "유료 매체보다 미디어 비용과 URL 통제가 낮은 범위입니다.",
    "paid-ads": "배우의 초상이 전환 성과에 직접 기여하며 보증 리스크가 커집니다.",
    "all-digital": "웹, 소셜, 이메일, 마켓플레이스, 파트너 페이지까지 재사용 범위가 넓어집니다.",
    "global-territory": "노출 시장, 브랜드 충돌, 모니터링 부담이 증가합니다.",
    "six-months": "짧은 캠페인 테스트보다 공개 연상 기간이 길어집니다.",
    "twelve-months": "연간 보증 가치에 가까워지므로 갱신 시 재협상이 필요합니다.",
    "voice-clone": "목소리 정체성은 별도 민감 영역이므로 명시 승인이 필요합니다.",
    "category-exclusive": "동일 업종 기회가 차단되는 데 대한 판매자 보상입니다.",
  }[id] ?? id;
}

function translateRevenueLine(id: string) {
  return {
    "marketplace-take": "라이선스 마켓플레이스 서비스 수수료",
    "buyer-trust-fee": "구매자 신뢰 및 검증 수수료",
    "review-workflow-fee": "유료 검수 워크플로우 비용",
    "managed-seat": "소속사 운영 시트",
    "enterprise-trust": "엔터프라이즈 신뢰 인프라",
  }[id] ?? id;
}

function translateRevenueWhen(id: string) {
  return {
    "marketplace-take": "소속사 승인과 인증서 발급 후 승인된 라이선스 비용에서 차감합니다.",
    "buyer-trust-fee": "인증서 호스팅, URL 검증, 감사 로그, 모니터링이 필요한 공개 캠페인에 추가합니다.",
    "review-workflow-fee": "결과가 반려되더라도 소속사/배우 검수 노동에 대해 청구할 수 있습니다.",
    "managed-seat": "다수 배우 정책, 감사 로그, 정산 리포트를 관리하는 소속사에 선택형으로 제공합니다.",
    "enterprise-trust": "API 검증, 대량 인증서, 철회 운영, 비공개 컴플라이언스 리포팅에 적용합니다.",
  }[id] ?? id;
}

function translateReviewNote(note: string) {
  return {
    "Voice similarity requires separate consent": "음성 유사도는 별도 동의가 필요합니다.",
    "Disclosure mark missing in 9:16 cut": "9:16 컷에 고지 마크가 누락되어 있습니다.",
    "Facial likeness is within approved tolerance.": "얼굴 유사도는 승인 허용 범위 안에 있습니다.",
    "Request a revised end-card with certificate placement.": "인증서 배치가 포함된 엔드카드 수정을 요청합니다.",
    "Gesture library includes unapproved thumbs-up shot": "제스처 라이브러리에 미승인 thumbs-up 샷이 포함되어 있습니다.",
    "Replace three gesture clips before final review.": "최종 검수 전 제스처 클립 3개를 교체하세요.",
    "Certificate revoked after an unapproved derivative edit was published": "미승인 파생 편집본이 게시되어 인증서가 철회되었습니다.",
    "Preserve the original approval record and block active certificate display.": "원 승인 기록은 보존하고 활성 인증서 표시는 차단하세요.",
  }[note] ?? note;
}

function translateAuditNote(note: string) {
  return {
    "Finished campaign film and supporting disclosure package submitted.": "완성 캠페인 필름과 고지 지원 패키지가 제출되었습니다.",
    "Agency review opened with voice similarity and disclosure placement flags.": "음성 유사도와 고지 배치 플래그와 함께 소속사 검수가 시작되었습니다.",
    "Interactive dealership screen package submitted.": "인터랙티브 매장 디스플레이 패키지가 제출되었습니다.",
    "Replace the unapproved gesture clips before resubmission.": "재제출 전 미승인 제스처 클립을 교체해야 합니다.",
    "Streaming teaser and press microsite package submitted.": "스트리밍 티저와 프레스 마이크로사이트 패키지가 제출되었습니다.",
    "Approved with certificate placement in the opening slate and URL allowlist.": "오프닝 슬레이트의 인증서 배치와 URL allowlist 조건으로 승인되었습니다.",
    "Approved for the reviewed pilot version and the event page URL only.": "검수된 파일럿 버전과 이벤트 페이지 URL에 한해 승인되었습니다.",
    "Revoked after an unapproved derivative edit was published outside scope.": "승인 범위 밖의 미승인 파생 편집본 게시 후 철회되었습니다.",
  }[note] ?? note;
}

function translateScope(scope: string) {
  return {
    "Official AI appearance approval for streaming teaser, press microsite, and owned social channels.": "스트리밍 티저, 프레스 마이크로사이트, 자사 소셜 채널에 대한 공식 AI 출연 승인입니다.",
    "Virtual event host pilot on the approved event page only.": "승인된 이벤트 페이지에 한정된 가상 이벤트 호스트 파일럿입니다.",
    "Seasonal lookbook microsite approval for the Spring 2025 campaign.": "2025 봄 캠페인 시즌 룩북 마이크로사이트 승인입니다.",
  }[scope] ?? scope;
}
