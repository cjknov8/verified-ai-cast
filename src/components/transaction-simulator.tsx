"use client";

import { useState } from "react";
import { transactionScenarios, type ScenarioRole } from "@/lib/transaction-scenarios";

const roles: Array<{ id: ScenarioRole; label: string }> = [
  { id: "buyer", label: "Buyer" },
  { id: "seller", label: "Seller" },
  { id: "platform", label: "Registry" },
];

export function TransactionSimulator() {
  const [scenarioId, setScenarioId] = useState(transactionScenarios[0].id);
  const [role, setRole] = useState<ScenarioRole>("buyer");
  const [step, setStep] = useState(0);
  const scenario = transactionScenarios.find((item) => item.id === scenarioId) ?? transactionScenarios[0];
  const current = scenario.steps[step];

  function selectScenario(id: string) {
    setScenarioId(id);
    setStep(0);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 lg:grid-cols-3">
        {transactionScenarios.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => selectScenario(item.id)}
            className={`min-h-40 border p-5 text-left transition ${
              item.id === scenario.id
                ? "border-[#b9975b] bg-[#1b2725] text-white"
                : "border-[#cfc6b9] bg-[#f8f5ef] text-[#17211f] hover:border-[#9c8155]"
            }`}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-55">Case 0{index + 1}</span>
            <span className="mt-7 block font-serif text-2xl">{item.name}</span>
            <span className="mt-3 block text-sm leading-6 opacity-65">{item.summary}</span>
          </button>
        ))}
      </div>

      <section className="overflow-hidden border border-[#2c3b38] bg-[#111817] text-white">
        <div className="grid gap-px bg-white/10 lg:grid-cols-[1fr_0.42fr]">
          <div className="bg-[#111817] p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d4b477]">Transaction passport</p>
              <Status status={scenario.status} />
            </div>
            <h2 className="mt-8 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">{scenario.asset.name}</h2>
            <p className="mt-3 text-sm text-white/55">{scenario.asset.category} / {scenario.asset.edition}</p>
            <div className="mt-8 grid gap-px bg-white/10 sm:grid-cols-2">
              <Fact label="Seller" value={scenario.seller.name} />
              <Fact label="Buyer" value={scenario.buyer.name} />
              <Fact label="Assurance" value={scenario.asset.assurance} mono />
              <Fact label="Fingerprint" value={scenario.asset.fingerprint} mono />
            </div>
          </div>
          <div className="bg-[#182321] p-5 sm:p-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Commercial exchange</p>
            <dl className="mt-5 space-y-4">
              <Commercial label="License" value={scenario.commercial.licenseFee} />
              <Commercial label="Platform" value={scenario.commercial.platformFee} />
              <Commercial label="Seller payout" value={scenario.commercial.payout} />
            </dl>
            <p className="mt-7 border-t border-white/10 pt-5 text-sm leading-6 text-white/58">{scenario.commercial.scope}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <section className="border border-[#cfc6b9] bg-[#f8f5ef] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6234]">Authentication matrix</p>
          <div className="mt-5 space-y-3">
            {scenario.checks.map((check) => (
              <div key={check.label} className="grid grid-cols-[auto_1fr] gap-3 border-b border-[#ddd5ca] pb-3">
                <CheckMark status={check.status} />
                <div>
                  <p className="text-sm font-semibold">{check.label}</p>
                  <p className="mt-1 text-xs leading-5 text-[#68736f]">{check.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-[#cfc6b9] bg-white p-5 sm:p-7">
          <div className="flex flex-col justify-between gap-4 border-b border-[#ddd5ca] pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6234]">Customer-view simulation</p>
              <h2 className="mt-2 font-serif text-3xl">What each party gives and receives</h2>
            </div>
            <div className="flex border border-[#c7bcad] p-1">
              {roles.map((item) => (
                <button key={item.id} type="button" onClick={() => setRole(item.id)} className={`px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] ${role === item.id ? "bg-[#17211f] text-white" : "text-[#68736f]"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-3 text-xs text-[#7d7770]">
              <span>Step {step + 1} of {scenario.steps.length}</span>
              <span className="uppercase tracking-[0.12em]">{current.actor === role ? "Your action" : `${current.actor} action`}</span>
            </div>
            <div className="mt-3 h-1 bg-[#e7e0d7]"><div className="h-full bg-[#a8844f] transition-all" style={{ width: `${((step + 1) / scenario.steps.length) * 100}%` }} /></div>
            <h3 className="mt-8 font-serif text-3xl">{current.title}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Exchange label={current.actor === role ? "You provide" : `${current.actor} provides`} value={current.gives} />
              <Exchange label={current.actor === role ? "You receive" : "Counterparty receives"} value={current.receives} />
              <Exchange label="Registry evidence" value={current.proof} />
            </div>
            <div className="mt-7 flex justify-between gap-3">
              <button type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))} className="border border-[#b9afa1] px-4 py-2.5 text-sm font-semibold disabled:opacity-35">Previous</button>
              <button type="button" disabled={step === scenario.steps.length - 1} onClick={() => setStep((value) => Math.min(scenario.steps.length - 1, value + 1))} className="bg-[#17211f] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-35">Next step</button>
            </div>
          </div>
        </section>
      </div>

      <section className="grid gap-px border border-[#cfc6b9] bg-[#cfc6b9] lg:grid-cols-[1fr_0.62fr]">
        <div className="bg-[#f4efe7] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6234]">UX findings</p>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#53605c]">
            {scenario.friction.map((item) => <li key={item} className="border-b border-[#d8d0c4] pb-3">{item}</li>)}
          </ul>
        </div>
        <div className="bg-[#e5d7c5] p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77582f]">Outcome</p>
          <p className="mt-5 font-serif text-2xl leading-9 text-[#17211f]">{scenario.outcome}</p>
        </div>
      </section>
    </div>
  );
}

function Status({ status }: { status: "certified" | "conditional" | "blocked" }) {
  const styles = {
    certified: "border-[#769584] bg-[#243a34] text-[#c8ddcf]",
    conditional: "border-[#b79a58] bg-[#423a22] text-[#f1d898]",
    blocked: "border-[#a9615f] bg-[#4a2828] text-[#f2c2bd]",
  };
  return <span className={`border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${styles[status]}`}>{status}</span>;
}

function Fact({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="bg-[#182321] p-4"><p className="text-[10px] uppercase tracking-[0.14em] text-white/38">{label}</p><p className={`mt-2 break-all text-sm text-white/82 ${mono ? "font-mono" : ""}`}>{value}</p></div>;
}

function Commercial({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 text-sm"><dt className="text-white/45">{label}</dt><dd className="text-right font-semibold">{value}</dd></div>;
}

function CheckMark({ status }: { status: "passed" | "warning" | "failed" }) {
  const style = status === "passed" ? "border-[#719279] bg-[#edf5ea] text-[#28522e]" : status === "warning" ? "border-[#c7a158] bg-[#fbf4d8] text-[#6d5611]" : "border-[#b36a66] bg-[#fff0ef] text-[#8a2b27]";
  const label = status === "passed" ? "✓" : status === "warning" ? "!" : "×";
  return <span className={`flex h-6 w-6 items-center justify-center border text-xs font-bold ${style}`}>{label}</span>;
}

function Exchange({ label, value }: { label: string; value: string }) {
  return <div className="border border-[#ddd5ca] bg-[#f8f5ef] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8b6234]">{label}</p><p className="mt-3 text-sm leading-6 text-[#45514e]">{value}</p></div>;
}
