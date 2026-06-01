"use client";

import { useState } from "react";
import Link from "next/link";
import { Panel, PanelHeader, SecondaryButton } from "@/components/ui";
import { talents } from "@/lib/mock-data";

const steps = ["Project", "Files", "Rights", "Confirm"];

export function SubmissionWorkspace() {
  const [step, setStep] = useState(0);

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div>
        <div className="mb-4 grid grid-cols-4 border border-[#d2cbc1] bg-[#f8f5ef]">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`border-r border-[#d2cbc1] px-3 py-3 text-left last:border-r-0 ${index === step ? "bg-[#253b37] text-white" : "text-[#69736f] hover:bg-[#eee9e1]"}`}
            >
              <span className="block font-mono text-[10px] opacity-65">0{index + 1}</span>
              <span className="mt-1 block text-xs font-semibold">{label}</span>
            </button>
          ))}
        </div>
        <Panel>
          {step === 0 ? <ProjectStep /> : null}
          {step === 1 ? <FilesStep /> : null}
          {step === 2 ? <RightsStep /> : null}
          {step === 3 ? <ConfirmStep /> : null}
          <div className="mt-6 flex flex-wrap justify-between gap-3 border-t border-[#ddd6cc] pt-4">
            <SecondaryButton type="button">{step === 0 ? "Save draft" : "Back"}</SecondaryButton>
            <button
              type="button"
              onClick={() => setStep(Math.min(step + 1, steps.length - 1))}
              className="bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]"
            >
              {step === steps.length - 1 ? "Submit for review" : "Continue"}
            </button>
          </div>
        </Panel>
      </div>
      <aside className="space-y-4">
        <Panel>
          <PanelHeader eyebrow="Progress" title={`${step + 1} of ${steps.length} steps`} />
          <div className="mt-4 h-1.5 bg-[#e0dad1]">
            <div className="h-full bg-[#b88a4c]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <p className="mt-4 text-sm leading-6 text-[#69736f]">A complete package reduces revision cycles and keeps the rights decision inspectable.</p>
        </Panel>
        <Panel>
          <PanelHeader eyebrow="Review deposit" title="$2,500 USD" />
          <p className="mt-4 text-sm leading-6 text-[#69736f]">Payment will be collected before a live review slot is reserved.</p>
          <Link href="/checkout" className="mt-4 inline-flex bg-[#253b37] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#31504a]">Review payment step</Link>
        </Panel>
      </aside>
    </div>
  );
}

function ProjectStep() {
  return (
    <>
      <PanelHeader eyebrow="Step 01" title="Project essentials" description="Identify the commercial context before uploading review materials." />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Project title" placeholder="Campaign or production title" />
        <label className="block"><Label>Talent policy</Label><select className="field"><option>Select represented talent</option>{talents.map((talent) => <option key={talent.id}>{talent.name} / {talent.agency}</option>)}</select></label>
        <Field label="Producer or studio" placeholder="Company name" />
        <Field label="Intended use" placeholder="Campaign film, teaser, virtual host..." />
      </div>
    </>
  );
}

function FilesStep() {
  return (
    <>
      <PanelHeader eyebrow="Step 02" title="Review materials" description="Upload the final result and the records needed for a defensible decision." />
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {["Finished video file", "Script and subtitle transcript", "Prompt and tool log", "Disclosure placement preview"].map((item) => (
          <button key={item} type="button" className="border border-dashed border-[#bcb2a5] bg-white p-4 text-left hover:bg-[#f2eee7]">
            <span className="text-sm font-semibold text-[#31403d]">{item}</span>
            <span className="mt-4 block text-xs text-[#89918e]">Choose file or drag here</span>
          </button>
        ))}
      </div>
    </>
  );
}

function RightsStep() {
  return (
    <>
      <PanelHeader eyebrow="Step 03" title="Requested rights and URLs" description="The final certificate will be valid only for the reviewed scope and approved publishing URLs." />
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Campaign territory" placeholder="KR, JP, US" />
        <Field label="Release window" placeholder="12 months" />
        <Field label="Publishing channels" placeholder="Microsite, owned social, streaming teaser" />
        <Field label="Revenue model" placeholder="Brand campaign / fixed license" />
        <label className="block sm:col-span-2"><Label>Proposed publishing URLs</Label><textarea className="field min-h-28" placeholder={"https://campaign.example.com/release\nhttps://video.example.com/watch/..."} /></label>
      </div>
    </>
  );
}

function ConfirmStep() {
  return (
    <>
      <PanelHeader eyebrow="Step 04" title="Confirm submission package" description="Your reviewer will compare the finished output, requested rights, and talent policy." />
      <div className="mt-5 space-y-3 text-sm text-[#5f6a67]">
        {["Project details completed", "Final media package attached", "Requested scope and URL allowlist declared", "Review deposit step acknowledged"].map((item) => (
          <label key={item} className="flex items-center gap-3 border border-[#ddd6cc] bg-white p-3"><input type="checkbox" defaultChecked /> <span>{item}</span></label>
        ))}
      </div>
    </>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return <label className="block"><Label>{label}</Label><input className="field" placeholder={placeholder} /></label>;
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-[#756f67]">{children}</span>;
}
