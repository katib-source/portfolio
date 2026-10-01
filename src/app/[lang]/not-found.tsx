export default function NotFound() {
  return (
    <main className="lost">
      <p className="eyebrow">404</p>
      <h1 className="lost-title">
        This page wandered off<span className="stop">.</span>
      </h1>
      <p className="quip quip--static" lang="fr">
        Cette page s&apos;est égarée.
      </p>
      {/* Plain anchor: "/" is a locale redirect, not worth prefetching. */}
      <a className="btn-primary" href="/">
        katib* ↗
      </a>
    </main>
  );
}
