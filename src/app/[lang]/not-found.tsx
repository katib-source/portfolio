export default function NotFound() {
  return (
    <main>
      <p className="eyebrow">
        <span className="dot" aria-hidden="true">
          ●
        </span>
        &nbsp;&nbsp;404
      </p>
      <h1 className="hero-title">
        This page wandered off<span className="stop">.</span>
      </h1>
      <div className="hero-row">
        <p className="quip" lang="fr">
          Cette page s&apos;est égarée.
        </p>
        {/* Plain anchor: "/" is a locale redirect, not worth prefetching. */}
        <a className="btn-primary" href="/">
          katib* ↗
        </a>
      </div>
    </main>
  );
}
