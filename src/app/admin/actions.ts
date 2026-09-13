"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { endSession, isAdmin, isAuthConfigured, startSession, verifyPassword } from "@/lib/auth";
import { CONTENT_TAG, isStorageConfigured, writeCerts, writeProjects, writeSettings } from "@/lib/content";
import { allowLoginAttempt } from "@/lib/ratelimit";
import { certsSchema, firstIssue, projectsSchema, settingsSchema } from "@/lib/schema";

export type SaveResult = { ok: true; savedAt: string } | { ok: false; error: string };
export type LoginState = { error: string };

const WRONG = "wrong password";

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || !password || password.length > 256) return { error: WRONG };
  if (!isAuthConfigured()) return { error: "sign-in isn't configured on this deployment" };

  const h = await headers();
  const ip = h.get("x-real-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!(await allowLoginAttempt(ip))) return { error: "too many attempts — try again in 15 minutes" };

  let valid = false;
  try {
    valid = await verifyPassword(password);
  } catch (err) {
    console.error("password verification failed", err);
  }
  if (!valid) return { error: WRONG };

  await startSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

async function save<S extends z.ZodType>(
  schema: S,
  input: unknown,
  write: (data: z.output<S>) => Promise<void>,
): Promise<SaveResult> {
  // Server actions are public endpoints: re-check the session on every call.
  if (!(await isAdmin())) return { ok: false, error: "session expired — reload and sign in again" };
  if (!isStorageConfigured()) return { ok: false, error: "storage isn't connected — add Upstash Redis in Vercel" };

  const parsed = schema.safeParse(input);
  if (!parsed.success) return { ok: false, error: firstIssue(parsed.error) };

  try {
    await write(parsed.data);
  } catch (err) {
    console.error("content write failed", err);
    return { ok: false, error: "couldn't reach storage — try again" };
  }
  updateTag(CONTENT_TAG);
  return { ok: true, savedAt: new Date().toISOString() };
}

export async function saveProjects(input: unknown): Promise<SaveResult> {
  return save(projectsSchema, input, writeProjects);
}

export async function saveCerts(input: unknown): Promise<SaveResult> {
  return save(certsSchema, input, writeCerts);
}

export async function saveSettings(input: unknown): Promise<SaveResult> {
  return save(settingsSchema, input, writeSettings);
}
