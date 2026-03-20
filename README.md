# Personal Portfolio

Personal portfolio website built with **Next.js App Router** to present my projects and experience in **Computer Science, AI, and Data Science**.

The site showcases applied machine learning work, software engineering projects, and selected academic and professional experiences, with a focus on clean architecture and real-world impact.

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

---

## Featured Projects

- Hotel booking fraud and cancellation detection (CatBoost, AUC-ROC ≈ 0.95)
- Reflexa mobile app (React Native, AI-driven text analysis)
- AzurEscape booking platform with data and recommendation features
- 2D Mario game engine (custom platformer engine)
- Web development internship projects

---

## Design System Additions

- `src/components/portfolio/SectionHeading.tsx`
  - Reusable animated section heading used across portfolio sections
  - Supports accent label + left/center alignment

- `src/components/portfolio/SectionShell.tsx`
  - Reusable section wrapper for spacing, grid overlays, and tonal section backgrounds

- `src/components/portfolio/GlassCard.tsx`
  - Reusable glassmorphism surface with optional interactive and inner-glow variants

- `src/components/portfolio/MetricBadge.tsx`
  - Reusable metric/value chip used in hero, projects, and modal contexts

- `src/components/portfolio/Certifications.tsx`
  - Reusable certifications section with typed `CertificationItem` data model
  - Includes responsive glassmorphism cards and animated certificate lightbox
  - Add future certificates by appending new objects to the `items` prop

- `src/components/portfolio/ExperienceSection.tsx`
  - Vertical timeline section with reusable card patterns and recruiter-oriented scan structure

- `src/app/globals.css` certification tokens
  - Semantic design tokens (`--portfolio-*` and `--certifications-*`) for glass surfaces, borders, glow levels, timeline accents, overlays, and motion-safe interaction states
  - Dark/light tuned values with shared interaction classes for consistency and reuse
