"use client";

import { useState } from "react";
import { Notice, PrimaryButton, SecondaryButton, StatusPill } from "@/components/ui";

type Action = "approved" | "changes_requested" | "rejected" | "revoked";
type LocalEvent = { action: Action; note: string; createdAt: string };

export function ReviewDecisionConsole({ projectId, initialStatus }: { projectId: string; initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [note, setNote] = useState("");
  const [events, setEvents] = useState<LocalEvent[]>([]);

  function record(action: Action) {
    const event = { action, note: note.trim() || defaultNote(action), createdAt: new Date().toISOString() };
    const next = [event, ...events];
    setEvents(next);
    setStatus(action);
    setNote("");
    window.localStorage.setItem(`verified-ai-cast:review-events:${projectId}`, JSON.stringify(next));
  }

  return (
    <div className="mt-5 border-t border-[#ddd6cc] pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8b6234]">Record a demo decision</p><p className="mt-1 text-sm text-[#6c7773]">This browser-only event previews the Phase 2 audit log behavior.</p></div>
        <StatusPill status={status} />
      </div>
      <textarea value={note} onChange={(event) => setNote(event.target.value)} className="field mt-4 min-h-20" placeholder="Decision note or reason" />
      <div className="mt-3 flex flex-wrap gap-3">
        <span onClick={() => record("approved")}><PrimaryButton>Approve</PrimaryButton></span>
        <span onClick={() => record("changes_requested")}><SecondaryButton>Request changes</SecondaryButton></span>
        <span onClick={() => record("rejected")}><SecondaryButton>Reject</SecondaryButton></span>
        <span onClick={() => record("revoked")}><SecondaryButton>Revoke</SecondaryButton></span>
      </div>
      {events.length ? <div className="mt-4 space-y-2">{events.map((event) => <Notice key={`${event.action}-${event.createdAt}`} tone={event.action === "approved" ? "success" : "warning"}><span className="font-semibold capitalize">{event.action.replace("_", " ")}</span> / {event.note}<span className="mt-1 block font-mono text-xs opacity-70">{event.createdAt}</span></Notice>)}</div> : null}
    </div>
  );
}

function defaultNote(action: Action) {
  return {
    approved: "Approved in the local demo workspace.",
    changes_requested: "Revision requested in the local demo workspace.",
    rejected: "Rejected in the local demo workspace.",
    revoked: "Certificate revoked in the local demo workspace.",
  }[action];
}
