import type { Certification, Project } from "@/lib/types";

// Pure helpers shared by the public site and the admin (client-safe).

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function formatStack(stack: string): string {
  return stack
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" · ")
    .toUpperCase();
}

export function projectMeta(index: number, tag: string, status: string): string {
  return [pad2(index + 1), tag.toUpperCase(), status].filter(Boolean).join(" · ");
}

export function certMeta(cert: Certification): string {
  const meta = [cert.issuer, cert.date].filter(Boolean).join(" · ").toUpperCase();
  return cert.link ? `${meta} ↗` : meta;
}

/** Only http(s) URLs and same-site absolute paths are allowed as hrefs. */
export function isSafeHref(value: string): boolean {
  if (!value) return false;
  if (value.startsWith("/")) return !value.startsWith("//") && !value.includes("\\");
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export const isExternalHref = (href: string) => /^https?:\/\//i.test(href);

export function slugify(title: string): string {
  const slug = title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
  return slug || "project";
}

export function uniqueSlug(base: string, projects: Pick<Project, "slug">[]): string {
  const taken = new Set(projects.map((p) => p.slug));
  let slug = base;
  for (let n = 2; taken.has(slug); n++) slug = `${base}-${n}`;
  return slug;
}
