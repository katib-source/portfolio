# AGENTS.md

Operational guide for coding agents working in this repository.

## 1) Scope and Product Context

- This repo is the public portfolio for `katib-kachi.vercel.app` (Next.js App Router).
- Primary audience: internship and alternance recruiters, hiring managers, technical interviewers.
- Core objective: communicate credibility fast (projects, resume, contact, certificates).
- Use only portfolio-facing code paths.
- Ignore auth/admin/Prisma concerns unless a task explicitly requests them.
- At the time of writing, no `auth`, `admin`, or `prisma` app areas are present in `src/`.

## 2) Source of Truth

- Read `CLAUDE.md` first for design and UX priorities.
- Key design requirements from `CLAUDE.md`:
  - professional editorial aesthetic aligned with CV visual identity
  - warm ivory surfaces with monochromatic navy accent only
  - clean, subtle card system with warm-toned borders and rounded corners
  - restrained, purposeful motion only
  - certificates treated as credibility assets, not decoration
- Treat this file as implementation guidance for agents.

## 3) Repository Layout (Relevant Paths)

- `src/app/` - Next.js app router entry points, `globals.css`, page layout.
- `src/components/portfolio/` - portfolio sections and composition-level components.
- `src/components/ui/` - shared shadcn/ui primitives.
- `src/lib/utils.ts` - utility helpers (`cn`).
- `public/` - static assets (logos, resume, certificates, project media).

## 4) Package Manager and Runtime

- Use `npm` for commands in this environment.
- Node runtime is expected for local/dev/build tasks.
- Do not assume Bun is installed.

## 5) Build / Lint / Test Commands

### Install

- `npm install`

### Development

- `npm run dev` - run local dev server.

### Production Build

- `npm run build` - create optimized production build.
- `npm run start` - serve production build locally.

### Lint

- `npm run lint` - runs ESLint across repository (`eslint .`).
- If needed for direct invocation: `npx eslint .`.

### Tests (Current State)

- There is currently no test runner configured in `package.json`.
- There are currently no test files in the repository.
- Therefore:
  - `npm run test` is **not available**.
  - single-test execution is **not available yet**.

### Single Test Guidance (When Test Runner Is Added)

- If a future task adds Vitest, run one test file with:
  - `npx vitest run path/to/file.test.ts`
- If a future task adds Jest, run one test file with:
  - `npx jest path/to/file.test.ts`
- Do not add a test framework unless the task requests it.

## 6) TypeScript and React Conventions

- TypeScript is enabled with `strict: true` (`tsconfig.json`).
- Use explicit prop types for reusable components.
- Prefer `type` aliases for props/data shapes in component modules.
- Avoid `any`; if unavoidable, isolate and document why in code comments.
- Prefer functional React components.
- Use `'use client'` only for components requiring client APIs/hooks.
- Default export only for route files (`page.tsx`, `layout.tsx`) unless justified.
- Prefer named exports for reusable components.

## 7) Imports and Module Boundaries

- Use path alias `@/*` (configured in `tsconfig.json`).
- Import order guideline:
  1. React and framework imports
  2. third-party packages
  3. internal `@/` imports
  4. relative imports
- Keep imports grouped and stable; remove unused imports.
- Avoid deep cross-feature coupling when adding new UI sections.

## 8) Naming Conventions

- Components: `PascalCase` (`Certifications.tsx`, `SectionHeading.tsx`).
- Hooks: `camelCase` starting with `use`.
- Variables/functions: `camelCase`.
- Constants: `camelCase` for local arrays/objects unless true global constant.
- IDs used for navigation should be kebab-case (`#certifications`, `#projects`).

## 9) Styling and Design System Rules

- Tailwind CSS is the primary styling layer.
- Reuse shared UI primitives from `src/components/ui/` when possible.
- Prefer semantic CSS variables/tokens over repeated hard-coded values.
- Put cross-section visual tokens in `src/app/globals.css`.
- Design language: professional editorial.
- Use warm ivory surfaces only:
  - page: `#F0EBDF`
  - cards: `#F6F2E8`
  - elevated: `#FDFCF8`
- Use monochromatic navy accents only:
  - primary: `#3E5F9D`
  - light: `#E8EDF5`
  - dark: `#2D4672`
- Navy is the only accent family; do not introduce secondary accents.
- Use subtle rounded corners (`rounded-lg`, ~8-12px) and warm borders (`#DDD8CC`).
- Maintain professional density with balanced whitespace.
- Critical: no cool grays anywhere; avoid Tailwind `zinc`, `slate`, and `gray` classes.
- Typography system:
  - hero/name: Playfair Display (serif), bold
  - section headers: Outfit (or DM Sans), semibold, navy
  - body: same sans, regular, `#1A1A2E`
  - metadata/dates: same sans, `#7A7A8A`
  - code/tech: JetBrains Mono, 12px
- Section headers:
  - prefix with `✦` in navy
  - title in uppercase or title case in navy
  - include subtle underline/bottom border
- Card styling:
  - background `#F6F2E8` (or `#FDFCF8` for elevated)
  - border `1px solid #DDD8CC`
  - `rounded-lg` radius
  - `shadow-sm` on hover only
  - no dark surfaces, no glassmorphism, no cool gray borders
- Motion constraints:
  - duration `0.3`
  - ease `[0.16, 1, 0.3, 1]`
  - stagger `0.05`
  - use fade-up entrances and subtle hover lifts; avoid aggressive scale transforms
- Icons:
  - use `lucide-react`
  - style with navy or muted token colors
  - no 1px framed icon containers; optional soft navy/cream circles only

## 10) Motion and Interaction Rules

- Framer Motion is used for interaction and entrance animations.
- Keep motion subtle and meaningful (state feedback and hierarchy only).
- Prefer smooth deceleration curves (e.g., `[0.22, 1, 0.36, 1]`).
- Respect `prefers-reduced-motion` for non-essential animation.
- Do not add decorative animation that distracts from content credibility.

## 11) Accessibility and Resilience

- Maintain WCAG AA contrast minimum.
- Ensure keyboard accessibility for dialogs, buttons, and nav.
- Provide meaningful alt text for certificate/project images.
- Use `sr-only` text for icon-only controls.
- Handle long text gracefully (truncate or wrap intentionally).
- Verify mobile layouts and touch target comfort.

## 12) Error Handling and Data Safety

- Prefer safe defaults and graceful fallback UI states.
- In event handlers with async work, use `try/catch` when failure is possible.
- Never commit secrets or `.env` values.
- Avoid destructive git operations unless explicitly requested.

## 13) Agent Workflow Expectations

- Before editing, inspect existing patterns in nearby files.
- Extract repeated UI patterns into reusable components incrementally.
- Migrate existing usage sites after extraction where practical.
- Update documentation when adding reusable components/tokens.
- Validate with lint and production build before final handoff when possible.

## 14) Cursor / Copilot Rules Check

- Checked for `.cursor/rules/`: not present.
- Checked for `.cursorrules`: not present.
- Checked for `.github/copilot-instructions.md`: not present.
- No additional Cursor/Copilot instruction files are currently defined.

## 15) Pre-PR / Pre-Commit Checklist

- Run `npm run lint`.
- Run `npm run build`.
- Verify changed sections preserve the warm ivory + navy identity.
- Verify mobile and desktop layouts.
- Confirm nav anchors still scroll to correct sections.
- Confirm added assets exist under `public/` and paths resolve.
- Keep changes focused; avoid unrelated refactors.
