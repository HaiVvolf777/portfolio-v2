import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return ["", "/profile"].flatMap(path => locales.map((locale) => ({
    url: `${siteUrl}/${locale}${path}`,
    changeFrequency: "monthly" as const,
    priority: locale === "en" ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(locales.map((language) => [language, `${siteUrl}/${language}${path}`])),
    },
  })));
}
