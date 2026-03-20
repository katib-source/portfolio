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
  - dark-first premium aesthetic inspired by Vercel/Linear
  - strong hierarchy and recruiter scanability
  - restrained, purposeful motion only
  - WCAG AA contrast in dark and light modes
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
- Primary accent color is electric-green `#00FF9F` (`--portfolio-accent`).
- Keep dark mode and light mode both polished; dark mode is primary direction.
- Keep spacing and typography deliberate and consistent.
- Avoid generic template-looking patterns.
- Maintain visual hierarchy optimized for recruiter scanability.

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
- Verify changed sections in both dark and light theme.
- Verify mobile and desktop layouts.
- Confirm nav anchors still scroll to correct sections.
- Confirm added assets exist under `public/` and paths resolve.
- Keep changes focused; avoid unrelated refactors.
