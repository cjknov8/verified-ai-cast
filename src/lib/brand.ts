export const brand = {
  name: "Verified Presence",
  shortName: "VP",
  legacyProgram: "AI Cast",
  tagline: {
    en: "Official asset appearance registry",
    ko: "공식 에셋 등장 인증 레지스트리",
  },
};

export type Locale = "en" | "ko";

export function localizedPath(pathname: string, locale: Locale) {
  if (locale === "ko") {
    if (pathname === "/") return "/ko";
    if (pathname.startsWith("/ko")) return pathname;
    return `/ko${pathname}`;
  }

  if (pathname === "/ko") return "/";
  if (pathname.startsWith("/ko/")) return pathname.slice(3) || "/";
  return pathname;
}
