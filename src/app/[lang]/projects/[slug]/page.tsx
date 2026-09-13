import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content/dictionary";
import { getContent } from "@/lib/content";
import { formatStack, isExternalHref, isSafeHref, projectMeta } from "@/lib/format";
import { isLocale } from "@/lib/types";

type Props = { params: Promise<{ lang: string; slug: string }> };

const BLOCK_VARIANTS = ["white", "white", "peri", "yellow"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const { projects } = await getContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} — Katib Kachi`;
  const description = project.desc[lang] || project.desc.en;
  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/projects/${project.slug}`,
      languages: { en: `/en/projects/${project.slug}`, fr: `/fr/projects/${project.slug}` },
    },
    openGraph: { title, description, url: `/${lang}/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { projects } = await getContent();
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const link = isSafeHref(project.link) ? project.link : "";
  const stack = formatStack(project.stack);
  const source = project.blocks[lang].some(Boolean) ? project.blocks[lang] : project.blocks.en;
  const blocks = source
    .map((body, i) => ({ body, label: t.labels[i], variant: BLOCK_VARIANTS[i] }))
    .filter((b) => b.body);

  return (
    <main>
      <Link className="pill pill--back" href={`/${lang}#projects`}>
        ← {t.back}
      </Link>
      <p className="case-meta">{projectMeta(index, project.tag, t.status[project.status])}</p>
      <h1 className="case-title">
        {project.title}
        <span className="stop">.</span>
      </h1>
      <p className="case-lead">{project.desc[lang] || project.desc.en}</p>

      <div className="case-actions">
        {link && (
          <a
            className="btn-primary btn-primary--sm"
            href={link}
            {...(isExternalHref(link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {t.visit} ↗
          </a>
        )}
        {stack && <span className="stack-pill">{stack}</span>}
      </div>

      {blocks.length > 0 && (
        <div className="case-grid">
          {blocks.map((b) => (
            <section key={b.label} className={`case-block case-block--${b.variant}`}>
              <h2 className="mono-label case-label">{b.label}</h2>
              <p className="case-body">{b.body}</p>
            </section>
          ))}
        </div>
      )}

      {projects.length > 1 && (
        <div className="case-foot">
          <span className="case-note">{t.next_note}</span>
          <Link className="pill pill--next" href={`/${lang}/projects/${next.slug}`}>
            {next.title} →
          </Link>
        </div>
      )}
    </main>
  );
}
