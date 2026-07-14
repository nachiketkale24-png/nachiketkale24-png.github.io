# Nachiket Kale — Portfolio

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion,
GSAP + ScrollTrigger, and Lenis for smooth scroll.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

Deploys cleanly to Vercel — just connect the repo, no config needed.

## Project structure

```
app/
  layout.tsx        → fonts, SEO metadata, JSON-LD
  page.tsx           → home page, composes all sections
  globals.css         → design tokens, base styles, reduced-motion handling
  sitemap.ts / robots.ts
  work/[slug]/page.tsx → dynamic case study pages (one per project)
  icon.svg             → favicon

components/
  Nav.tsx              → fixed header, mobile menu
  SmoothScroll.tsx      → Lenis + GSAP ScrollTrigger wiring
  sections/             → one file per homepage section (Hero, SignalStrip,
                           SelectedWork, TechnicalDepth, Timeline, About, Contact)
  ui/                    → reusable primitives (Reveal, MagneticButton, AnimatedNumber)
  case-studies/
    ArchitectureDiagram.tsx → the signature scroll-animated system diagram
    ScreenshotsShowcase.tsx → interactive slideshow carousel with modal lightbox zoom
    UsageSimulator.tsx      → conversational dialogue assistant simulator

lib/
  data.ts    → single source of truth for all content (projects, stats, timeline)
  utils.ts    → small helpers
```

## Editing content

Everything text-based (projects, stats, timeline entries, bio, links) lives in
`lib/data.ts`. Adding a fourth project only requires adding an entry to the
`projects` array — the homepage list and the `/work/[slug]` page both read
from it automatically.

## Before deploying

1. Replace `https://nachiketkale.dev` in `app/layout.tsx`, `app/sitemap.ts`,
   and `app/robots.ts` with your real domain.
2. Add a real `public/og-image.png` (1200×630) for social share previews —
   currently referenced but not included.
3. Update `github`/`linkedin`/`email` in `lib/data.ts` if anything changes.

## Design tokens

Defined in `tailwind.config.ts`:
- Background: `#0A0E14` (near-black navy), elevated panels at `#10151D` / `#141A23`
- Text: `#E4E7EB` primary, `#8B95A5` muted, `#4B5563` faint
- Accent: `#FF6B35` (signal amber), `#3ECF8E` (success green, used sparingly)
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (data/labels)

## Accessibility & performance notes

- All animation respects `prefers-reduced-motion` (Lenis, GSAP ScrollTrigger,
  and CSS keyframes all check/disable).
- Visible focus rings on every interactive element.
- Case study pages are statically generated (`generateStaticParams`) for fast
  loads and full SEO indexing.
- Fonts loaded via `next/font` (self-hosted, no external requests, no layout shift).
