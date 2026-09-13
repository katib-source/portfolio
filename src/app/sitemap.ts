import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { LOCALES } from "@/lib/types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getContent();
  const paths = ["", ...projects.map((p) => `/projects/${p.slug}`)];

  return paths.flatMap((path) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority: path ? 0.7 : 1,
      alternates: { languages: { en: `${SITE_URL}/en${path}`, fr: `${SITE_URL}/fr${path}` } },
    })),
  );
}
