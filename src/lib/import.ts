import { slugify, uniqueSlug } from "@/lib/format";
import { projectSchema } from "@/lib/schema";
import { COLORS, STATUSES, type CardColor, type CaseBlocks, type Project, type Status } from "@/lib/types";

// Turns pasted or uploaded JSON into projects for the admin. Accepts the admin's own
// projects.json export, and a friendlier hand-written shape:
// { name, category, status, description, descriptionFr, stack, badge, link, cardColour,
//   caseStudy: { problemEn, problemFr, dataEn, dataFr, approachEn, approachFr, resultEn, resultFr } }

export type ImportedProject = {
  project: Project;
  /** False when the JSON named no colour and one was taken from the palette order. */
  hasColor: boolean;
  notes: string[];
};

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

const str = (v: unknown): string => (typeof v === "string" ? v.trim() : typeof v === "number" ? String(v) : "");

function pick(src: Obj, ...keys: string[]): string {
  for (const key of keys) {
    const value = str(src[key]);
    if (value) return value;
  }
  return "";
}

/** The card colours from base.css, used to snap hex codes to the palette. */
const PALETTE: Record<CardColor, [number, number, number]> = {
  lilac: [0xc9, 0xb7, 0xf0],
  yellow: [0xff, 0xd8, 0x4d],
  mint: [0xbf, 0xd8, 0xc9],
  coral: [0xf7, 0xc9, 0xbd],
  periwinkle: [0xd6, 0xdb, 0xf7],
  sand: [0xe6, 0xe0, 0xcd],
};

const COLOR_ALIASES: Record<string, CardColor> = { "soft coral": "coral", "soft-coral": "coral", peri: "periwinkle" };

const STATUS_ALIASES: Record<string, Status> = {
  WIP: "IN PROGRESS",
  ONGOING: "IN PROGRESS",
  "IN DEVELOPMENT": "IN PROGRESS",
  LIVE: "SHIPPED",
  DONE: "SHIPPED",
  COMPLETED: "SHIPPED",
  FINISHED: "SHIPPED",
  ARCHIVED: "ARCHIVE",
  "TEAM PROJECT": "TEAM",
};

const FIELD_LABELS: Record<string, string> = {
  title: "name",
  tag: "category",
  desc: "description",
  blocks: "case study",
  color: "colour",
};

function toStatus(value: string): Status {
  if (!value) return "SHIPPED";
  const v = value.toUpperCase().replace(/[_-]+/g, " ").replace(/\s+/g, " ");
  if ((STATUSES as readonly string[]).includes(v)) return v as Status;
  const alias = STATUS_ALIASES[v];
  if (!alias) throw new Error(`status “${value}” should be one of ${STATUSES.join(", ")}`);
  return alias;
}

function nearestColor(hex: string): CardColor {
  let h = hex.replace("#", "");
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  let best: CardColor = COLORS[0];
  let bestDistance = Infinity;
  for (const color of COLORS) {
    const distance = PALETTE[color].reduce((sum, c, i) => sum + (c - rgb[i]) ** 2, 0);
    if (distance < bestDistance) {
      best = color;
      bestDistance = distance;
    }
  }
  return best;
}

function toColor(value: string, notes: string[]): CardColor | null {
  if (!value) return null;
  const name = value.toLowerCase();
  if ((COLORS as readonly string[]).includes(name)) return name as CardColor;
  if (COLOR_ALIASES[name]) return COLOR_ALIASES[name];
  if (/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(value)) {
    const color = nearestColor(value);
    notes.push(`colour ${value} → ${color}, the closest card colour`);
    return color;
  }
  throw new Error(`colour “${value}” should be one of ${COLORS.join(", ")} or a hex code`);
}

const toStack = (value: unknown) =>
  Array.isArray(value) ? value.map(str).filter(Boolean).join(", ") : str(value);

function toDesc(raw: Obj): Project["desc"] {
  const nested = isObj(raw.desc) ? raw.desc : isObj(raw.description) ? raw.description : null;
  if (nested) return { en: str(nested.en), fr: str(nested.fr) };
  return {
    en: pick(raw, "descriptionEn", "description_en", "description", "descEn", "desc"),
    fr: pick(raw, "descriptionFr", "description_fr", "descFr", "desc_fr"),
  };
}

const BLOCK_KEYS = ["problem", "data", "approach", "result"] as const;

function toBlockList(value: unknown): CaseBlocks {
  const list = Array.isArray(value) ? value.map(str) : isObj(value) ? BLOCK_KEYS.map((k) => str(value[k])) : [];
  return [list[0] ?? "", list[1] ?? "", list[2] ?? "", list[3] ?? ""];
}

function toBlocks(raw: Obj): Project["blocks"] {
  const nested = [raw.blocks, raw.caseStudy, raw.case_study].find(isObj);
  // { en: [4] | {problem…}, fr: … } — the export shape
  if (nested && (nested.en !== undefined || nested.fr !== undefined)) {
    return { en: toBlockList(nested.en), fr: toBlockList(nested.fr) };
  }
  // { problemEn, problemFr, … } — flat, inside caseStudy or at the top level
  const src = nested ?? raw;
  const lang = (suffix: "En" | "Fr") =>
    BLOCK_KEYS.map((k) =>
      pick(src, `${k}${suffix}`, `${k}_${suffix.toLowerCase()}`, ...(suffix === "En" ? [k] : [])),
    ) as CaseBlocks;
  return { en: lang("En"), fr: lang("Fr") };
}

function toProject(raw: unknown, position: number, fallbackColor: CardColor): ImportedProject {
  if (!isObj(raw)) throw new Error(`project ${position + 1} isn't an object`);
  const title = pick(raw, "title", "name");
  const notes: string[] = [];
  try {
    const color = toColor(pick(raw, "color", "colour", "cardColor", "cardColour"), notes);
    const slug = str(raw.slug);
    const project: Project = {
      slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ? slug : slugify(title),
      title,
      tag: pick(raw, "tag", "category"),
      status: toStatus(pick(raw, "status")),
      desc: toDesc(raw),
      stack: toStack(raw.stack),
      badge: pick(raw, "badge"),
      link: pick(raw, "link", "url", "href"),
      color: color ?? fallbackColor,
      blocks: toBlocks(raw),
    };
    const parsed = projectSchema.safeParse(project);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      const key = String(issue.path[0] ?? "");
      throw new Error(key ? `${FIELD_LABELS[key] ?? key}: ${issue.message}` : issue.message);
    }
    return { project, hasColor: color !== null, notes };
  } catch (err) {
    throw new Error(`${title ? `“${title}”` : `project ${position + 1}`} — ${(err as Error).message}`);
  }
}

/** Accepts one project, an array of projects, or `{ "projects": [...] }`. Throws a readable message. */
export function readProjects(text: string, existingCount: number): ImportedProject[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("that isn't valid JSON — look for a missing comma, quote or bracket");
  }
  const list = Array.isArray(data) ? data : isObj(data) && Array.isArray(data.projects) ? data.projects : [data];
  if (list.length === 0) throw new Error("there are no projects in that JSON");
  return list.map((raw, i) => toProject(raw, i, COLORS[(existingCount + i) % COLORS.length]));
}

/** Index of the existing project with the same slug or name, or -1. */
export function findProject(projects: Project[], project: Project): number {
  const title = project.title.toLowerCase();
  return projects.findIndex((p) => p.slug === project.slug || p.title.toLowerCase() === title);
}

/** Matching projects are updated in place (keeping their URL); new ones go on top, like the form. */
export function mergeProjects(existing: Project[], incoming: ImportedProject[]) {
  const list = existing.slice();
  const fresh: Project[] = [];
  let updated = 0;
  for (const { project, hasColor } of incoming) {
    const i = findProject(list, project);
    if (i >= 0) {
      list[i] = { ...project, slug: list[i].slug, color: hasColor ? project.color : list[i].color };
      updated++;
    } else {
      fresh.push({ ...project, slug: uniqueSlug(project.slug, [...list, ...fresh]) });
    }
  }
  return { list: [...fresh, ...list], added: fresh.length, updated };
}
