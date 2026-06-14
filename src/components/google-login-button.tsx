"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function GoogleLoginButton({ enabled, nextPath }: { enabled: boolean; nextPath: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {
    setPending(true);
    setError("");

    try {
      const supabase = createClient();
      const callback = new URL("/auth/callback", window.location.origin);
      callback.searchParams.set("next", nextPath);
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: callback.toString() },
      });
      if (signInError) throw signInError;
    } catch {
      setError("Google 로그인을 시작하지 못했습니다. 운영 설정을 확인해주세요.");
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={signIn}
        disabled={!enabled || pending}
        className="w-full border border-white/20 bg-white px-5 py-3.5 text-sm font-semibold text-[#17211f] hover:bg-[#f0ece5] disabled:cursor-not-allowed disabled:opacity-45"
      >
        {pending ? "Google로 연결 중..." : "Google 계정으로 계속"}
      </button>
      {!enabled ? (
        <p className="mt-3 text-xs leading-5 text-[#f1d898]">
          현재 데모 환경입니다. Supabase와 Google OAuth 설정 후 로그인 기능이 활성화됩니다.
        </p>
      ) : null}
      {error ? <p className="mt-3 text-xs leading-5 text-[#f2c2bd]">{error}</p> : null}
    </div>
  );
}
