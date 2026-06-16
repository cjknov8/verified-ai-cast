"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Notice, Panel, PanelHeader } from "@/components/ui";
import { talents } from "@/lib/mock-data";

const DRAFT_KEY = "verified-ai-cast:submission-draft";
const RESERVATION_KEY = "verified-ai-cast:review-reservation";
const stepLabels: Record<"en" | "ko", string[]> = {
  en: ["Project", "Files", "Rights", "Confirm"],
  ko: ["프로젝트", "파일", "권리", "확인"],
};

type Draft = {
  title: string;
  talentId: string;
  producer: string;
  intendedUse: string;
  territory: string;
  releaseWindow: string;
  channels: string;
  revenueModel: string;
  publishingUrls: string;
  files: Record<string, string>;
};

const emptyDraft: Draft = {
  title: "",
  talentId: "",
  producer: "",
  intendedUse: "",
  territory: "",
  releaseWindow: "",
  channels: "",
  revenueModel: "",
  publishingUrls: "",
  files: {},
};

const options = {
  intendedUse: {
    en: ["Campaign film", "Product placement", "Social teaser", "Virtual host", "Internal pitch"],
    ko: ["캠페인 필름", "제품 배치", "소셜 티저", "가상 호스트", "내부 피치"],
  },
  territory: ["KR", "JP", "US", "EU", "Global", "Global excluding CN"],
  releaseWindow: {
    en: ["Internal review only", "1 month", "3 months", "6 months", "12 months"],
    ko: ["내부 검토 전용", "1개월", "3개월", "6개월", "12개월"],
  },
  channels: {
    en: ["Owned social", "Paid digital ads", "Campaign microsite", "Streaming teaser", "OTT / broadcast", "OOH"],
    ko: ["자사 소셜", "유료 디지털 광고", "캠페인 마이크로사이트", "스트리밍 티저", "OTT / 방송", "옥외 광고"],
  },
  revenueModel: {
    en: ["Fixed license", "Review only", "Base fee + performance", "Revenue share", "Enterprise quote"],
    ko: ["고정 라이선스", "검수 전용", "기본료 + 성과형", "수익 쉐어", "엔터프라이즈 견적"],
  },
};

export function SubmissionWorkspace({ locale = "en" }: { locale?: "en" | "ko" }) {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [savedAt, setSavedAt] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [error, setError] = useState<string>();
  const steps = stepLabels[locale];
  const prefix = locale === "ko" ? "/ko" : "";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedDraft = window.localStorage.getItem(DRAFT_KEY);
      const reservation = window.localStorage.getItem(RESERVATION_KEY);
      if (savedDraft) setDraft(JSON.parse(savedDraft) as Draft);
      setReserved(Boolean(reservation));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function saveDraft() {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    setSavedAt(new Date().toLocaleTimeString());
  }

  function continueFlow() {
    setError(undefined);
    const validationError = validateStep(step, draft, reserved, locale);
    if (validationError) {
      setError(validationError);
      return;
    }
    saveDraft();
    if (step === steps.length - 1) {
      setSubmitted(true);
      return;
    }
    setStep(step + 1);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-4 grid grid-cols-4 border border-[#d2cbc1] bg-[#f8f5ef]">
          {steps.map((label, index) => (
            <button key={label} type="button" onClick={() => setStep(index)} className={`border-r border-[#d2cbc1] px-3 py-3 text-left last:border-r-0 ${index === step ? "bg-[#253b37] text-white" : "text-[#69736f] hover:bg-[#eee9e1]"}`}>
              <span className="block font-mono text-[10px] opacity-65">0{index + 1}</span>
              <span className="mt-1 block text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
        {submitted ? <div className="mb-4"><Notice tone="success">{locale === "ko" ? "데모 제출이 이 브라우저에 기록되었습니다. Supabase를 연결하면 영구 프로젝트와 audit event가 생성됩니다." : "Demo submission recorded in this browser. Connect Supabase to create a persistent project and audit event."}</Notice></div> : null}
        {error ? <div className="mb-4"><Notice tone="warning">{error}</Notice></div> : null}
        <Panel>
          {step === 0 ? <ProjectStep draft={draft} update={update} locale={locale} /> : null}
          {step === 1 ? <FilesStep draft={draft} update={update} locale={locale} /> : null}
          {step === 2 ? <RightsStep draft={draft} update={update} locale={locale} /> : null}
          {step === 3 ? <ConfirmStep draft={draft} reserved={reserved} locale={locale} /> : null}
          <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-[#ddd6cc] pt-4">
            <button type="button" onClick={() => step === 0 ? saveDraft() : setStep(step - 1)} className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">
              {step === 0 ? (locale === "ko" ? "초안 저장" : "Save draft") : (locale === "ko" ? "뒤로" : "Back")}
            </button>
            <button type="button" onClick={continueFlow} className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">
              {step === steps.length - 1 ? (locale === "ko" ? "데모 검수 제출" : "Submit demo review") : (locale === "ko" ? "저장 후 계속" : "Save and continue")}
            </button>
          </div>
        </Panel>
      </div>
      <aside className="space-y-4">
        <Panel>
          <PanelHeader eyebrow={locale === "ko" ? "진행률" : "Progress"} title={locale === "ko" ? `${steps.length}단계 중 ${step + 1}` : `${step + 1} of ${steps.length} steps`} />
          <div className="mt-4 h-1.5 bg-[#e0dad1]"><div className="h-full bg-[#b88a4c]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          <p className="mt-4 text-sm leading-6 text-[#69736f]">{locale === "ko" ? "Supabase 영구 저장을 연결하기 전까지 초안 입력은 이 브라우저에 저장됩니다." : "Draft inputs are saved in this browser until Supabase persistence is connected."}</p>
          {savedAt ? <p className="mt-3 text-xs text-[#8b6234]">{locale === "ko" ? `마지막 저장 ${savedAt}` : `Last saved at ${savedAt}`}</p> : null}
        </Panel>
        <Panel>
          <PanelHeader eyebrow={locale === "ko" ? "검수 예약금" : "Review deposit"} title="$2,500 USD" />
          <p className="mt-4 text-sm leading-6 text-[#69736f]">{reserved ? (locale === "ko" ? "데모 예약이 기록되었습니다. 실제 청구는 발생하지 않았습니다." : "Demo reservation recorded. No charge was made.") : (locale === "ko" ? "실제 검수 슬롯 예약 전 결제 준비 단계를 확인합니다." : "Open the payment preparation step before a live review slot is reserved.")}</p>
          <Link href={`${prefix}/checkout`} className="mt-4 inline-flex bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">{reserved ? (locale === "ko" ? "예약 보기" : "View reservation") : (locale === "ko" ? "결제 단계 확인" : "Review payment step")}</Link>
        </Panel>
      </aside>
    </div>
  );
}

function validateStep(step: number, draft: Draft, reserved: boolean, locale: "en" | "ko") {
  const messages = locale === "ko"
    ? [
        "프로젝트 제목, 권리 에셋, 제작사, 사용 목적을 모두 입력해 주세요.",
        "검수할 파일을 하나 이상 선택해 주세요.",
        "지역, 공개 기간, 게시 채널, 수익 모델, 게시 URL을 모두 입력해 주세요.",
        "제출 전 데모 검수 예약을 기록하고 필수 항목을 모두 완료해 주세요.",
      ]
    : [
        "Complete the project title, rights asset, producer, and intended use.",
        "Select at least one file for review.",
        "Complete territory, release window, channels, revenue model, and publishing URLs.",
        "Record the demo review reservation and complete every required item before submitting.",
      ];

  if (step === 0 && !(draft.title && draft.talentId && draft.producer && draft.intendedUse)) return messages[0];
  if (step === 1 && Object.keys(draft.files).length === 0) return messages[1];
  if (step === 2 && !(draft.territory && draft.releaseWindow && draft.channels && draft.revenueModel && draft.publishingUrls)) return messages[2];
  if (step === 3 && !(draft.title && draft.talentId && draft.producer && Object.keys(draft.files).length && draft.territory && draft.publishingUrls && reserved)) return messages[3];
}

function ProjectStep({ draft, update, locale }: StepProps) {
  return <>
    <PanelHeader eyebrow={locale === "ko" ? "1단계" : "Step 01"} title={locale === "ko" ? "프로젝트 기본 정보" : "Project essentials"} description={locale === "ko" ? "검수 자료 업로드 전에 상업적 맥락을 먼저 정의합니다." : "Identify the commercial context before uploading review materials."} />
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <Field label={locale === "ko" ? "프로젝트 제목" : "Project title"} value={draft.title} onChange={(value) => update("title", value)} placeholder={locale === "ko" ? "캠페인 또는 제작물 제목" : "Campaign or production title"} />
      <label className="block"><Label>{locale === "ko" ? "권리 에셋" : "Rights asset"}</Label><select className="field" value={draft.talentId} onChange={(event) => update("talentId", event.target.value)}><option value="">{locale === "ko" ? "검수할 에셋 선택" : "Select asset to review"}</option>{talents.map((talent) => <option key={talent.id} value={talent.id}>{talent.name} / {talent.agency}</option>)}</select></label>
      <Field label={locale === "ko" ? "제작사 또는 스튜디오" : "Producer or studio"} value={draft.producer} onChange={(value) => update("producer", value)} placeholder={locale === "ko" ? "회사명" : "Company name"} />
      <SelectField label={locale === "ko" ? "사용 목적" : "Intended use"} value={draft.intendedUse} onChange={(value) => update("intendedUse", value)} placeholder={locale === "ko" ? "사용 목적 선택" : "Select intended use"} options={options.intendedUse[locale]} />
    </div>
  </>;
}

function FilesStep({ draft, update, locale }: StepProps) {
  const fileTypes = locale === "ko" ? ["완성 영상 파일", "스크립트 및 자막 원고", "프롬프트 및 도구 로그", "고지 문구 배치 미리보기"] : ["Finished video file", "Script and subtitle transcript", "Prompt and tool log", "Disclosure placement preview"];
  function chooseFile(label: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) update("files", { ...draft.files, [label]: file.name });
  }
  return <>
    <PanelHeader eyebrow={locale === "ko" ? "2단계" : "Step 02"} title={locale === "ko" ? "검수 자료" : "Review materials"} description={locale === "ko" ? "지금은 로컬 파일명을 선택합니다. 백엔드 연결 후 Supabase Storage로 업로드됩니다." : "Choose local files now. Supabase Storage will receive them after backend connection."} />
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {fileTypes.map((item) => <label key={item} className="cursor-pointer border border-dashed border-[#bcb2a5] bg-white p-4 hover:bg-[#f2eee7]">
        <span className="text-sm font-semibold text-[#31403d]">{item}</span>
        <span className="mt-4 block break-all text-xs text-[#89918e]">{draft.files[item] ?? (locale === "ko" ? "이 기기에서 파일 선택" : "Choose file from this device")}</span>
        <input type="file" className="sr-only" onChange={(event) => chooseFile(item, event)} />
      </label>)}
    </div>
  </>;
}

function RightsStep({ draft, update, locale }: StepProps) {
  return <>
    <PanelHeader eyebrow={locale === "ko" ? "3단계" : "Step 03"} title={locale === "ko" ? "요청 권리와 URL" : "Requested rights and URLs"} description={locale === "ko" ? "최종 인증서는 검수된 범위와 승인된 게시 URL에만 유효합니다." : "The final certificate will be valid only for the reviewed scope and approved publishing URLs."} />
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <SelectField label={locale === "ko" ? "캠페인 지역" : "Campaign territory"} value={draft.territory} onChange={(value) => update("territory", value)} placeholder={locale === "ko" ? "지역 선택" : "Select territory"} options={options.territory} />
      <SelectField label={locale === "ko" ? "공개 기간" : "Release window"} value={draft.releaseWindow} onChange={(value) => update("releaseWindow", value)} placeholder={locale === "ko" ? "기간 선택" : "Select window"} options={options.releaseWindow[locale]} />
      <SelectField label={locale === "ko" ? "게시 채널" : "Publishing channels"} value={draft.channels} onChange={(value) => update("channels", value)} placeholder={locale === "ko" ? "채널 선택" : "Select channel"} options={options.channels[locale]} />
      <SelectField label={locale === "ko" ? "수익 모델" : "Revenue model"} value={draft.revenueModel} onChange={(value) => update("revenueModel", value)} placeholder={locale === "ko" ? "수익 모델 선택" : "Select revenue model"} options={options.revenueModel[locale]} />
      <label className="block sm:col-span-2"><Label>{locale === "ko" ? "제안 게시 URL" : "Proposed publishing URLs"}</Label><textarea className="field min-h-28" value={draft.publishingUrls} onChange={(event) => update("publishingUrls", event.target.value)} placeholder={"https://campaign.example.com/release\nhttps://video.example.com/watch/..."} /></label>
    </div>
  </>;
}

function ConfirmStep({ draft, reserved, locale }: { draft: Draft; reserved: boolean; locale: "en" | "ko" }) {
  const checks = [
    [locale === "ko" ? "프로젝트 기본 정보 완료" : "Project details completed", Boolean(draft.title && draft.talentId && draft.producer)],
    [locale === "ko" ? "검수 파일 1개 이상 선택" : "At least one review file selected", Object.keys(draft.files).length > 0],
    [locale === "ko" ? "게시 범위 입력" : "Publishing scope declared", Boolean(draft.territory && draft.publishingUrls)],
    [locale === "ko" ? "데모 검수 예약 기록" : "Demo review reservation recorded", reserved],
  ] as const;
  return <>
    <PanelHeader eyebrow={locale === "ko" ? "4단계" : "Step 04"} title={locale === "ko" ? "제출 패키지 확인" : "Confirm submission package"} description={locale === "ko" ? "검수자는 완성 결과물, 요청 권리, 에셋 사용 규칙을 비교합니다." : "Your reviewer will compare the finished output, requested rights, and asset usage rules."} />
    <div className="mt-5 space-y-3 text-sm text-[#5f6a67]">{checks.map(([item, complete]) => <div key={item} className="flex items-center gap-3 border border-[#ddd6cc] bg-white p-3"><span className={`flex h-5 w-5 items-center justify-center border text-xs ${complete ? "border-[#719279] bg-[#edf5ea] text-[#28522e]" : "border-[#c8bba9] text-[#9a8d7d]"}`}>{complete ? "✓" : "·"}</span><span>{item}</span></div>)}</div>
  </>;
}

type StepProps = { draft: Draft; locale: "en" | "ko"; update: <K extends keyof Draft>(key: K, value: Draft[K]) => void };
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="block"><Label>{label}</Label><input className="field" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}
function SelectField({ label, value, onChange, placeholder, options: items }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; options: string[] }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {items.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </label>
  );
}
function Label({ children }: { children: React.ReactNode }) { return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{children}</span>; }
