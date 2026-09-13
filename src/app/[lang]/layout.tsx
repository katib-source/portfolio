import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { fontVariables } from "@/app/fonts";
import { AboutBand } from "@/components/AboutBand";
import { SiteHeader, type HeaderCert } from "@/components/SiteHeader";
import { getDictionary } from "@/content/dictionary";
import { getContent } from "@/lib/content";
import { certMeta, isExternalHref, isSafeHref } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { isLocale } from "@/lib/types";
import "@/styles/base.css";
import "@/styles/site.css";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta_title,
    description: t.meta_desc,
    authors: [{ name: "Katib Kachi" }],
    keywords: ["Data Science", "AI", "IA", "Machine Learning", "NLP", "Python", "Université Côte d'Azur", "Alternance"],
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", fr: "/fr", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: "Katib Kachi",
      title: t.meta_title,
      description: t.meta_desc,
      url: `/${lang}`,
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
    twitter: { card: "summary_large_image", title: t.meta_title, description: t.meta_desc },
  };
}

export default async function SiteLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  // Per-request rendering so every response carries a fresh CSP nonce.
  await connection();

  const t = getDictionary(lang);
  const { certs } = await getContent();
  const headerCerts: HeaderCert[] = certs.map((c) => {
    const href = isSafeHref(c.link) ? c.link : null;
    return { name: c.name, meta: certMeta({ ...c, link: href ?? "" }), href, external: href ? isExternalHref(href) : false };
  });

  return (
    <html lang={lang} className={fontVariables}>
      <body>
        <div className="page">
          <SiteHeader
            lang={lang}
            certs={headerCerts}
            labels={{
              projects: t.nav_projects,
              about: t.nav_about,
              talk: t.talk,
              certsBtn: t.certs_btn,
              certs: t.certs,
              close: t.close,
            }}
          />
          {children}
        </div>
        <AboutBand t={t} />
      </body>
    </html>
  );
}
