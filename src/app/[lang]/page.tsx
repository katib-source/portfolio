import { notFound } from "next/navigation";
import { ProjectCard } from "@/components/ProjectCard";
import { getDictionary } from "@/content/dictionary";
import { getContent } from "@/lib/content";
import { formatStack, pad2, projectMeta } from "@/lib/format";
import { isLocale } from "@/lib/types";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { projects, settings } = await getContent();

  return (
    <main>
      <p className="eyebrow">
        <span className="dot" aria-hidden="true">
          ●
        </span>
        &nbsp;&nbsp;{t.eyebrow}
      </p>
      <h1 className="hero-title">
        {t.head1}
        <br />
        {t.head2}
        <span className="stop">.</span>
      </h1>

      <div className="hero-row">
        <p className="quip">{t.quip}</p>
        <div className="hero-cta">
          <p className="hero-sub">{t.sub}</p>
          <a className="btn-primary" href="#projects">
            {t.cta} ↗
          </a>
        </div>
      </div>

      <div className="now">
        <span className="now-chip">{t.now_label}</span>
        <span className="now-text">{settings.now[lang] || settings.now.en}</span>
      </div>

      <p id="projects" className="peek">
        {t.peek}
      </p>

      <div className="grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            href={`/${lang}/projects/${p.slug}`}
            titleAs="h2"
            meta={projectMeta(i, p.tag, t.status[p.status])}
            title={p.title}
            desc={p.desc[lang] || p.desc.en}
            stack={formatStack(p.stack)}
            badge={p.badge}
            color={p.color}
          />
        ))}
        {projects.length < 7 && (
          <div className="card card--slot" aria-hidden="true">
            <div>
              <div className="card-meta">
                {pad2(projects.length + 1)} · {t.slot_meta}
              </div>
              <div className="card-title">{t.slot_title}</div>
              <p className="card-desc">{t.slot_desc}</p>
            </div>
            <span className="card-stack">STACK · STACK</span>
          </div>
        )}
      </div>
    </main>
  );
}
