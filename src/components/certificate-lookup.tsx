"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function CertificateLookup() {
  const [certificateId, setCertificateId] = useState("cert-2026-0007");
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (certificateId.trim()) router.push(`/certificates/${encodeURIComponent(certificateId.trim())}`);
  }

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3 sm:flex-row">
      <input value={certificateId} onChange={(event) => setCertificateId(event.target.value)} className="min-w-0 flex-1 border border-[#b9afa1] bg-white px-4 py-3 text-sm text-[#31403d]" aria-label="Certificate ID" />
      <button className="bg-[#253b37] px-5 py-3 text-sm font-semibold text-white hover:bg-[#31504a]">Inspect certificate</button>
    </form>
  );
}
