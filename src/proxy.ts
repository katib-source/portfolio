import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, SESSION_COOKIE, verifySessionToken } from "@/lib/session";

const isProd = process.env.NODE_ENV === "production";

function preferredLocale(req: NextRequest): "en" | "fr" {
  const saved = req.cookies.get(LANG_COOKIE)?.value;
  if (saved === "en" || saved === "fr") return saved;

  const ranked = (req.headers.get("accept-language") ?? "")
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.slice(0, 2).toLowerCase(), q: q ? Number.parseFloat(q) || 0 : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (lang === "en" || lang === "fr") return lang;
  return "en";
}

function contentSecurityPolicy(nonce: string): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isProd ? "" : " 'unsafe-eval'"}`,
    `style-src 'self' 'nonce-${nonce}'${isProd ? "" : " 'unsafe-inline'"}`,
    "img-src 'self' data: blob:",
    "font-src 'self'",
    `connect-src 'self'${isProd ? "" : " ws: wss:"}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isProd ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const section = pathname.split("/")[1] ?? "";
  const isLocale = section === "en" || section === "fr";

  // Every public URL lives under /en or /fr.
  if (!isLocale && section !== "admin") {
    const url = req.nextUrl.clone();
    url.pathname = `/${preferredLocale(req)}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  // Gate the admin pages. Server actions are POSTs and re-check the session
  // themselves, so they are left to answer with a proper error instead of a redirect.
  if (section === "admin" && (req.method === "GET" || req.method === "HEAD")) {
    const authed = await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value);
    const onLogin = pathname === "/admin/login";
    if (!authed && !onLogin) return NextResponse.redirect(new URL("/admin/login", req.url));
    if (authed && onLogin) return NextResponse.redirect(new URL("/admin", req.url));
  }

  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(18))));
  const csp = contentSecurityPolicy(nonce);

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const res = NextResponse.next({ request: { headers: requestHeaders } });
  res.headers.set("Content-Security-Policy", csp);

  if (isLocale && req.cookies.get(LANG_COOKIE)?.value !== section) {
    res.cookies.set(LANG_COOKIE, section, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
      secure: isProd,
      httpOnly: true,
    });
  }
  return res;
}

export const config = {
  // Skip Next internals and any path with a file extension (resume.pdf, certificates, robots.txt…).
  matcher: ["/((?!_next/|__nextjs|.*\\.[a-zA-Z0-9]+$).*)"],
};
