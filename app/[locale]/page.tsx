import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Metaverse from "@/components/world/Metaverse";
import { getDictionary } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const openGraphLocales = { en: "en_US", ar: "ar_AE", ur: "ur_PK" } as const;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = getDictionary(locale);

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", ar: "/ar", ur: "/ur", "x-default": "/en" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      type: "website",
      siteName: "Haider Ali",
      locale: openGraphLocales[locale],
      alternateLocale: locales.filter((language) => language !== locale).map((language) => openGraphLocales[language]),
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function LocalePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Metaverse locale={locale} />;
}
