import "server-only";
import { unstable_cache } from "next/cache";
import type { z } from "zod";
import { SEED } from "@/content/seed";
import { getRedis } from "@/lib/redis";
import { certsSchema, projectsSchema, settingsSchema } from "@/lib/schema";
import type { Certification, Project, SiteContent, SiteSettings } from "@/lib/types";

export const CONTENT_TAG = "site-content";

const KEYS = {
  projects: "katib:projects:v1",
  certs: "katib:certs:v1",
  settings: "katib:settings:v1",
} as const;

function parseOr<T>(schema: z.ZodType, value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    console.error("stored content failed validation, using built-in content", parsed.error.issues[0]);
    return fallback;
  }
  return parsed.data as T;
}

/** Reads straight from Redis, falling back to the built-in seed per section. */
export async function readContent(): Promise<SiteContent> {
  const redis = getRedis();
  if (!redis) return SEED;
  try {
    const [projects, certs, settings] = await redis.mget<[unknown, unknown, unknown]>(
      KEYS.projects,
      KEYS.certs,
      KEYS.settings,
    );
    return {
      projects: parseOr<Project[]>(projectsSchema, projects, SEED.projects),
      certs: parseOr<Certification[]>(certsSchema, certs, SEED.certs),
      settings: parseOr<SiteSettings>(settingsSchema, settings, SEED.settings),
    };
  } catch (err) {
    console.error("could not read content from Redis", err);
    return SEED;
  }
}

/** Cached read for the public pages; admin saves invalidate CONTENT_TAG. */
export const getContent = unstable_cache(readContent, ["site-content-v1"], {
  tags: [CONTENT_TAG],
  revalidate: 300,
});

export const isStorageConfigured = () => getRedis() !== null;

function redisOrThrow() {
  const redis = getRedis();
  if (!redis) throw new Error("Redis is not configured");
  return redis;
}

export async function writeProjects(projects: Project[]) {
  await redisOrThrow().set(KEYS.projects, projects);
}

export async function writeCerts(certs: Certification[]) {
  await redisOrThrow().set(KEYS.certs, certs);
}

export async function writeSettings(settings: SiteSettings) {
  await redisOrThrow().set(KEYS.settings, settings);
}
