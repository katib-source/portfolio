import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Denoise } from "@/components/Denoise";
import { getDictionary } from "@/content/dictionary";
import { getContent } from "@/lib/content";
import { isExternalHref, isSafeHref, projectMeta, splitStack } from "@/lib/format";
import { isLocale } from "@/lib/types";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const { projects } = await getContent();
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Katib Kachi`;
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
  const source = project.blocks[lang].some(Boolean) ? project.blocks[lang] : project.blocks.en;
  const blocks = source.map((body, i) => ({ body, label: t.labels[i], last: i === 3 })).filter((b) => b.body);

  return (
    <main className="case">
      <div className="case-layout">
        <header className="case-head">
          <Link className="pill pill--back" href={`/${lang}#projects`}>
            ← {t.back}
          </Link>
          <p className="case-meta">{projectMeta(index, project.tag, t.status[project.status])}</p>
          <h1 className="case-title">
            <Denoise lines={[project.title]} stop />
          </h1>
          <p className="case-lead">{project.desc[lang] || project.desc.en}</p>
          {project.badge && <p className={`case-stat tone-${project.color}`}>{project.badge}</p>}
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
          </div>
          <ul className="chips case-chips" aria-label="Stack">
            {splitStack(project.stack).map((item) => (
              <li key={item} className="chip-item">
                {item}
              </li>
            ))}
          </ul>
        </header>

        {blocks.length > 0 && (
          <ol className={`case-steps tone-${project.color}`}>
            {blocks.map((b) => (
              <li key={b.label} className={b.last ? "case-step case-step--result" : "case-step"} data-reveal>
                <h2 className="mono-label case-label">{b.label}</h2>
                <p className="case-body">{b.body}</p>
              </li>
            ))}
          </ol>
        )}
      </div>

      {projects.length > 1 && (
        <Link className={`case-next tone-${next.color}`} href={`/${lang}/projects/${next.slug}`} data-reveal>
          <span className="mono-label case-next-label">{t.next_label}</span>
          <span className="case-next-title">
            {next.title}
            {"\u00a0"}
            <span aria-hidden="true">→</span>
          </span>
        </Link>
      )}
    </main>
  );
}
