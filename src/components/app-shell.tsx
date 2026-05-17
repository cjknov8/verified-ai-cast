import Link from "next/link";

const navItems = [
  { href: "/", label: "Operations" },
  { href: "/agency", label: "Agency" },
  { href: "/talents/talent-01/policy", label: "Policy" },
  { href: "/projects/new", label: "Submit" },
  { href: "/reviews/project-01", label: "Review" },
  { href: "/certificates/cert-2026-0007", label: "Certificate" },
  { href: "/settlements", label: "Ledger" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#171717]">
      <header className="border-b border-[#ded8cd] bg-[#fbfaf7]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-[#16302b] text-sm font-semibold text-white">
                VA
              </span>
              <div>
                <p className="text-base font-semibold tracking-tight">Verified AI Cast</p>
                <p className="text-xs text-[#6b665d]">Official AI appearance approvals</p>
              </div>
            </Link>
            <div className="flex flex-wrap gap-2 text-xs text-[#5f5a52]">
              <span className="rounded border border-[#cfc7ba] px-3 py-1">Mock data</span>
              <span className="rounded border border-[#cfc7ba] px-3 py-1">No auth</span>
              <span className="rounded border border-[#cfc7ba] px-3 py-1">Vercel-ready</span>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded px-3 py-2 text-[#49443d] transition hover:bg-[#e8e2d7] hover:text-[#151515]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
