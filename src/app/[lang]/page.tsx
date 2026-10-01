import { notFound } from "next/navigation";
import { Denoise } from "@/components/Denoise";
import { FeaturedProject } from "@/components/FeaturedProject";
import { SignalPlot } from "@/components/SignalPlot";
import { Toolbox } from "@/components/Toolbox";
import { WorkIndex } from "@/components/WorkIndex";
import { getDictionary } from "@/content/dictionary";
import { getContent } from "@/lib/content";
import { collectStack } from "@/lib/format";
import { CONTACT } from "@/lib/site";
import { isLocale } from "@/lib/types";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const t = getDictionary(lang);
  const { projects, settings } = await getContent();
  const [featured, ...rest] = projects;
  const tools = collectStack(projects);
  const now = settings.now[lang] || settings.now.en;

  return (
    <main className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <Denoise lines={[t.head1, t.head2]} stop />
          </h1>
          <p className="quip">{t.quip}</p>
          <p className="hero-sub">{t.sub}</p>
          <div className="hero-ctas">
            <a className="btn-primary" href="#projects">
              {t.cta} ↓
            </a>
            <a className="pill" href={`mailto:${CONTACT.email}`}>
              {t.talk} ↗
            </a>
          </div>
        </div>
        <SignalPlot
          labels={{ label: t.plot_label, hint: t.plot_hint, noise: t.plot_noise, clean: t.plot_clean }}
        />
      </section>

      {now && (
        <p className="now">
          <span className="now-chip">{t.now_label}</span>
          <span className="now-text">{now}</span>
        </p>
      )}

      <div id="projects" className="projects">
        {featured && <FeaturedProject project={featured} lang={lang} t={t} />}
        {rest.length > 0 && <WorkIndex projects={rest} offset={1} lang={lang} t={t} />}
      </div>

      {tools.length >= 4 && <Toolbox title={t.toolbox_title} items={tools} />}
    </main>
  );
}
