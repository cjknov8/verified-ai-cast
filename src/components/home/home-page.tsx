import Image from "next/image";
import Link from "next/link";

type Locale = "en" | "ko";

const copy = {
  en: {
    langName: "English",
    nav: {
      framework: "Framework",
      certificate: "Certificate",
      pricing: "Pricing",
      lookup: "Lookup",
      console: "Console",
    },
    cta: "Start approval",
    heroEyebrow: "Official AI appearance infrastructure",
    heroTitle: "Every likeness deserves a final cut.",
    heroBody:
      "Review AI performances with the people they represent. Issue public, revocable certificates for the exact projects and URLs that earned approval.",
    submitProject: "Submit a project",
    viewCertificate: "View a certificate",
    heroTags: ["Actor-first review", "URL-bound certificates", "Revocable approval"],
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
      framework: "승인 구조",
      certificate: "인증서",
      pricing: "가격",
      lookup: "조회",
      console: "콘솔",
    },
    cta: "승인 시작",
    heroEyebrow: "공식 AI 출연 승인 인프라",
    heroTitle: "모든 초상에는 최종 승인권이 필요합니다.",
    heroBody:
      "AI로 구현된 출연 결과물을 실제 배우와 소속사가 검토합니다. 승인된 프로젝트와 URL에만 공개 인증서를 발급하고, 필요하면 철회할 수 있습니다.",
    submitProject: "프로젝트 제출",
    viewCertificate: "인증서 보기",
    heroTags: ["배우 우선 검수", "URL 기반 인증서", "철회 가능한 승인"],
    premiseEyebrow: "서비스 전제",
    premiseTitle: "창작 도구가 아니라 공식 승인 주장을 통제합니다.",
    premiseBody: [
      "AI 미디어는 어디서든 만들어질 수 있습니다. 하지만 공식 승인은 희소하고, 검증 가능하며, 상업적으로 의미 있어야 합니다.",
      "Verified AI Cast는 완성된 AI 출연 결과물과 공개 배포 사이에 권리자 검수 레이어를 만듭니다. 제작자는 정당성을 얻고, 배우와 소속사는 경계·가시성·철회 권한을 유지합니다.",
    ],
    frameworkEyebrow: "승인 프레임워크",
    frameworkTitle: "완성된 프레임에서 공식 공개까지.",
    frameworkBody:
      "스튜디오, 배우 팀, 시청자가 같은 기준으로 확인할 수 있는 절차입니다. 각 단계는 Phase 2에서 변경 불가능한 audit event로 전환될 수 있게 설계합니다.",
    trustPoints: [
      ["01", "결과물 검수", "배우와 소속사는 통제되지 않는 에셋 라이브러리가 아니라 완성된 AI 출연 결과물을 검토합니다."],
      ["02", "사용 범위 승인", "각 결정은 프로젝트, 공개 기간, 사용 조건, 게시 URL에 연결됩니다."],
      ["03", "증명과 함께 공개", "활성 인증서를 통해 시청자는 공식 승인이 어디에 적용되는지 확인할 수 있습니다."],
    ],
    certificateEyebrow: "공개 인증서",
    certificateTitle: "출처에서 직접 확인되는 신뢰.",
    certificateBody:
      "인증서는 승인된 결과물과 승인된 URL에 귀속됩니다. 인증 링크를 다른 페이지에 붙인다고 승인 범위가 복사되지는 않습니다.",
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
    inspectCertificate: "공개 인증서 확인",
    pricingEyebrow: "제작자 이용",
    pricingTitle: "하나의 검수부터 시작합니다.",
    pricingBody:
      "첫 상업 단계는 단순해야 합니다. 완성된 결과물을 제출하고, 정책 검수를 받은 뒤, 승인된 경우에만 라이선스와 인증서 발급으로 이동합니다.",
    priceLabel: "프로젝트 검수 예약금",
    priceBody:
      "정책 검토, 결과물 확인, 문서화된 결정을 포함합니다. 출연 승인이 완료된 뒤 별도 라이선스 조건이 발급됩니다.",
    included: ["완성 결과물 검수", "배우 정책 비교", "수정 요청 지원", "승인 시 공개 인증서 발급"],
    reserveReview: "검수 예약",
    footer: "Verified AI Cast / 공식 AI 출연 승인 인프라",
    openConsole: "운영 콘솔 열기",
  },
} satisfies Record<Locale, Record<string, unknown>>;

export function HomePage({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <main className="bg-[#0f1514] text-[#f5f0e7]">
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
            <a href="#pricing" className="hover:text-white">{t.nav.pricing}</a>
            <Link href="/verify" className="hover:text-white">{t.nav.lookup}</Link>
            <Link href="/operations" className="hover:text-white">{t.nav.console}</Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSelector locale={locale} />
            <Link
              href="/projects/new"
              className="hidden border border-[#d4b477]/70 bg-[#d4b477]/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#f1d79f] hover:bg-[#d4b477]/20 sm:inline-flex"
            >
              {t.cta}
            </Link>
          </div>
        </header>

        <div className="relative z-10 mx-auto flex min-h-[calc(92svh-80px)] max-w-7xl items-end px-5 pb-12 sm:px-8 sm:pb-16 lg:px-10">
          <div className="max-w-3xl">
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
              <Link href="/projects/new" className="bg-[#d4b477] px-5 py-3 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">
                {t.submitProject}
              </Link>
              <Link href="/certificates/cert-2026-0007" className="border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">
                {t.viewCertificate}
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.14em] text-white/55">
              {t.heroTags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
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
              <Link href="/certificates/cert-2026-0007" className="mt-6 inline-flex border border-white/25 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10">
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
              <Link href="/checkout" className="mt-7 inline-flex bg-[#17211f] px-5 py-3 text-sm font-semibold text-white hover:bg-[#24322f]">
                {t.reserveReview}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0f1514] px-5 py-6 text-xs uppercase tracking-[0.12em] text-white/45 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4">
          <p>{t.footer}</p>
          <Link href="/operations" className="text-white/65 hover:text-white">{t.openConsole}</Link>
        </div>
      </footer>
    </main>
  );
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
