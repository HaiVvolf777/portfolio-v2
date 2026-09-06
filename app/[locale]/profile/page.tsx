import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import Portfolio from "@/components/Portfolio";
import { getDictionary } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";
import { verseCopy } from "@/lib/verse";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const { meta } = getDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/profile`,
      languages: Object.fromEntries(locales.map(language => [language, `/${language}/profile`])),
    },
    openGraph: { title: meta.title, description: meta.description, url: `/${locale}/profile`, images: [`/${locale}/opengraph-image`] },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [`/${locale}/opengraph-image`] },
  };
}

export default async function ProfilePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <><Portfolio locale={locale} simpleOnly /><a href={`/${locale}`} className="v-return-readable">{verseCopy[locale].enter}<ArrowUpRight size={16}/></a></>;
}
