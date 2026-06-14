import Link from "next/link";
import { DemoReservation } from "@/components/demo-reservation";
import { getPlatformProviders } from "@/lib/platform-providers";

export default function CheckoutPage() {
  const providers = getPlatformProviders();
  const koreaLaunch = providers.launchMarket !== "GLOBAL";

  return (
    <main className="min-h-screen bg-[#111817] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-[#d4b477]/70 text-xs font-semibold text-[#e5cc98]">VA</span>
            <span className="text-sm font-semibold uppercase tracking-[0.16em]">Verified AI Cast</span>
          </Link>
          <p className="text-xs uppercase tracking-[0.14em] text-white/45">Secure review reservation</p>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:py-20">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">Creator onboarding</p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-tight sm:text-6xl">Reserve an official appearance review.</h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-white/62">
            Start with a review deposit. Once payment is contractually approved, the next step will open
            {koreaLaunch ? " PortOne with a Toss Payments channel" : " Stripe Checkout"} and return you to project submission.
          </p>
          <ol className="mt-10 space-y-5 border-t border-white/12 pt-6 text-sm text-white/72">
            <li className="flex gap-4"><span className="font-mono text-[#d4b477]">01</span><span>Reserve the review slot.</span></li>
            <li className="flex gap-4"><span className="font-mono text-[#d4b477]">02</span><span>Submit the finished media package.</span></li>
            <li className="flex gap-4"><span className="font-mono text-[#d4b477]">03</span><span>Receive approval, revisions, or a documented rejection.</span></li>
          </ol>
        </section>
        <aside className="self-start border border-white/14 bg-[#182321] p-5 sm:p-7">
          <p className="text-xs uppercase tracking-[0.16em] text-[#d4b477]">Order summary</p>
          <div className="mt-6 border-b border-white/12 pb-5">
            <div className="flex justify-between gap-4">
              <div><p className="font-semibold">Project review deposit</p><p className="mt-1 text-sm text-white/52">One finished AI appearance result</p></div>
              <p className="font-semibold">{koreaLaunch ? "₩3,500,000" : "$2,500"}</p>
            </div>
          </div>
          <div className="flex justify-between gap-4 py-5 text-sm"><span className="text-white/62">Due today</span><span className="text-lg font-semibold">{koreaLaunch ? "₩3,500,000 KRW" : "$2,500 USD"}</span></div>
          <DemoReservation />
        </aside>
      </div>
    </main>
  );
}
