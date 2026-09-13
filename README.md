# katib.me

Personal portfolio of Katib Kachi — Data Science & AI. The project list, certifications and "Currently" line are data-driven and editable from a private admin page.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Plain CSS with design tokens (`src/styles`), fonts self-hosted through `next/font`
- Upstash Redis for content, `jose` for sessions, `zod` for validation

## Routes

| Path | What |
| --- | --- |
| `/` | Redirects to `/en` or `/fr` (saved choice, then `Accept-Language`) |
| `/en`, `/fr` | Portfolio home |
| `/en/projects/<slug>` | Project case study |
| `/admin` | Project admin (password protected) |

## Development

```bash
npm install
cp .env.example .env.local
npm run hash-password    # paste the two lines it prints into .env.local
npm run dev
```

Without Redis credentials the site renders the built-in content from `src/content/seed.ts`, and the admin opens but cannot save.

## Content

- Seed content and the full EN/FR case-study copy live in `src/content/seed.ts`.
- UI copy for both languages lives in `src/content/dictionary.ts`.
- Once the admin saves a section, Redis becomes the source of truth for that section (`katib:projects:v1`, `katib:certs:v1`, `katib:settings:v1`). Deleting a key falls back to the seed.

## Security

- **CSP** with a per-request nonce and `strict-dynamic` (`src/proxy.ts`); no inline styles or scripts, no third-party origins.
- **Headers**: HSTS (preload), `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`, strict referrer policy, restrictive `Permissions-Policy`, COOP; `/admin` is `noindex` and `no-store`.
- **Admin auth**: one password stored only as an scrypt hash (`ADMIN_PASSWORD_HASH`); constant-time comparison; an HS256-signed, 8-hour session in an `HttpOnly`, `Secure`, `SameSite=Strict`, `__Host-` cookie.
- **Brute force**: login is rate-limited to 5 attempts per IP per 15 minutes and 60 overall per hour (Upstash Ratelimit, fails closed).
- **Defence in depth**: the proxy gates `/admin`, and every admin page and server action re-checks the session. Server actions only accept POSTs whose Origin matches the Host.
- **Validation**: every write and every read from Redis is parsed with zod (length caps, enum fields, unique slugs). Links must be `https://`, `http://` or a same-site `/path`, so `javascript:` URLs can't reach the page.
- Secrets never reach the client bundle; Redis access is `server-only`.

## Deploying (Vercel)

1. Import the repo in Vercel (framework preset: Next.js).
2. **Storage → Marketplace → Upstash (Redis)** → create a free database and connect it to the project. This adds `KV_REST_API_URL` / `KV_REST_API_TOKEN`.
3. Add `ADMIN_PASSWORD_HASH`, `SESSION_SECRET` and `NEXT_PUBLIC_SITE_URL` in **Settings → Environment Variables**.
4. Deploy. Sign in at `/admin`.

Rotate `SESSION_SECRET` to sign out every session; re-run `npm run hash-password` to change the password.
