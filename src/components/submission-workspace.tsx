"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Notice, Panel, PanelHeader } from "@/components/ui";
import { talents } from "@/lib/mock-data";

const DRAFT_KEY = "verified-ai-cast:submission-draft";
const RESERVATION_KEY = "verified-ai-cast:review-reservation";
const steps = ["Project", "Files", "Rights", "Confirm"];

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

export function SubmissionWorkspace() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [savedAt, setSavedAt] = useState<string>();
  const [submitted, setSubmitted] = useState(false);
  const [reserved, setReserved] = useState(false);

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
        {submitted ? <div className="mb-4"><Notice tone="success">Demo submission recorded in this browser. Connect Supabase to create a persistent project and audit event.</Notice></div> : null}
        <Panel>
          {step === 0 ? <ProjectStep draft={draft} update={update} /> : null}
          {step === 1 ? <FilesStep draft={draft} update={update} /> : null}
          {step === 2 ? <RightsStep draft={draft} update={update} /> : null}
          {step === 3 ? <ConfirmStep draft={draft} reserved={reserved} /> : null}
          <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-[#ddd6cc] pt-4">
            <button type="button" onClick={() => step === 0 ? saveDraft() : setStep(step - 1)} className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold text-[#31403d] hover:bg-[#e1dbd2]">
              {step === 0 ? "Save draft" : "Back"}
            </button>
            <button type="button" onClick={continueFlow} className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">
              {step === steps.length - 1 ? "Submit demo review" : "Save and continue"}
            </button>
          </div>
        </Panel>
      </div>
      <aside className="space-y-4">
        <Panel>
          <PanelHeader eyebrow="Progress" title={`${step + 1} of ${steps.length} steps`} />
          <div className="mt-4 h-1.5 bg-[#e0dad1]"><div className="h-full bg-[#b88a4c]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          <p className="mt-4 text-sm leading-6 text-[#69736f]">Draft inputs are saved in this browser until Supabase persistence is connected.</p>
          {savedAt ? <p className="mt-3 text-xs text-[#8b6234]">Last saved at {savedAt}</p> : null}
        </Panel>
        <Panel>
          <PanelHeader eyebrow="Review deposit" title="$2,500 USD" />
          <p className="mt-4 text-sm leading-6 text-[#69736f]">{reserved ? "Demo reservation recorded. No charge was made." : "Open the payment preparation step before a live review slot is reserved."}</p>
          <Link href="/checkout" className="mt-4 inline-flex bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">{reserved ? "View reservation" : "Review payment step"}</Link>
        </Panel>
      </aside>
    </div>
  );
}

function ProjectStep({ draft, update }: StepProps) {
  return <>
    <PanelHeader eyebrow="Step 01" title="Project essentials" description="Identify the commercial context before uploading review materials." />
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <Field label="Project title" value={draft.title} onChange={(value) => update("title", value)} placeholder="Campaign or production title" />
      <label className="block"><Label>Talent policy</Label><select className="field" value={draft.talentId} onChange={(event) => update("talentId", event.target.value)}><option value="">Select represented talent</option>{talents.map((talent) => <option key={talent.id} value={talent.id}>{talent.name} / {talent.agency}</option>)}</select></label>
      <Field label="Producer or studio" value={draft.producer} onChange={(value) => update("producer", value)} placeholder="Company name" />
      <Field label="Intended use" value={draft.intendedUse} onChange={(value) => update("intendedUse", value)} placeholder="Campaign film, teaser, virtual host..." />
    </div>
  </>;
}

function FilesStep({ draft, update }: StepProps) {
  const fileTypes = ["Finished video file", "Script and subtitle transcript", "Prompt and tool log", "Disclosure placement preview"];
  function chooseFile(label: string, event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) update("files", { ...draft.files, [label]: file.name });
  }
  return <>
    <PanelHeader eyebrow="Step 02" title="Review materials" description="Choose local files now. Supabase Storage will receive them after backend connection." />
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {fileTypes.map((item) => <label key={item} className="cursor-pointer border border-dashed border-[#bcb2a5] bg-white p-4 hover:bg-[#f2eee7]">
        <span className="text-sm font-semibold text-[#31403d]">{item}</span>
        <span className="mt-4 block break-all text-xs text-[#89918e]">{draft.files[item] ?? "Choose file from this device"}</span>
        <input type="file" className="sr-only" onChange={(event) => chooseFile(item, event)} />
      </label>)}
    </div>
  </>;
}

function RightsStep({ draft, update }: StepProps) {
  return <>
    <PanelHeader eyebrow="Step 03" title="Requested rights and URLs" description="The final certificate will be valid only for the reviewed scope and approved publishing URLs." />
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <Field label="Campaign territory" value={draft.territory} onChange={(value) => update("territory", value)} placeholder="KR, JP, US" />
      <Field label="Release window" value={draft.releaseWindow} onChange={(value) => update("releaseWindow", value)} placeholder="12 months" />
      <Field label="Publishing channels" value={draft.channels} onChange={(value) => update("channels", value)} placeholder="Microsite, owned social, streaming teaser" />
      <Field label="Revenue model" value={draft.revenueModel} onChange={(value) => update("revenueModel", value)} placeholder="Brand campaign / fixed license" />
      <label className="block sm:col-span-2"><Label>Proposed publishing URLs</Label><textarea className="field min-h-28" value={draft.publishingUrls} onChange={(event) => update("publishingUrls", event.target.value)} placeholder={"https://campaign.example.com/release\nhttps://video.example.com/watch/..."} /></label>
    </div>
  </>;
}

function ConfirmStep({ draft, reserved }: { draft: Draft; reserved: boolean }) {
  const checks = [
    ["Project details completed", Boolean(draft.title && draft.talentId && draft.producer)],
    ["At least one review file selected", Object.keys(draft.files).length > 0],
    ["Publishing scope declared", Boolean(draft.territory && draft.publishingUrls)],
    ["Demo review reservation recorded", reserved],
  ] as const;
  return <>
    <PanelHeader eyebrow="Step 04" title="Confirm submission package" description="Your reviewer will compare the finished output, requested rights, and talent policy." />
    <div className="mt-5 space-y-3 text-sm text-[#5f6a67]">{checks.map(([item, complete]) => <div key={item} className="flex items-center gap-3 border border-[#ddd6cc] bg-white p-3"><span className={`flex h-5 w-5 items-center justify-center border text-xs ${complete ? "border-[#719279] bg-[#edf5ea] text-[#28522e]" : "border-[#c8bba9] text-[#9a8d7d]"}`}>{complete ? "✓" : "·"}</span><span>{item}</span></div>)}</div>
  </>;
}

type StepProps = { draft: Draft; update: <K extends keyof Draft>(key: K, value: Draft[K]) => void };
function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="block"><Label>{label}</Label><input className="field" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}
function Label({ children }: { children: React.ReactNode }) { return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{children}</span>; }
