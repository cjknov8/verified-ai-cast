"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const RESERVATION_KEY = "verified-ai-cast:review-reservation";

export function DemoReservation() {
  const [reservation, setReservation] = useState<string>();
  useEffect(() => {
    const timer = window.setTimeout(() => setReservation(window.localStorage.getItem(RESERVATION_KEY) ?? undefined), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function reserve() {
    const id = `demo-${Date.now()}`;
    window.localStorage.setItem(RESERVATION_KEY, id);
    setReservation(id);
  }

  if (reservation) return <div className="mt-5 border border-[#6f927f] bg-[#243a34] p-4 text-sm text-[#b9d6c6]"><p className="font-semibold">Demo review slot reserved</p><p className="mt-1 font-mono text-xs">{reservation}</p><p className="mt-2 text-xs leading-5">No card details were collected and no charge was made.</p><Link href="/projects/new" className="mt-4 inline-flex bg-[#d4b477] px-4 py-2.5 font-semibold text-[#111817] hover:bg-[#e3c98f]">Continue submission</Link></div>;

  return <>
    <button onClick={reserve} className="w-full bg-[#d4b477] px-4 py-3 text-sm font-semibold text-[#111817] hover:bg-[#e3c98f]">Reserve demo review without payment</button>
    <p className="mt-4 text-xs leading-5 text-white/42">This demo action stores a reservation ID only in your browser. Stripe Checkout will replace it after backend activation.</p>
  </>;
}
