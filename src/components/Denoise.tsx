/**
 * Headline text that starts as scattered "noise" and settles into place on load.
 * Pure CSS: each letter gets an offset from a small cycle of nth-child variants
 * (see .dn-c in site.css), so there are no inline styles for the CSP and no JS.
 * Screen readers get the plain text; the letter spans are hidden from them.
 */
export function Denoise({ lines, stop = false }: { lines: string[]; stop?: boolean }) {
  return (
    <>
      <span className="sr-only">
        {lines.join(" ")}
        {stop && "."}
      </span>
      <span className="dn" aria-hidden="true">
        {lines.map((line, li) => (
          <span key={li} className="dn-line">
            {line.split(" ").map((word, wi) => (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="dn-w">
                  {Array.from(word).map((ch, ci) => (
                    <span key={ci} className="dn-c">
                      {ch}
                    </span>
                  ))}
                  {stop && li === lines.length - 1 && wi === line.split(" ").length - 1 && (
                    <span className="dn-c stop">.</span>
                  )}
                </span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </>
  );
}
