import type { Metadata } from "next";
import Link from "next/link";
import { GoogleLoginButton } from "@/components/google-login-button";

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
          Verified AI Cast
        </Link>
        <span className="text-xs uppercase tracking-[0.14em] text-white/45">Secure workspace</span>
      </div>
      <section className="mx-auto mt-20 max-w-md border border-white/14 bg-[#182321] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d4b477]">
          Invite-only pilot
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight">검증된 계정으로 접속합니다.</h1>
        <p className="mt-4 text-sm leading-6 text-white/58">
          초기 운영은 Google 계정 로그인만 허용합니다. 로그인 이후에도 판매자, 구매자,
          검수자 권한은 별도 승인되어야 합니다.
        </p>
        <div className="mt-8">
          <GoogleLoginButton enabled={enabled} nextPath={nextPath} />
        </div>
        <p className="mt-6 border-t border-white/10 pt-5 text-xs leading-5 text-white/40">
          로그인은 신원 단서일 뿐 사업자 권한이나 에셋 소유권을 자동으로 증명하지 않습니다.
        </p>
      </section>
    </main>
  );
}
