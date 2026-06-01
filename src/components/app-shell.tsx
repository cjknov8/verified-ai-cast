import Link from "next/link";

const navItems = [
  { href: "/operations", label: "Operations" },
  { href: "/agency", label: "Agency" },
  { href: "/talents/talent-01/policy", label: "Policy" },
  { href: "/projects/new", label: "Submit" },
  { href: "/reviews/project-01", label: "Review" },
  { href: "/certificates/cert-2026-0007", label: "Certificate" },
  { href: "/settlements", label: "Ledger" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#ebe6de] text-[#17211f]">
      <header className="border-b border-[#2d3d39] bg-[#17211f] text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center border border-[#d4b477]/70 text-sm font-semibold text-[#e5cc98]">
                VA
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em]">Verified AI Cast</p>
                <p className="text-xs text-white/50">Official AI appearance approvals</p>
              </div>
            </Link>
            <div className="flex flex-wrap gap-2 text-xs text-white/55">
              <Link href="/" className="border border-white/20 px-3 py-1 hover:bg-white/10 hover:text-white">Public site</Link>
              <span className="border border-white/20 px-3 py-1">Mock data</span>
              <span className="border border-white/20 px-3 py-1">No auth</span>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap px-3 py-2 text-white/65 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
