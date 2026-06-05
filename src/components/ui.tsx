export function SectionHeader({
  eyebrow,
  title,
  description,
  aside,
}: {
  eyebrow: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-5 border-b border-[#d2cbc1] pb-6 lg:flex-row lg:items-end">
      <div className="max-w-3xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6234]">{eyebrow}</p>
        <h1 className="font-serif text-3xl leading-tight text-[#17211f] sm:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64706d] sm:text-base">{description}</p>
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`border border-[#d2cbc1] bg-[#f8f5ef] p-5 shadow-sm ${className}`}>{children}</section>;
}

export function PanelHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 border-b border-[#ddd6cc] pb-4 sm:flex-row sm:items-start">
      <div>
        {eyebrow ? <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b6234]">{eyebrow}</p> : null}
        <h2 className={`${eyebrow ? "mt-2" : ""} text-base font-semibold text-[#21312e]`}>{title}</h2>
        {description ? <p className="mt-1 max-w-xl text-sm leading-5 text-[#6c7773]">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function Stat({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-[#d2cbc1] bg-[#f8f5ef] p-4">
      <p className="text-xs uppercase tracking-[0.14em] text-[#827d75]">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-[#253b37]">{value}</p>
      <p className="mt-1 text-sm text-[#68736f]">{detail}</p>
    </div>
  );
}

export function StatusPill({ status, locale = "en" }: { status: string; locale?: "en" | "ko" }) {
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
  const koLabels: Record<string, string> = {
    approved: "승인",
    reviewing: "검수 중",
    changes_requested: "수정 요청",
    rejected: "반려",
    revoked: "철회",
    expired: "만료",
    active: "활성",
    submitted: "제출됨",
    review_started: "검수 시작",
    paid: "지급 완료",
    held: "보류",
    scheduled: "예정",
  };
  const label = locale === "ko" ? (koLabels[status] ?? status) : status.replace("_", " ");

  return (
    <span className={`inline-flex border px-2.5 py-1 text-xs font-semibold capitalize ${styles[status] ?? styles.submitted}`}>
      {label}
    </span>
  );
}

export function PrimaryButton({ children, type = "button" }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return <button type={type} className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">{children}</button>;
}

export function SecondaryButton({ children, type = "button" }: { children: React.ReactNode; type?: "button" | "submit" }) {
  return <button type={type} className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">{children}</button>;
}

export function Notice({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "warning" | "success" }) {
  const styles = {
    neutral: "border-[#cbd3d0] bg-[#eef2f0] text-[#4a5b57]",
    warning: "border-[#d7bd8d] bg-[#fbf4e5] text-[#72551d]",
    success: "border-[#9db59b] bg-[#edf5ea] text-[#28522e]",
  };

  return <div className={`border p-3 text-sm leading-6 ${styles[tone]}`}>{children}</div>;
}

export function MetaRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#e1dbd2] py-2.5 text-sm">
      <dt className="text-[#77817e]">{label}</dt>
      <dd className="text-right font-medium text-[#31403d]">{value}</dd>
    </div>
  );
}
