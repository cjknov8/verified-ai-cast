import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111817] px-5 text-white">
      <section className="max-w-xl border border-white/12 bg-[#182321] p-8 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">Record not found</p>
        <h1 className="mt-5 font-serif text-4xl">This record does not exist.</h1>
        <p className="mt-4 leading-7 text-white/60">
          Check the identifier before relying on an approval claim. Unknown IDs are never substituted with another certificate or project.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/verify" className="bg-[#d4b477] px-4 py-3 text-sm font-semibold text-[#111817]">Search certificates</Link>
          <Link href="/" className="border border-white/20 px-4 py-3 text-sm font-semibold text-white">Return home</Link>
        </div>
      </section>
    </main>
  );
}
