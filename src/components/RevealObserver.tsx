"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Fades [data-reveal] elements in as they scroll into view (opacity, a short
 * rise and a blur that resolves: the content "comes into focus").
 * Progressive: nothing is hidden without JS, elements already on screen at load
 * are left alone (no flash), and reduced-motion users get no reveal at all.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.replace("rv-wait", "rv-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    const fold = window.innerHeight;
    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]:not(.rv-in)")) {
      if (el.getBoundingClientRect().top < fold * 0.9) {
        el.classList.remove("rv-wait"); // may be left over from the previous route
        continue;
      }
      el.classList.add("rv-wait");
      io.observe(el);
    }
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
