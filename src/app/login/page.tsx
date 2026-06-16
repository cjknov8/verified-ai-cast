import type { Metadata } from "next";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/google-login-button";
import { LanguageSwitch } from "@/components/language-switch";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Operator Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath =
    params.next?.startsWith("/") && !params.next.startsWith("//")
      ? params.next
      : "/operations";
  const enabled = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  return (
    <main className="min-h-screen bg-[#111817] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/" className="text-xs font-semibold uppercase tracking-[0.16em]">
          {brand.name}
        </Link>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs uppercase tracking-[0.14em] text-white/45 sm:block">Secure workspace</span>
          <LanguageSwitch locale="en" />
        </div>
      </div>
      <section className="mx-auto mt-20 max-w-md border border-white/14 bg-[#182321] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">
          Invite-only pilot
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">Sign in with a verified account.</h1>
        <p className="mt-4 text-sm leading-6 text-white/58">
          During the pilot, workspace access uses Google sign-in only. Seller, buyer, and reviewer permissions still require separate approval.
        </p>
        <div className="mt-8">
          <GoogleLoginButton enabled={enabled} nextPath={nextPath} />
        </div>
        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
          Sign-in confirms account access only. It does not automatically prove business authority or asset ownership.
        </p>
      </section>
    </main>
  );
}
