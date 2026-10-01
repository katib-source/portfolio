import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { isExternalHref, isSafeHref, splitStack } from "@/lib/format";
import type { Locale, Project } from "@/lib/types";

/** The lead project, told as its own pipeline: problem, data, approach, result. */
export function FeaturedProject({ project, lang, t }: { project: Project; lang: Locale; t: Dictionary }) {
  const source = project.blocks[lang].some(Boolean) ? project.blocks[lang] : project.blocks.en;
  const steps = source.map((body, i) => ({ body, label: t.labels[i] })).filter((s) => s.body);
  const link = isSafeHref(project.link) ? project.link : "";
  const meta = [project.tag.toUpperCase(), t.status[project.status]].filter(Boolean).join(" · ");

  return (
    <section className={`feature tone-${project.color}`} aria-labelledby="feature-title" data-reveal>
      <div className="feature-top">
        <div className="feature-intro">
          <p className="mono-label feature-meta">{meta}</p>
          <h2 id="feature-title" className="feature-title">
            {project.title}
          </h2>
          <p className="feature-desc">{project.desc[lang] || project.desc.en}</p>
        </div>
        {project.badge && <p className="feature-stat">{project.badge}</p>}
      </div>

      {steps.length > 0 && (
        <ol className="pipeline">
          {steps.map((s) => (
            <li key={s.label} className="pipe-step">
              <span className="pipe-node" aria-hidden="true" />
              <h3 className="mono-label pipe-label">{s.label}</h3>
              <p className="pipe-body">{s.body}</p>
            </li>
          ))}
        </ol>
      )}

      <div className="feature-foot">
        <div className="feature-actions">
          <Link className="btn-primary btn-on-tone" href={`/${lang}/projects/${project.slug}`}>
            {t.featured} →
          </Link>
          {link && (
            <a
              className="pill pill-on-tone"
              href={link}
              {...(isExternalHref(link) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {t.visit} ↗
            </a>
          )}
        </div>
        <ul className="chips" aria-label="Stack">
          {splitStack(project.stack).map((item) => (
            <li key={item} className="chip-item">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
