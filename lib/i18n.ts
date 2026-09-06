export const locales = ["en", "ar", "ur"] as const;

export type Locale = (typeof locales)[number];

export const languageNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  ur: "اردو",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && locales.includes(value as Locale);
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "en" ? "ltr" : "rtl";
}

/** Resolve browser preferences in priority order, with English as the fallback. */
export function detectLocale(languages: readonly string[] | string | null = []): Locale {
  const preferences = typeof languages === "string"
    ? languages.split(",").map((entry) => {
      const [language, ...parameters] = entry.trim().split(";");
      const quality = parameters.find((parameter) => parameter.trim().startsWith("q="));
      return { language, weight: quality ? Number(quality.trim().slice(2)) : 1 };
    }).filter(({ weight }) => Number.isFinite(weight) && weight > 0)
      .sort((a, b) => b.weight - a.weight).map(({ language }) => language)
    : languages ?? [];
  for (const language of preferences) {
    const base = language.toLowerCase().split(/[-_]/)[0];
    if (isLocale(base)) return base;
  }
  return "en";
}
