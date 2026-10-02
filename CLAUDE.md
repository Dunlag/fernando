# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with **React 18 + TypeScript + Vite**, deployed via GitHub Actions to GitHub Pages at `https://dunlag.github.io/fernando`. It's a single-page, bilingual (ES/EN) site showcasing web development and UI/UX projects, styled after a bold "Mammoth Style" editorial look (yellow/black, thick borders, condensed display type).

### Key Technologies

- **Framework**: React 18 + TypeScript (strict), bootstrapped with Vite 5
- **Quality**: ESLint (typescript-eslint, react-hooks), Prettier, Vitest + Testing Library; CI runs them on every pull request (`.github/workflows/ci.yml`)
- **Styling**: Plain CSS (no Tailwind/CSS-in-JS), CSS custom properties for design tokens
- **Animation**: GSAP (hero entrance, custom cursor, preloader, menu text splits), IntersectionObserver for scroll reveals
- **i18n**: Hand-rolled — no library. All copy lives in one typed object keyed by language
- **State**: Zustand store (`src/store.ts`) for the two pieces of shared state: active language (persisted) and whether the CV panel is open
- **Hosting**: GitHub Pages via `.github/workflows/deploy.yml` (`npm ci && npm run build`, deploys `dist/`)
- **Fonts**: Google Fonts (Bebas Neue for display, Barlow / Barlow Condensed for body and labels)

## Project Structure

```
root/
  index.html              # Vite entry HTML, loads fonts, sets base title/meta
  vite.config.ts          # base: '/fernando/', @vitejs/plugin-react, Vitest config
  tsconfig.json           # strict, noEmit (Vite transpiles; tsc only checks)
  .nvmrc                  # Node version used locally, in CI and in the deploy workflow
  src/
    main.tsx              # imports all CSS, mounts <App/>, calls boot() from lib/enhance
    App.tsx               # top-level layout: renders all sections in order, wires
                           #   accent color, tilt/reveal effects
    store.ts              # Zustand store: lang + setLang (persisted as fp_prefs), cvOpen +
                           #   openCv/closeCv. Exports useStore, useLang() and useT() (copy for
                           #   the active language). Also keeps <html lang> in sync
    data/index.ts          # single source of truth for all content and its types:
                           #   PROJECTS_COMMON (project metadata), PROJECT_COPY (es/en
                           #   title+desc per project id), DATA.es / DATA.en (all other copy),
                           #   SERVICES, ACCENTS, CONTACT (email/GitHub/LinkedIn), CV_URL.
                           #   Types: Lang, Copy (shape every language must fill), Project,
                           #   ProjectId, RichPart, Stat
    components/            # one file per section (Navbar, Hero, Featured, Marquee, Work,
                           #   Labs, Services, Stack, About, Cta, Footer) + Rich.tsx (renders
                           #   the small inline-markup arrays used in copy, e.g. line breaks/em)
    hooks/                  # useFitText, useScrollHide
    lib/
      enhance.ts            # boot(): preloader, custom cursor, scroll progress bar, hero
                           #   entrance animation (GSAP). Preloader plays once per session
      menu-anim.ts          # SplitText-style nav/footer link animations (exports MenuAnims)
    styles/
      portfolio.css         # main stylesheet — design tokens (:root) + all section styles
      menu-anim.css, enhance.css, stack.css, work-shots.css  # feature-scoped stylesheets
  public/
    assets/                # favicon, og-cover, CV pdf, one folder of .webp screenshots per project
    projects/marathon-concept/  # a standalone demo embedded/linked as one project's target
  docs/                    # planning docs for the Jekyll→React migration (historical)
```

There is no `_layouts/`, `_projects/`, Liquid templating, or Jekyll config in this repo — those were removed as part of the React migration cleanup. Don't recreate that structure.

## Common Development Commands

```bash
npm install          # first time only
npm run dev           # Vite dev server → http://localhost:5173/fernando/
npm run build         # typecheck + production build → ./dist/
npm run typecheck     # tsc --noEmit
npm run lint          # ESLint
npm run format        # Prettier (format:check to verify only)
npm test              # Vitest, single run
npm run preview       # serve the built dist/ locally
```

## Content Model: Projects

Projects shown in the "Proyectos"/Work grid are **not** individual files — they're data entries in `src/data/index.ts`:

1. Add an entry to `PROJECTS_COMMON` (array): `{ id, ref, year, url, repo, tags: [...], shots: [...] }`. Use the next two-digit `ref`. `repo` is optional (adds a "Código" chip linking to the source). Set `url: null, comingSoon: true` for WIP projects instead of a link.
2. Add a matching `id` key to **both** `PROJECT_COPY.es` and `PROJECT_COPY.en` with `{ title, desc }`. Missing either language is a compile error: `PROJECT_COPY` is typed by project id.
3. Screenshots are required: put them in `public/assets/<project>/` as WebP and list them in `shots` as `A + "<project>/<file>.webp"`. The hover crossfade in `work-shots.css` only has keyframes for 2, 3, 5 or 8 shots — repeat one to reach a supported count. Convert PNG captures with:
   `npx sharp-cli -i "public/assets/<project>/*.png" -o "{dir}" -f webp -q 78 resize 1200 --withoutEnlargement` and delete the PNGs.

To add a Labs/experiment entry, use `EXP_COMMON` the same way (simpler shape: `id`, `badge`, `stack`, `url`).

## Design System: "Mammoth Style"

Bold, single-theme (no light/dark toggle) editorial look. Tokens live in `:root` at the top of `src/styles/portfolio.css`:

- `--c-yellow` (base canvas — randomized per page load from `ACCENTS` in `data/index.ts`, persisted in `localStorage` to avoid repeats), `--c-black`, `--c-cream`, `--c-blue`, `--c-red`
- `--font-display` (Bebas Neue — big condensed headlines, ALL CAPS), `--font-condensed` (Barlow Condensed — eyebrows/labels/tags), `--font-body` (Barlow)
- `--border` / `--border-thick` — solid 2px/4px black borders used everywhere instead of soft shadows
- `--space-section-v` / `--space-section-h` — shared section padding scale (`clamp(...)`)
- `--ease-snap` — the standard motion easing curve

Component classes follow a `.block__element` convention per section (e.g. `.hero__title`, `.hero__card`, `.featured__frame`, `.work-grid`) — grep `portfolio.css` for the block name before inventing a new class.

### Responsive

- Mobile-first. Key breakpoints in `portfolio.css`: 1024px, 768px, 480px (search `@media` blocks — they're grouped near the bottom under `/* ── RESPONSIVE ── */`)
- `prefers-reduced-motion` disables transform-heavy hover/entrance animations

## Working Rule: Leave Nothing Behind

Keep the code and the repo as clean as possible, always. This is a general rule, not a per-task preference.

- **Code**: delete dead code, unused variants, props, CSS rules and data fields in the same change that makes them unused. No commented-out blocks, no "just in case" leftovers, no duplicated values — one source of truth (`src/data/index.js`).
- **Assets**: when an image or file is replaced, remove the old one. No placeholder content left in the shipped site.
- **Git**: once a PR is merged, delete its branch locally and on GitHub in the same step, without being asked. Don't leave untracked files lying around — commit them or remove them.
- **Docs**: when a change makes this file or `README.md` inaccurate (stack, scripts, structure, how to add a project), update it in the same change.
- Only clean up what the current work created or made obsolete. Anything else that looks stale (old branches, files of unknown origin) gets flagged, not deleted.

## Notes for Future Work

- **No prop drilling for shared state**: components read copy with `useT()` and the language with `useLang()`; they do not receive `t`/`lang` as props. Keep the store small — state used by a single component stays local (`useState`).
- **No CMS, no markdown content files** — everything textual is in `src/data/index.ts`. When editing copy, update both `es` and `en` blocks together; the `Copy` type fails the build if they drift apart.
- **Asset paths**: never hardcode `/fernando/`. In JS build paths from `import.meta.env.BASE_URL` (see the `A` prefix in `data/index.ts`); in `index.html` write `/assets/...` and Vite prepends `base`. Changing host or domain is then one line in `vite.config.ts` (plus the absolute canonical/OG URLs in `index.html`).
- **Testing**: `npm run lint`, `npm run typecheck` and `npm test` must pass (CI enforces them on PRs). Tests live next to the code as `*.test.ts(x)`. Visual changes still need a manual check: `npm run dev`, open `http://localhost:5173/fernando/`, both languages plus mobile width.
- **No `any`**: keep the code free of `any`, `as any` and `@ts-` comments. DOM lookups use the typed generics (`querySelector<HTMLElement>`), unions are narrowed with `in`/`instanceof`.
- **Deployment**: pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` — no manual gh-pages branch management needed.
