"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitch } from "@/components/language-switch";
import { brand } from "@/lib/brand";

type Locale = "en" | "ko";

const navGroups = [
  {
    label: "Workspace",
    koLabel: "워크스페이스",
    items: [
      { href: "/operations", label: "Guided workspace", koLabel: "따라하기 홈", marker: "01" },
      { href: "/agency", label: "Rights holders", koLabel: "권리자 관리", marker: "02" },
      { href: "/pricing-model", label: "Pricing guide", koLabel: "가격 가이드", marker: "03" },
      { href: "/settlements", label: "Payments & payouts", koLabel: "결제와 정산", marker: "04" },
      { href: "/brand-assets", label: "Product placement assets", koLabel: "제품 배치 에셋", marker: "04A" },
    ],
  },
  {
    label: "Approval tools",
    koLabel: "승인 도구",
    items: [
      { href: "/projects/new", label: "Request verification", koLabel: "검수 요청", marker: "05" },
      { href: "/reviews/project-01", label: "Review a request", koLabel: "요청 검수", marker: "06" },
      { href: "/talents/talent-01/policy", label: "Usage rules", koLabel: "사용 규칙", marker: "07" },
    ],
  },
  {
    label: "Public trust",
    koLabel: "공개 신뢰",
    items: [
      { href: "/verify", label: "Verify an asset", koLabel: "에셋 인증 확인", marker: "08" },
      { href: "/certificates/cert-2026-0007", label: "Public certificate", koLabel: "공개 인증서", marker: "09" },
      { href: "/authenticity", label: "Authenticity standard", koLabel: "정품 인증 기준", marker: "10" },
      { href: "/scenarios", label: "Sample transactions", koLabel: "샘플 거래", marker: "11" },
    ],
  },
];

const pitchLinks = [
  { href: "/infrastructure", label: "Infrastructure", koLabel: "인프라 구성" },
  { href: "/business-plan", label: "Business plan", koLabel: "사업 실행계획" },
  { href: "/launch-readiness", label: "Launch readiness", koLabel: "출시 게이트" },
];

export function AppShell({ children, locale = "en" }: { children: React.ReactNode; locale?: Locale }) {
  const pathname = usePathname();
  const prefix = locale === "ko" ? "/ko" : "";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#ebe6de] text-[#17211f]">
      <header className="border-b border-[#2d3d39] bg-[#17211f] text-white lg:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <Brand locale={locale} />
          <div className="flex items-center gap-2">
            <LanguageSwitch locale={locale} />
            <Link href={locale === "ko" ? "/ko" : "/"} className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/70 hover:bg-white/10 hover:text-white">
              {locale === "ko" ? "공개 사이트" : "Public site"}
            </Link>
          </div>
        </div>
        <nav className="flex w-full max-w-full gap-1 overflow-x-auto border-t border-white/10 px-3 py-2 text-sm">
          {navGroups.flatMap((group) => group.items).map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} locale={locale} prefix={prefix} compact />
          ))}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#2d3d39] bg-[#17211f] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-5 py-5">
          <Brand locale={locale} />
        </div>
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[#d4b477]">{locale === "ko" ? "권리자 워크스페이스" : "Rights holder workspace"}</p>
          <p className="mt-2 text-sm font-semibold">Aster Rights Studio</p>
          <p className="mt-1 text-xs text-white/45">Mock workspace / KR, JP, US</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{locale === "ko" ? group.koLabel : group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => <NavLink key={item.href} item={item} pathname={pathname} locale={locale} prefix={prefix} />)}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="mb-4 border border-[#d4b477]/25 bg-[#d4b477]/8 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#d4b477]">{locale === "ko" ? "피칭 / 내부 자료" : "Pitch / internal"}</p>
            <div className="mt-2 space-y-1">
              {pitchLinks.map((item) => (
                <Link key={item.href} href={`${prefix}${item.href}`} className="block text-xs text-[#c4a66e] hover:text-white">
                  {locale === "ko" ? item.koLabel : item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-white/45">{locale === "ko" ? "환경" : "Environment"}</span>
            <span className="border border-[#6f927f]/60 bg-[#243a34] px-2 py-1 font-semibold uppercase tracking-[0.1em] text-[#b9d6c6]">Demo</span>
          </div>
          <div className="mt-4">
            <LanguageSwitch locale={locale} />
          </div>
          <Link href={locale === "ko" ? "/ko" : "/"} className="mt-4 block border border-white/16 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/65 hover:bg-white/10 hover:text-white">
            {locale === "ko" ? "공개 사이트 열기" : "Open public site"}
          </Link>
        </div>
      </aside>

      <main className="min-h-screen min-w-0 lg:ml-64">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}

function Brand({ locale }: { locale: Locale }) {
  return (
    <Link href={locale === "ko" ? "/ko" : "/"} className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">{brand.shortName}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">{brand.name}</p>
        <p className="mt-1 text-[11px] text-white/45">{brand.tagline[locale]}</p>
      </div>
    </Link>
  );
}

function NavLink({
  item,
  pathname,
  locale,
  prefix,
  compact = false,
}: {
  item: { href: string; label: string; koLabel: string; marker: string };
  pathname: string;
  locale: Locale;
  prefix: string;
  compact?: boolean;
}) {
  const href = `${prefix}${item.href}`;
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`flex whitespace-nowrap border px-2.5 py-2 text-xs transition ${
        active
          ? "border-[#d4b477]/55 bg-[#d4b477]/12 text-[#f3d99f]"
          : "border-transparent text-white/58 hover:border-white/10 hover:bg-white/7 hover:text-white"
      } ${compact ? "gap-2" : "gap-3"}`}
    >
      <span className="font-mono text-[10px] opacity-60">{item.marker}</span>
      <span className="font-medium">{locale === "ko" ? item.koLabel : item.label}</span>
    </Link>
  );
}
