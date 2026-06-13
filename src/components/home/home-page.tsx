import Image from "next/image";
import Link from "next/link";

type Locale = "en" | "ko";

const copy = {
  en: {
    langName: "English",
    nav: {
      framework: "Framework",
      certificate: "Certificate",
      pricing: "Authenticity",
      lookup: "Lookup",
      console: "Console",
    },
    cta: "Start approval",
    heroEyebrow: "The registry for authentic digital rights",
    heroTitle: "Know the asset. Know the authority.",
    heroBody:
      "Verify who is selling, what they are authorized to grant, which exact asset was approved, and where the buyer may use it.",
    submitProject: "Explore transaction lab",
    viewCertificate: "View a certificate",
    heroTags: ["Verified seller", "Authenticated asset", "Scoped transaction", "Live status"],
    premiseEyebrow: "The premise",
    premiseTitle: "Control the official claim, not the creative tool.",
    premiseBody: [
      "AI media can be made anywhere. Official approval should remain scarce, inspectable, and commercially meaningful.",
      "Verified AI Cast creates a rights-holder review layer between a finished performance and its public release. Creators gain legitimacy. Actors and agencies retain boundaries, visibility, and the ability to revoke.",
    ],
    frameworkEyebrow: "Approval framework",
    frameworkTitle: "From finished frame to official release.",
    frameworkBody:
      "A clear sequence for studios, talent teams, and viewers. Every transition is designed to become an immutable audit event in Phase 2.",
    trustPoints: [
      ["01", "Review the result", "Actors and agencies review the finished appearance, not an uncontrolled asset library."],
      ["02", "Approve the scope", "Each decision binds a project, release window, usage terms, and publishing URLs."],
      ["03", "Publish with proof", "An active public certificate lets viewers verify where official approval applies."],
    ],
    certificateEyebrow: "Public certificate",
    certificateTitle: "Trust that can be checked at the source.",
    certificateBody:
      "A certificate belongs to approved work and approved URLs. Copying a link to another page does not copy the approval.",
    certificateRecord: "Verified AI Cast / Public record",
    active: "Active",
    certificateHeading: "Official AI appearance approval for Luma Seoul Season Teaser",
    certificateFacts: [
      ["Certificate", "cert-2026-0007"],
      ["Appearance", "Mina Park / Luma Seoul"],
      ["Scope", "Teaser, microsite, owned social"],
      ["State", "Active"],
    ],
    approvedUrl: "Approved publishing URL",
    inspectCertificate: "Inspect public certificate",
    pricingEyebrow: "Creator access",
    pricingTitle: "Start with one review.",
    pricingBody:
      "The first commercial step is intentionally simple: submit one finished result, receive a policy review, and move to licensing only after approval.",
    priceLabel: "Project review deposit",
    priceBody:
      "Covers policy review, result inspection, and a documented decision. License terms are issued separately when the appearance is approved.",
    included: [
      "Finished-result review",
      "Talent policy comparison",
      "Revision request support",
      "Public certificate on approval",
    ],
    reserveReview: "Reserve a review",
    footer: "Verified AI Cast / Official AI appearance infrastructure",
    openConsole: "Open operations console",
  },
  ko: {
    langName: "한국어",
    nav: {
      framework: "이용 방식",
      certificate: "인증서",
      pricing: "정품 기준",
      lookup: "조회",
      console: "콘솔",
    },
    cta: "검수 시작",
    heroEyebrow: "정품 디지털 권리 에셋 레지스트리",
    heroTitle: "에셋과 판매 권한을 함께 인증합니다.",
    heroBody:
      "누가 판매하는지, 어떤 권리를 줄 수 있는지, 정확히 어떤 에셋이 승인됐는지, 구매자가 어디에 사용할 수 있는지 확인합니다.",
    submitProject: "거래 UX 체험",
    viewCertificate: "인증서 샘플 보기",
    heroTags: ["판매자 인증", "에셋 정품성", "거래 범위", "실시간 상태"],
    premiseEyebrow: "왜 필요한가",
    premiseTitle: "AI 영상은 많아져도, 공식 승인은 하나여야 합니다.",
    premiseBody: [
      "누구나 AI 영상을 만들 수 있습니다. 하지만 배우의 이름을 걸고 공개하려면 분명한 승인 기록이 필요합니다.",
      "Verified AI Cast는 완성된 결과물을 배우 측이 검수하고, 승인된 URL에만 공개 인증서를 연결합니다.",
    ],
    frameworkEyebrow: "작동 방식",
    frameworkTitle: "제출, 검수, 인증까지 한 흐름으로.",
    frameworkBody:
      "제작자는 결과물을 제출하고, 배우 측은 사용 범위를 확인합니다. 승인된 결과물만 인증서와 함께 공개됩니다.",
    trustPoints: [
      ["01", "결과물 제출", "제작자가 완성된 AI 영상과 사용 목적, 게시 URL을 제출합니다."],
      ["02", "배우 측 검수", "배우 또는 소속사가 초상, 음성, 문맥, 브랜드 리스크를 확인합니다."],
      ["03", "인증서 공개", "승인된 URL에만 공식 인증서가 연결됩니다."],
    ],
    certificateEyebrow: "공개 인증서",
    certificateTitle: "승인 여부를 링크 하나로 확인합니다.",
    certificateBody:
      "인증서는 프로젝트와 URL에 묶입니다. 다른 페이지에서 같은 링크를 써도 승인 범위가 자동으로 옮겨가지 않습니다.",
    certificateRecord: "Verified AI Cast / 공개 기록",
    active: "활성",
    certificateHeading: "Luma Seoul Season Teaser 공식 AI 출연 승인",
    certificateFacts: [
      ["인증서", "cert-2026-0007"],
      ["출연", "Mina Park / Luma Seoul"],
      ["범위", "티저, 마이크로사이트, owned social"],
      ["상태", "활성"],
    ],
    approvedUrl: "승인된 게시 URL",
    inspectCertificate: "인증서 확인",
    pricingEyebrow: "비즈니스 모델",
    pricingTitle: "처음부터 큰 비용을 걸 필요는 없습니다.",
    pricingBody:
      "배우의 등급, 사용 범위, 예상 노출, 공개 채널에 따라 고정형·성과형·혼합형으로 설계할 수 있습니다.",
    priceLabel: "초기 상담",
    priceBody:
      "먼저 사용 목적과 배우 등급을 확인합니다. 승인 가능성이 있는 건만 파일럿 견적으로 이동합니다.",
    included: ["무료 상담", "파일럿 견적", "조회수 기반 옵션", "승인 후 정식 계약"],
    reserveReview: "상담 요청하기",
    footer: "Verified AI Cast / 공식 AI 출연 인증",
    openConsole: "운영 콘솔 열기",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const href = (path: string) => (locale === "ko" ? `/ko${path}` : path);

  return (
    <main className={`bg-[#0f1514] text-[#f5f0e7] ${locale === "ko" ? "ko-home" : ""}`}>
      <section className="relative min-h-[92svh] overflow-hidden border-b border-white/10">
        <Image
          src="/images/verified-ai-cast-hero.png"
          alt={
            locale === "ko"
              ? "가상의 배우가 옆모습으로 서 있는 영화적 스튜디오 세트"
              : "A cinematic studio set with a fictional actor in profile"
          }
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,10,0.96)_0%,rgba(5,10,10,0.84)_38%,rgba(5,10,10,0.34)_72%,rgba(5,10,10,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,12,0.34)_0%,rgba(8,12,12,0.05)_52%,rgba(8,12,12,0.88)_100%)]" />

        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-10">
          <Link href={locale === "ko" ? "/ko" : "/"} className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">
              VA
            </span>
            <span className="hidden text-sm font-semibold uppercase tracking-[0.16em] text-white sm:inline">Verified AI Cast</span>
          </Link>
          <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.14em] text-white/70 md:flex">
            <a href="#framework" className="hover:text-white">{t.nav.framework}</a>
            <a href="#certificate" className="hover:text-white">{t.nav.certificate}</a>
            <Link href="/authenticity" className="hover:text-white">{t.nav.pricing}</Link>
            <Link href={href("/verify")} className="hover:text-white">{t.nav.lookup}</Link>
            <Link href={href("/operations")} className="hover:text-white">{t.nav.console}</Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector locale={locale} />
            <Link
              href="/scenarios"
              className="hidden border border-[#d4b477]/70 bg-[#d4b477]/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1d79f] hover:bg-[#d4b477]/20 sm:inline-flex"
            >
              {t.cta}
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto grid min-h-[calc(92svh-80px)] max-w-7xl items-end gap-10 px-5 pb-12 sm:px-8 sm:pb-16 lg:grid-cols-[1fr_0.58fr] lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#d4b477]">
              {t.heroEyebrow}
            </p>
            <h1 className="font-serif text-5xl leading-[1.02] text-white sm:text-7xl lg:text-[6.5rem]">
              {t.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
              {t.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/scenarios" className="bg-[#d4b477] px-5 py-3 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">
                {t.submitProject}
              </Link>
              <Link href={href("/certificates/cert-2026-0007")} className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {t.viewCertificate}
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.14em] text-white/55">
              {t.heroTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className="hidden border border-white/15 bg-[#101716]/90 p-5 backdrop-blur-sm lg:block">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#d4b477]">{locale === "ko" ? "에셋 패스포트" : "Asset passport"}</p>
              <span className="border border-[#769584] bg-[#243a34] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#c8ddcf]">{locale === "ko" ? "인증됨" : "Certified"}</span>
            </div>
            <p className="mt-8 font-serif text-3xl">{locale === "ko" ? "Nocturne Portrait 01" : "Nocturne Portrait 01"}</p>
            <p className="mt-2 text-xs text-white/42">VAC / Signature digital appearance</p>
            <dl className="mt-7 space-y-4 text-sm">
              <HeroFact label={locale === "ko" ? "판매자" : "Seller"} value="Aster Rights Studio" />
              <HeroFact label={locale === "ko" ? "권한" : "Authority"} value="A2 / scoped representation" />
              <HeroFact label={locale === "ko" ? "에셋" : "Asset"} value="C2 / signed master v3" />
              <HeroFact label={locale === "ko" ? "거래" : "Transaction"} value="T2 / executed and monitored" />
            </dl>
            <Link href="/authenticity" className="mt-7 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-[#d4b477] hover:text-white">
              {locale === "ko" ? "인증 체계 보기 →" : "Inspect the standard →"}
            </Link>
          </div>
        </div>
      </section>

      <section className="scroll-reveal border-b border-white/10 bg-[#17211f] py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10">
          <div className="max-w-lg">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">{t.premiseEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
              {t.premiseTitle}
            </h2>
          </div>
          <div className="max-w-2xl text-base leading-8 text-[#c5cbc5] sm:text-lg">
            {t.premiseBody.map((paragraph, index) => (
              <p key={paragraph} className={index > 0 ? "mt-5" : ""}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {locale === "ko" ? <KoreanStudioSection /> : null}

      <section id="framework" className="scroll-reveal bg-[#e9e2d8] py-20 text-[#17211f] sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#875b36]">{t.frameworkEyebrow}</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-serif text-4xl leading-tight sm:text-6xl">{t.frameworkTitle}</h2>
            <p className="max-w-xl text-base leading-7 text-[#52605d] lg:justify-self-end">
              {t.frameworkBody}
            </p>
          </div>
          <div className="mt-12 grid border-t border-[#b9ada0] md:grid-cols-3">
            {t.trustPoints.map(([index, title, body]) => (
              <article key={index} className="border-b border-[#b9ada0] py-7 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <p className="font-mono text-xs text-[#875b36]">{index}</p>
                <h3 className="mt-12 text-xl font-semibold">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#5d6865]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {locale === "ko" ? <KoreanTrustMap /> : null}

      <section id="certificate" className="scroll-reveal bg-[#111817] py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10">
          <div className="lg:sticky lg:top-12 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">{t.certificateEyebrow}</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-6xl">
              {t.certificateTitle}
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-white/62">
              {t.certificateBody}
            </p>
          </div>
          <div className="border border-white/14 bg-[#182321]">
            <div className="border-b border-white/12 px-5 py-5 sm:px-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-[#d4b477]">{t.certificateRecord}</p>
                <span className="border border-[#7d9c89] bg-[#243a34] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#b9d6c6]">
                  {t.active}
                </span>
              </div>
              <h3 className="mt-8 max-w-2xl font-serif text-3xl text-white sm:text-5xl">
                {t.certificateHeading}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2">
              {t.certificateFacts.map(([label, value]) => (
                <div key={label} className="border-b border-white/10 px-5 py-5 sm:border-r sm:px-7">
                  <p className="text-xs uppercase tracking-[0.14em] text-white/42">{label}</p>
                  <p className="mt-2 text-sm text-white/85">{value}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-6 sm:px-7">
              <p className="text-xs uppercase tracking-[0.14em] text-white/42">{t.approvedUrl}</p>
              <p className="mt-3 break-all font-mono text-sm text-[#c6dfd4]">https://campaigns.lumaseoul.example/season-teaser</p>
              <Link href={href("/certificates/cert-2026-0007")} className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
                {t.inspectCertificate}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-reveal bg-[#d7c9b9] py-20 text-[#17211f] sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#875b36]">{t.pricingEyebrow}</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">{t.pricingTitle}</h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-[#56615e] lg:justify-self-end">
              {t.pricingBody}
            </p>
          </div>
          {locale === "ko" ? (
            <KoreanBusinessModels href={href} />
          ) : (
            <div className="mt-12 grid border-t border-[#ad9d8c] lg:grid-cols-[1fr_0.62fr]">
              <div className="border-b border-[#ad9d8c] py-7 lg:border-r lg:px-7 lg:first:pl-0">
                <p className="text-xs uppercase tracking-[0.16em] text-[#875b36]">{t.priceLabel}</p>
                <p className="mt-4 font-serif text-6xl">$2,500</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-[#596360]">
                  {t.priceBody}
                </p>
              </div>
              <div className="py-7 lg:px-7">
                <ul className="space-y-3 text-sm text-[#485451]">
                  {t.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <Link href={href("/checkout")} className="mt-7 inline-flex bg-[#17211f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#24322f]">
                  {t.reserveReview}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0f1514] px-5 py-6 text-xs uppercase tracking-[0.12em] text-white/45 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <p>{t.footer}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/trust" className="text-white/65 hover:text-white">{locale === "ko" ? "신뢰와 검증" : "Trust"}</Link>
            <Link href="/privacy" className="text-white/65 hover:text-white">{locale === "ko" ? "개인정보" : "Privacy"}</Link>
            <Link href="/terms" className="text-white/65 hover:text-white">{locale === "ko" ? "이용 조건" : "Terms"}</Link>
            <Link href="/scenarios" className="text-white/65 hover:text-white">{locale === "ko" ? "거래 UX" : "UX Lab"}</Link>
            <Link href={href("/operations")} className="text-white/65 hover:text-white">{t.openConsole}</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function HeroFact({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-white/10 pb-3"><dt className="text-white/38">{label}</dt><dd className="text-right font-mono text-xs text-white/78">{value}</dd></div>;
}

function LanguageSelector({ locale }: { locale: Locale }) {
  const options = [
    { href: "/", label: "EN", locale: "en" },
    { href: "/ko", label: "한국어", locale: "ko" },
  ] as const;

  return (
    <div
      className="flex border border-white/20 bg-black/15 p-0.5 text-xs font-semibold uppercase tracking-[0.1em]"
      aria-label="Language selector"
    >
      {options.map((option) => {
        const active = option.locale === locale;

        return (
          <Link
            key={option.locale}
            href={option.href}
            className={`px-2.5 py-2 ${
              active
                ? "bg-[#d4b477] text-[#111817]"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
            aria-current={active ? "page" : undefined}
          >
            {option.label}
          </Link>
        );
      })}
    </div>
  );
}

function KoreanStudioSection() {
  return (
    <section className="scroll-reveal border-b border-white/10 bg-[#0f1514] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
        <div className="relative min-h-[360px] overflow-hidden border border-white/12 bg-[#182321] sm:min-h-[520px]">
          <Image
            src="/images/ko-approval-studio.png"
            alt="공식 AI 출연 검수를 표현한 영화적 스튜디오 이미지"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 48vw, 100vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,21,20,0.02)_0%,rgba(15,21,20,0.42)_100%)]" />
          <div className="absolute bottom-5 left-5 right-5 border border-white/16 bg-[#0f1514]/76 p-4 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#d4b477]">Review room</p>
            <p className="mt-2 text-sm leading-6 text-white/72">
              배우 측이 확인한 결과물만 공개 인증으로 이어집니다.
            </p>
          </div>
        </div>
        <div className="self-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#d4b477]">For brands and studios</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl leading-tight text-white sm:text-6xl">
            “승인받은 AI 출연”을 분명하게 보여주세요.
          </h2>
          <div className="mt-8 grid gap-3">
            {[
              ["검수 전", "내부 시안과 실험 결과물은 공개 인증을 받을 수 없습니다."],
              ["승인 후", "배우 측이 확인한 버전과 URL만 인증서에 연결됩니다."],
              ["공개 중", "시청자와 파트너가 인증 링크로 승인 범위를 확인합니다."],
            ].map(([title, body], index) => (
              <div key={title} className="grid grid-cols-[44px_1fr] gap-4 border-t border-white/12 py-5">
                <span className="font-mono text-sm text-[#d4b477]">0{index + 1}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-white/62">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function KoreanTrustMap() {
  const layers = [
    ["제출", "영상, 스크립트, 사용 목적, 게시 URL"],
    ["검수", "초상권, 음성, 브랜드 리스크, 정책 기준"],
    ["인증", "승인 상태, 만료일, URL allowlist"],
    ["철회", "위반 발생 시 인증 비활성화와 기록 보존"],
  ];

  return (
    <section className="scroll-reveal bg-[#efe8dd] py-20 text-[#17211f] sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#875b36]">Trust map</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-6xl">
              인증은 한 장의 배지가 아니라, 기록의 흐름입니다.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-4">
            {layers.map(([title, body], index) => (
              <article key={title} className="relative min-h-56 border border-[#cdbfad] bg-[#fbf8f1] p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#875b36]">0{index + 1}</span>
                  <span className="h-2 w-2 bg-[#b88a4c]" />
                </div>
                <h3 className="mt-16 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#5d6865]">{body}</p>
                {index < layers.length - 1 ? (
                  <div className="absolute -right-3 top-1/2 hidden h-px w-6 bg-[#b88a4c] md:block" />
                ) : null}
              </article>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-4 border-y border-[#cdbfad] py-6 md:grid-cols-3">
          <Metric label="공개 승인 기준" value="URL" detail="프로젝트와 게시 위치를 함께 검증" />
          <Metric label="상태 관리" value="Active" detail="철회·만료 상태까지 공개 기록 유지" />
          <Metric label="운영 기록" value="Audit" detail="승인, 반려, 수정 요청을 모두 보존" />
        </div>
      </div>
    </section>
  );
}

function KoreanBusinessModels({ href }: { href: (path: string) => string }) {
  const models = [
    {
      name: "무료 상담",
      price: "₩0",
      body: "사용 목적, 배우 등급, 공개 채널을 먼저 확인합니다.",
      fit: "첫 문의, 예산 확인",
    },
    {
      name: "소액 파일럿",
      price: "낮은 선불",
      body: "내부 시안이나 제한 공개용으로 승인 가능성을 테스트합니다.",
      fit: "스타트업, 숏폼, 피치 영상",
    },
    {
      name: "조회수 연동",
      price: "기본료 + 성과",
      body: "YouTube·숏폼·캠페인 페이지 조회 구간에 따라 정산합니다.",
      fit: "성과 예측이 어려운 캠페인",
    },
    {
      name: "정액 라이선스",
      price: "범위별 견적",
      body: "기간, 지역, 매체, 독점 여부를 정해 한 번에 승인합니다.",
      fit: "브랜드 필름, 광고, OTT",
    },
  ];

  return (
    <div className="mt-12">
      <div className="grid gap-3 md:grid-cols-4">
        {models.map((model) => (
          <article key={model.name} className="min-h-64 border border-[#ad9d8c] bg-[#efe6d9] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#875b36]">{model.fit}</p>
            <h3 className="mt-8 text-xl font-semibold">{model.name}</h3>
            <p className="mt-3 font-serif text-3xl text-[#17211f]">{model.price}</p>
            <p className="mt-5 text-sm leading-6 text-[#596360]">{model.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-6 border-y border-[#ad9d8c] py-7 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#875b36]">추천 시작점</p>
          <h3 className="mt-3 font-serif text-4xl leading-tight">상담은 가볍게, 정산은 사용량에 맞게.</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <MiniModel title="기본료" body="배우 측 검수와 인증 운영 비용을 보전합니다." />
          <MiniModel title="성과료" body="조회수, 광고 집행, 공개 기간에 따라 추가 정산합니다." />
          <MiniModel title="상한선" body="구매자가 예산 리스크를 예측할 수 있게 월별 한도를 둡니다." />
        </div>
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <Link href={href("/projects/new")} className="bg-[#17211f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#24322f]">
          사용 목적부터 입력하기
        </Link>
        <Link href={href("/pricing-model")} className="border border-[#17211f]/35 px-5 py-3 text-sm font-semibold text-[#17211f] hover:bg-[#cfc1af]">
          가격 모델 자세히 보기
        </Link>
      </div>
    </div>
  );
}

function MiniModel({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-[#c8b9a7] bg-[#fbf8f1] p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-2 text-sm leading-6 text-[#596360]">{body}</p>
    </div>
  );
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#875b36]">{label}</p>
      <p className="mt-3 font-serif text-4xl text-[#17211f]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[#5d6865]">{detail}</p>
    </div>
  );
}
