import { SignJWT, jwtVerify } from "jose";

// Edge/Node-agnostic session helpers — used by both proxy.ts and server code.

const isProd = process.env.NODE_ENV === "production";

/** `__Host-` pins the cookie to this exact origin over HTTPS (no Domain, Path=/). */
export const SESSION_COOKIE = isProd ? "__Host-katib-admin" : "katib-admin";
export const SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours
export const LANG_COOKIE = "katib-portfolio-lang";

const ISSUER = "katib.me";
const AUDIENCE = "katib-admin";

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey(), {
      algorithms: ["HS256"],
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}
