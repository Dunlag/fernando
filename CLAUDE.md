# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with **React 18 + Vite**, deployed via GitHub Actions to GitHub Pages at `https://dunlag.github.io/fernando`. It's a single-page, bilingual (ES/EN) site showcasing web development and UI/UX projects, styled after a bold "Mammoth Style" editorial look (yellow/black, thick borders, condensed display type).

### Key Technologies

- **Framework**: React 18, bootstrapped with Vite 5
- **Styling**: Plain CSS (no Tailwind/CSS-in-JS), CSS custom properties for design tokens
- **Animation**: GSAP (hero entrance, custom cursor, preloader, menu text splits), IntersectionObserver for scroll reveals
- **i18n**: Hand-rolled — no library. All copy lives in one JS object keyed by language
- **Hosting**: GitHub Pages via `.github/workflows/deploy.yml` (`npm ci && npm run build`, deploys `dist/`)
- **Fonts**: Google Fonts (Bebas Neue for display, Barlow / Barlow Condensed for body and labels)

## Project Structure

```
root/
  index.html              # Vite entry HTML, loads fonts, sets base title/meta
  vite.config.js          # base: '/fernando/', @vitejs/plugin-react
  src/
    main.jsx              # imports all CSS, mounts <App/>, calls boot() from lib/enhance
    App.jsx               # top-level layout: renders all sections in order, wires
                           #   language state, accent color, tilt/reveal/lab-iframe effects
    data/index.js          # single source of truth for all content:
                           #   PROJECTS_COMMON (project metadata), PROJECT_COPY (es/en
                           #   title+desc per project id), DATA.es / DATA.en (all other copy),
                           #   SERVICES, ACCENTS
    components/            # one file per section (Navbar, Hero, Featured, Marquee, Work,
                           #   Labs, Services, Stack, About, Cta, Footer) + Rich.jsx (renders
                           #   the small inline-markup arrays used in copy, e.g. line breaks/em)
    hooks/                  # useLang (persisted language state), useFitText, useScrollHide
    lib/
      enhance.js            # boot(): preloader, custom cursor, scroll progress bar, hero
                           #   entrance animation (GSAP). Exposes window.Enhance.refresh()
      menu-anim.js          # SplitText-style nav/footer link animations (window.MenuAnims)
    styles/
      portfolio.css         # main stylesheet — design tokens (:root) + all section styles
      menu-anim.css, enhance.css, stack.css, work-shots.css  # feature-scoped stylesheets
  public/
    assets/                # favicon, og-cover, two-black-cats.png — referenced directly
    projects/marathon-concept/  # a standalone demo embedded/linked as one project's target
  docs/                    # planning docs for the Jekyll→React migration (historical)
```

There is no `_layouts/`, `_projects/`, Liquid templating, or Jekyll config in this repo — those were removed as part of the React migration cleanup. Don't recreate that structure.

## Common Development Commands

```bash
npm install          # first time only
npm run dev           # Vite dev server → http://localhost:5173/fernando/
npm run build         # production build → ./dist/
npm run preview       # serve the built dist/ locally
```

## Content Model: Projects

Projects shown in the "Proyectos"/Work grid are **not** individual files — they're data entries in `src/data/index.js`:

1. Add an entry to `PROJECTS_COMMON` (array): `{ id, ref, year, url, tags: [...] }`. Use the next two-digit `ref`. Set `url: null, comingSoon: true` for WIP projects instead of a link.
2. Add a matching `id` key to **both** `PROJECT_COPY.es` and `PROJECT_COPY.en` with `{ title, desc }`. Missing either language will render blank/crash that card.
3. No image asset is required — `src/components/Work.jsx` auto-generates placeholder screenshots from the project `id` via `picsum.photos/seed/fpw-{id}-{n}/800/600` until real screenshots are wired in.

To add a Labs/experiment entry, use `EXP_COMMON` the same way (simpler shape: `id`, `badge`, `stack`, `url`).

## Design System: "Mammoth Style"

Bold, single-theme (no light/dark toggle) editorial look. Tokens live in `:root` at the top of `src/styles/portfolio.css`:

- `--c-yellow` (base canvas — randomized per page load from `ACCENTS` in `data/index.js`, persisted in `localStorage` to avoid repeats), `--c-black`, `--c-cream`, `--c-blue`, `--c-red`
- `--font-display` (Bebas Neue — big condensed headlines, ALL CAPS), `--font-condensed` (Barlow Condensed — eyebrows/labels/tags), `--font-body` (Barlow)
- `--border` / `--border-thick` — solid 2px/4px black borders used everywhere instead of soft shadows
- `--space-section-v` / `--space-section-h` — shared section padding scale (`clamp(...)`)
- `--ease-snap` — the standard motion easing curve

Component classes follow a `.block__element` convention per section (e.g. `.hero__title`, `.hero__card`, `.featured__frame`, `.work-grid`) — grep `portfolio.css` for the block name before inventing a new class.

### Responsive

- Mobile-first. Key breakpoints in `portfolio.css`: 1024px, 768px, 480px (search `@media` blocks — they're grouped near the bottom under `/* ── RESPONSIVE ── */`)
- `prefers-reduced-motion` disables transform-heavy hover/entrance animations

## Notes for Future Work

- **No CMS, no markdown content files** — everything textual is in `src/data/index.js`. When editing copy, update both `es` and `en` blocks together.
- **Relative asset paths**: `vite.config.js` sets `base: '/fernando/'`; reference `public/` assets as `/fernando/assets/...` (see `Featured.jsx` for an example) so they resolve correctly both in dev and on GitHub Pages.
- **Testing**: run `npm run dev`, open `http://localhost:5173/fernando/`, and manually check both languages (language toggle in the navbar) plus mobile width, since there's no automated test suite.
- **Deployment**: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` — no manual gh-pages branch management needed.
