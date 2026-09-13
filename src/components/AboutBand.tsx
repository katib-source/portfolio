import type { Dictionary } from "@/content/dictionary";
import { CONTACT } from "@/lib/site";

export function AboutBand({ t }: { t: Dictionary }) {
  return (
    <div id="about" className="about">
      <section className="about-inner" aria-labelledby="about-heading">
        <div className="portrait">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized 2× asset, keeps CSP free of inline styles */}
          <img className="portrait-img" src="/katib-portrait.jpg" alt="Katib Kachi" width={168} height={168} />
          <div className="say-hi" aria-hidden="true">
            SAY HI
          </div>
        </div>
        <div className="about-text">
          <p className="about-hello" lang="fr">
            Salut, je suis Katib.
          </p>
          <h2 id="about-heading" className="about-head">
            {t.about_head1}
            <br />
            {t.about_head2}
          </h2>
          <p className="about-body">{t.about_body}</p>
          <div className="about-links">
            <a className="pill-email" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </a>
            <a className="pill-dark" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a className="pill-dark" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a className="pill-dark" href={CONTACT.cv} target="_blank" rel="noopener">
              CV ↗
            </a>
          </div>
        </div>
      </section>
      <footer className="footer-line">© {new Date().getFullYear()} KATIB KACHI · NICE, FRANCE</footer>
    </div>
  );
}
