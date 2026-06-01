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
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b5d2f]">{eyebrow}</p>
      <h1 className="text-3xl font-semibold tracking-tight text-[#141414] sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm leading-6 text-[#625d55] sm:text-base">{description}</p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded border border-[#d9d1c4] bg-[#fbfaf7] p-5 shadow-sm ${className}`}>
      {children}
    </section>
  );
}

export function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded border border-[#ddd4c7] bg-white p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#837c71]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#16302b]">{value}</p>
      <p className="mt-1 text-sm text-[#6b665d]">{detail}</p>
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
    <button className="rounded bg-[#16302b] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#21483f]">
      {children}
    </button>
  );
}

export function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="rounded border border-[#bfb5a6] px-4 py-2.5 text-sm font-semibold text-[#312d28] hover:bg-[#ebe4d9]">
      {children}
    </button>
  );
}
