export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];

export const STATUSES = ["SHIPPED", "IN PROGRESS", "TEAM", "ARCHIVE"] as const;
export type Status = (typeof STATUSES)[number];

/** Card colour order is fixed: a seventh project takes the next palette colour. */
export const COLORS = ["lilac", "yellow", "mint", "coral", "periwinkle", "sand"] as const;
export type CardColor = (typeof COLORS)[number];

export type Bilingual = { en: string; fr: string };

/** Problem, Data, Approach, Result — always four blocks. */
export type CaseBlocks = [string, string, string, string];

export type Project = {
  slug: string;
  title: string;
  tag: string;
  status: Status;
  desc: Bilingual;
  /** Comma separated, rendered uppercase with " · " separators. */
  stack: string;
  badge: string;
  link: string;
  color: CardColor;
  blocks: { en: CaseBlocks; fr: CaseBlocks };
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link: string;
};

export type SiteSettings = {
  /** The "Currently" line — the field updated most often. */
  now: Bilingual;
};

export type SiteContent = {
  projects: Project[];
  certs: Certification[];
  settings: SiteSettings;
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
