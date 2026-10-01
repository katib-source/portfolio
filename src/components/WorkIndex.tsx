import Link from "next/link";
import type { Dictionary } from "@/content/dictionary";
import { formatStack, pad2 } from "@/lib/format";
import type { Locale, Project } from "@/lib/types";

/**
 * The rest of the work as an index. Each row is a link to the case study;
 * on hover/focus the project's colour wipes up from the bottom of the row.
 */
export function WorkIndex({
  projects,
  offset,
  lang,
  t,
}: {
  projects: Project[];
  offset: number;
  lang: Locale;
  t: Dictionary;
}) {
  return (
    <section className="work" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title" data-reveal>
        {t.work_title}
      </h2>
      <ol className="index">
        {projects.map((p, i) => (
          <li key={p.slug} data-reveal>
            <Link href={`/${lang}/projects/${p.slug}`} className={`row tone-${p.color}`}>
              <span className="row-num">{pad2(offset + i + 1)}</span>
              <span className="row-main">
                <span className="row-title">{p.title}</span>
                <span className="row-desc">{p.desc[lang] || p.desc.en}</span>
              </span>
              <span className="row-meta">
                <span className="row-tag">
                  {[p.tag.toUpperCase(), t.status[p.status]].filter(Boolean).join(" · ")}
                </span>
                <span className="row-stack">{formatStack(p.stack)}</span>
              </span>
              {p.badge ? <span className="row-badge">{p.badge}</span> : <span />}
              <span className="row-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
