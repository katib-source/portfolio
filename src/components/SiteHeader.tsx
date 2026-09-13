"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT } from "@/lib/site";
import { LOCALES, type Locale } from "@/lib/types";

export type HeaderCert = { name: string; meta: string; href: string | null; external: boolean };

type Labels = {
  projects: string;
  about: string;
  talk: string;
  certsBtn: string;
  certs: string;
  close: string;
};

export function SiteHeader({ lang, labels, certs }: { lang: Locale; labels: Labels; certs: HeaderCert[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? `/${lang}`;
  const rest = pathname.replace(/^\/(en|fr)(?=\/|$)/, "");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="header">
        <Link href={`/${lang}`} className="wordmark" aria-label="katib — home">
          katib<span className="star">*</span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link className="nav-link" href={`/${lang}#projects`}>
            {labels.projects} <sup className="nav-idx">01</sup>
          </Link>
          <a className="nav-link" href="#about">
            {labels.about} <sup className="nav-idx">02</sup>
          </a>
          <a className="nav-link" href={CONTACT.cv} target="_blank" rel="noopener">
            CV <sup className="nav-idx">03</sup>
          </a>
          {certs.length > 0 && (
            <button
              type="button"
              className="certs-btn"
              aria-expanded={open}
              aria-controls="certs-panel"
              onClick={() => setOpen((o) => !o)}
            >
              {labels.certsBtn}
            </button>
          )}
          <span className="lang" role="group" aria-label="Language">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                hrefLang={l}
                lang={l}
                className="lang-opt"
                aria-current={l === lang ? "true" : undefined}
                scroll={false}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </span>
          <a className="pill" href={`mailto:${CONTACT.email}`}>
            {labels.talk} ↗
          </a>
        </nav>
      </header>

      {certs.length > 0 && (
        <div id="certs-panel" className={open ? "certs-wrap is-open" : "certs-wrap"} inert={!open}>
          <div className="certs-clip">
            <section className="certs-panel" aria-label={labels.certs}>
              <div className="certs-head">
                <span className="mono-label">{labels.certs}</span>
                <button type="button" className="certs-close" aria-label={labels.close} onClick={() => setOpen(false)}>
                  ✕
                </button>
              </div>
              <div className="certs-grid">
                {certs.map((c, i) => {
                  const inner = (
                    <>
                      <span className="cert-name">{c.name}</span>
                      <span className="cert-meta">{c.meta}</span>
                    </>
                  );
                  return c.href ? (
                    <a
                      key={i}
                      className="cert"
                      href={c.href}
                      target="_blank"
                      rel={c.external ? "noopener noreferrer" : "noopener"}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={i} className="cert">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
