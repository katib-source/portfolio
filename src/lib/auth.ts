import "server-only";
import { scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_MAX_AGE, signSessionToken, verifySessionToken } from "@/lib/session";

/** Checks the admin session cookie. Call it in every admin page and server action. */
export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return verifySessionToken(jar.get(SESSION_COOKIE)?.value);
}

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
} as const;

export async function startSession(): Promise<void> {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, await signSessionToken(), { ...cookieOptions, maxAge: SESSION_MAX_AGE });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  // A `__Host-` cookie is only overwritten by a Set-Cookie carrying the same Secure/Path attributes.
  jar.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD_HASH && (process.env.SESSION_SECRET?.length ?? 0) >= 32);
}

/**
 * Verifies against ADMIN_PASSWORD_HASH, produced by `npm run hash-password`:
 * `scrypt:N:r:p:<salt base64url>:<hash base64url>`.
 */
export async function verifyPassword(password: string): Promise<boolean> {
  const stored = process.env.ADMIN_PASSWORD_HASH;
  if (!stored) return false;

  const parts = stored.split(":");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [N, r, p] = parts.slice(1, 4).map(Number);
  if (![N, r, p].every(Number.isInteger) || N < 16384 || N > 1048576 || r < 1 || r > 32 || p < 1 || p > 16) {
    return false;
  }
  const salt = Buffer.from(parts[4], "base64url");
  const expected = Buffer.from(parts[5], "base64url");
  if (salt.length < 16 || expected.length < 32) return false;

  const derived = await new Promise<Buffer>((resolve, reject) =>
    scrypt(password.normalize("NFKC"), salt, expected.length, { N, r, p, maxmem: 256 * N * r }, (err, key) =>
      err ? reject(err) : resolve(key),
    ),
  );
  return timingSafeEqual(derived, expected);
}
