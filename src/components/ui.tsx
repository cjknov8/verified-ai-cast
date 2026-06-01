export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6234]">{eyebrow}</p>
      <h1 className="font-serif text-3xl text-[#17211f] sm:text-5xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-[#64706d] sm:text-base">{description}</p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`border border-[#d2cbc1] bg-[#f8f5ef] p-5 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

export function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-[#d2cbc1] bg-[#f8f5ef] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#827d75]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#253b37]">{value}</p>
      <p className="mt-1 text-sm text-[#68736f]">{detail}</p>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    approved: "border-[#9db59b] bg-[#edf5ea] text-[#28522e]",
    reviewing: "border-[#c4b17e] bg-[#fbf4d8] text-[#6d5611]",
    changes_requested: "border-[#d6a36d] bg-[#fff0df] text-[#7a4511]",
    rejected: "border-[#d08d8a] bg-[#fff0ef] text-[#8a2b27]",
    revoked: "border-[#d08d8a] bg-[#fff0ef] text-[#8a2b27]",
    expired: "border-[#c9c0b5] bg-[#f2efeb] text-[#655e56]",
    active: "border-[#9db59b] bg-[#edf5ea] text-[#28522e]",
    submitted: "border-[#b7c0cc] bg-[#eef3f8] text-[#324b67]",
    review_started: "border-[#c4b17e] bg-[#fbf4d8] text-[#6d5611]",
    paid: "border-[#9db59b] bg-[#edf5ea] text-[#28522e]",
    held: "border-[#c4b17e] bg-[#fbf4d8] text-[#6d5611]",
    scheduled: "border-[#b7c0cc] bg-[#eef3f8] text-[#324b67]",
  };

  return (
    <span className={`inline-flex rounded border px-2.5 py-1 text-xs font-medium ${styles[status] ?? styles.submitted}`}>
      {status.replace("_", " ")}
    </span>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">
      {children}
    </button>
  );
}

export function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">
      {children}
    </button>
  );
}
