/**
 * Every tool used across the projects, set as two lines of large type that
 * drift in opposite directions as the section crosses the viewport (CSS
 * scroll-driven animation, so it moves only when the visitor scrolls).
 * Without scroll-timeline support, or with reduced motion, the lines wrap and stay put.
 */
export function Toolbox({ title, items }: { title: string; items: string[] }) {
  const half = Math.ceil(items.length / 2);
  const lines = [items.slice(0, half), items.slice(half)].filter((l) => l.length);

  return (
    <section className="toolbox" aria-labelledby="toolbox-title">
      <h2 id="toolbox-title" className="section-title toolbox-title" data-reveal>
        {title}
      </h2>
      <div className="tool-lines">
        {lines.map((line, li) => (
          <ul key={li} className={`tool-line tool-line--${li === 0 ? "a" : "b"}`}>
            {line.map((item) => (
              <li key={item} className="tool">
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
