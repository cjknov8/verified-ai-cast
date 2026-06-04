"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navGroups = [
  {
    label: "Workspace",
    items: [
      { href: "/operations", label: "Operations", marker: "01" },
      { href: "/agency", label: "Talent roster", marker: "02" },
      { href: "/pricing-model", label: "Pricing model", marker: "03" },
      { href: "/settlements", label: "Settlement ledger", marker: "04" },
    ],
  },
  {
    label: "Approval tools",
    items: [
      { href: "/projects/new", label: "Submit project", marker: "05" },
      { href: "/reviews/project-01", label: "Review workspace", marker: "06" },
      { href: "/talents/talent-01/policy", label: "Policy editor", marker: "07" },
    ],
  },
  {
    label: "Public trust",
    items: [
      { href: "/verify", label: "Certificate lookup", marker: "08" },
      { href: "/certificates/cert-2026-0007", label: "Public certificate", marker: "09" },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#ebe6de] text-[#17211f]">
      <header className="border-b border-[#2d3d39] bg-[#17211f] text-white lg:hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-4">
          <Brand />
          <Link href="/" className="border border-white/20 px-3 py-2 text-xs uppercase tracking-[0.12em] text-white/70 hover:bg-white/10 hover:text-white">
            Public site
          </Link>
        </div>
        <nav className="flex gap-1 overflow-x-auto border-t border-white/10 px-3 py-2 text-sm">
          {navGroups.flatMap((group) => group.items).map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} compact />
          ))}
        </nav>
      </header>

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[#2d3d39] bg-[#17211f] text-white lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-5 py-5">
          <Brand />
        </div>
        <div className="border-b border-white/10 px-5 py-4">
          <p className="text-xs uppercase tracking-[0.14em] text-[#d4b477]">Agency console</p>
          <p className="mt-2 text-sm font-semibold">Aster Rights Studio</p>
          <p className="mt-1 text-xs text-white/45">Mock workspace / KR, JP, US</p>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-5">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">{group.label}</p>
              <div className="space-y-1">
                {group.items.map((item) => <NavLink key={item.href} item={item} pathname={pathname} />)}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <div className="flex items-center justify-between gap-3 text-xs">
            <span className="text-white/45">Environment</span>
            <span className="border border-[#6f927f]/60 bg-[#243a34] px-2 py-1 font-semibold uppercase tracking-[0.1em] text-[#b9d6c6]">Demo</span>
          </div>
          <Link href="/" className="mt-4 block border border-white/16 px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.12em] text-white/65 hover:bg-white/10 hover:text-white">
            Open public site
          </Link>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}

function Brand() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">VA</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em]">Verified AI Cast</p>
        <p className="mt-1 text-[11px] text-white/45">Official appearance approvals</p>
      </div>
    </Link>
  );
}

function NavLink({
  item,
  pathname,
  compact = false,
}: {
  item: { href: string; label: string; marker: string };
  pathname: string;
  compact?: boolean;
}) {
  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={`flex whitespace-nowrap border px-2.5 py-2 text-xs transition ${
        active
          ? "border-[#d4b477]/55 bg-[#d4b477]/12 text-[#f3d99f]"
          : "border-transparent text-white/58 hover:border-white/10 hover:bg-white/7 hover:text-white"
      } ${compact ? "gap-2" : "gap-3"}`}
    >
      <span className="font-mono text-[10px] opacity-60">{item.marker}</span>
      <span className="font-medium">{item.label}</span>
    </Link>
  );
}
