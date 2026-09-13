import { z } from "zod";
import { isSafeHref } from "@/lib/format";
import { COLORS, STATUSES } from "@/lib/types";

// Every write from the admin is parsed with these; every read from Redis too.

const text = (max: number) => z.string().trim().max(max, `keep it under ${max} characters`);

const href = z
  .string()
  .trim()
  .max(500, "that link is too long")
  .refine((v) => v === "" || isSafeHref(v), "links must start with https://, http:// or /");

const bilingual = (max: number) => z.object({ en: text(max), fr: text(max) });
const blocks = z.tuple([text(900), text(900), text(900), text(900)]);

export const projectSchema = z.object({
  slug: z
    .string()
    .max(80)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "invalid project slug"),
  title: text(80).min(1, "a project needs a name"),
  tag: text(24),
  status: z.enum(STATUSES),
  desc: bilingual(420),
  stack: text(200),
  badge: text(24),
  link: href,
  color: z.enum(COLORS),
  blocks: z.object({ en: blocks, fr: blocks }),
});

export const projectsSchema = z
  .array(projectSchema)
  .max(40, "that's a lot of projects — 40 max")
  .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, "two projects share a slug");

export const certSchema = z.object({
  name: text(140).min(1, "a certification needs a name"),
  issuer: text(80),
  date: text(40),
  link: href,
});

export const certsSchema = z.array(certSchema).max(40, "40 certifications max");

export const settingsSchema = z.object({ now: bilingual(320) });

export function firstIssue(error: z.ZodError): string {
  return error.issues[0]?.message ?? "invalid data";
}
