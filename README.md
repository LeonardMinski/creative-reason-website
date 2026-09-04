# Creative Reason — Studio Website

Independent UX, design and technology studio site for Creative Reason
(London). Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind
CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev         # local dev server
npm run build        # production build
npm run start         # serve the production build
npm run lint          # ESLint
npm run typecheck     # tsc --noEmit
npm run test:e2e       # Playwright end-to-end suite (builds + serves on :3100 automatically)
```

## Structure

- `src/app/` — routes (App Router): home, `/work`, `/work/[slug]`, `/products`,
  `/consultancy`, `/studio`, `/lab`, `/contact`, plus `robots.ts`/`sitemap.ts`
  and the generated `icon.png`/`apple-icon.png`.
- `src/components/` — shared primitives (`Section`, `SectionMeta`,
  `SpectrumRule`, `Reveal`, `CreativeReasonMark`, `PlaceholderMedia`,
  `ProjectCatalogue`) and `home/*` (homepage sections) / `lab/*`.
- `src/lib/` — typed content: `site-config.ts` (nav, contact), `projects.ts`
  (selected work / product catalogue, sourced from the real project repos —
  see below), `consultancy.ts`, `lab.ts`, plus `motion.ts` (timing tokens) and
  `cn.ts`.
- `public/brand/` — the real Creative Reason logo, cropped from
  `Desktop/Creative Reason/LOGOS/Creative-Reason-Logo.png` (see
  `src/components/creative-reason-mark.tsx` for how the crops were made).
- `public/work/crate/` — real Crate product screenshots, copied from the
  `crate` repo's `docs/assets/screenshots/`.
- `public/work/shiftflow/`, `public/work/station-ten/` — one real product
  screenshot each, provided directly and cropped to remove browser/OS chrome.
- `tests/e2e/` — Playwright specs (navigation, mobile nav, selected work,
  routing, reduced motion, console hygiene).

## Content sources

CRATE's copy, workflow terminology (Home → Triage → Chop → Loop → Export;
Keep/Maybe/Trash) and screenshots are sourced from the real `crate` product
repository, not from generic marketing copy — see the comment at the top of
`src/lib/projects.ts`. ShiftFlow and Station Ten descriptions are similarly
grounded in their own repos' READMEs, and each now has one real product
screenshot; neither has a full case-study narrative yet, so their case study
pages intentionally show only what's genuine.

## Known content/asset gaps

- `Launch product` on the Crate section is intentionally disabled — no
  confirmed public production URL for Crate exists to link to.
- ShiftFlow and Station Ten have no full written case-study narrative yet
  (Crate does) — their `/work/[slug]` pages intentionally show only the real
  screenshot, tagline and tags rather than an invented process writeup.
- The Lab section was removed at the site owner's direction — it represented
  experiments that were never actually built.
