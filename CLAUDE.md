# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **personal portfolio website** built with **Jekyll 4.4.1**, deployed to GitHub Pages at `https://dunlag.github.io/fernando`. The site showcases web development and UI/UX design projects with a custom dark/light theme system and responsive mobile-first design.

### Key Technologies
- **Static Site Generator**: Jekyll 4.4.1 with minima theme (heavily customized)
- **Styling**: CSS3 with CSS variables for theming
- **Frontend**: Vanilla JavaScript (no frameworks)
- **Hosting**: GitHub Pages (github.com/Dunlag/dunlag.github.io, branch: main)
- **Fonts**: Google Fonts (Space Grotesk, Inter)

## Project Structure

```
root/
  _config.yml             # Jekyll site configuration
  _layouts/               # Page templates (default, home, page, post)
  _projects/              # Project collection (YAML front matter + Markdown)
  proyectos/              # Individual project demo folders (standalone HTML/CSS/JS)
  assets/
    css/main.css          # Main stylesheet (2000+ lines, uses CSS variables)
    js/main.js            # Site-wide JS (mobile menu, theme toggle, sidebar fade)
    images/               # Images and icons
```

### Project Collection vs. Demo Folders
- **`_projects/*.md`**: Jekyll collection entries that appear on `/projects/` page. Each has front matter with title, permalink, date, and description
- **`proyectos/*/`**: Standalone project demos (each with own `index.html`, `style.css`, sometimes `script.js`)

**Relationship**: The `_projects/*.md` file links to the corresponding demo in `proyectos/` folder, e.g., `_projects/marathon-concept.md` links to `/fernando/proyectos/marathon-concept/`

## Common Development Commands

### Serve locally
```bash
bundle install    # First time only
bundle exec jekyll serve
# Opens http://localhost:4000/fernando/
```

### Build for production
```bash
bundle exec jekyll build
# Output goes to ./_site/
```

### Update gems
```bash
bundle update
```

## Architecture Decisions

### Design System: Editorial Hazard
Inspired by *The Verge* — neo-brutalist editorial aesthetic. Reference materials live in `vergedesing/` (design specs + sample HTML). Key invariants:
- **Sharp corners only**: 0px border-radius on all structural components (buttons, cards, inputs, nav). Circles only for icon buttons.
- **No soft shadows**: depth is communicated via 1–2px solid borders and the "hard offset" trick — `box-shadow: 4px 4px 0 0 var(--accent)` (a solid block of color shifted behind the element). Active state shrinks to `translate(2px, 2px)` + `box-shadow: 0 0 0 0`.
- **Color is elevation**: tiles painted in primary/accent fills, not raised with shadows.
- **Typography**: extreme scale contrast — display headlines feel "too big", labels remain tiny and widely-tracked.

### Theme System
CSS custom properties on `<html data-theme>`:
- Default: **light** (`#F9F9F9` newsprint canvas, `#5200FF` ultraviolet primary, `#3CFFD0` mint accent)
- Toggle: **dark** (`#131313` canvas, mint becomes primary, ultraviolet becomes accent)
- A "no-flash" inline script in `_layouts/default.html` reads `localStorage.theme` before paint
- `assets/js/main.js` handles toggle + persistence

### Typography
Loaded from Google Fonts in `_layouts/default.html`:
- `--font-display`: **Anton** (substitute for Manuka — display XL/headlines, ALL CAPS)
- `--font-body`: **Inter** (substitute for PolySans — body, UI, H4)
- `--font-mono`: **Space Grotesk** (timestamps, buttons, eyebrows, technical labels)

Iconography: **Material Symbols Outlined** (Google Fonts). Used in nav, footer, and project tiles. Per-project icons mapped by slug in `_layouts/home.html` (e.g., `cards-animadas → style`, `error-404 → terminal`).

### Component Vocabulary (in `assets/css/main.css`)
- `.btn-primary` / `.btn-outline` / `.btn-mono` — rectangular, with hard-offset shadow
- `.tile` (StoryStream card) + `.tile--accent` (the loud one painted in ultraviolet)
- `.eyebrow`, `.timestamp`, `.pill-tag`, `.status-badge`
- `.story-card` (timeline item with mint marker)
- `.input-editorial` + `.input-group` (border-bottom 2px, focus shifts to ultraviolet)
- `.connect-card` (CTA card with badge tab + 4px frame)
- `.hero-editorial`, `.split-section`, `.section-header` — section-level primitives

### Responsive
- Mobile-first. Breakpoints: 720px (2-col tiles), 860px (nav collapse), 960px (hero split + section split), 1100px (3-col tiles)
- Mobile menu: `.nav-menu.is-open` overlay below nav, controlled by `#hamburger` in JS
- `prefers-reduced-motion` disables transforms and shadow animations

## Workflow for New Projects

1. **Create demo** in `proyectos/new-project-name/` with `index.html`, `style.css`, optional `script.js`
2. **Add collection entry** in `_projects/new-project-name.md` with front matter:
   ```yaml
   ---
   title: "Project Title"
   description: "Short description"
   technologies: "HTML5, CSS3, JavaScript"
   date: YYYY-MM-DD
   layout: page
   permalink: /projects/new-project-name/
   ---
   [Content with link to demo]
   ```
3. **Local testing**: Run `bundle exec jekyll serve` and visit `http://localhost:4000/fernando/projects/`

## Key CSS Files & Patterns

- **`assets/css/main.css`**: Single file, all styles. Sections delimited by `/* ============... */` headers (RESET, BASE, BUTTONS, HOME — HERO EDITORIAL, etc.)
- **Variables only**: Always use `var(--primary)`, `var(--bg)`, etc. Never hardcode hex colors in component rules — only in the `:root` and `[data-theme="dark"]` blocks.
- **Spacing scale**: `--s-1` (4px) through `--s-8` (96px). Don't introduce arbitrary px values for margins/padding.
- **Hard offset over shadow**: when a hover effect needs depth, use the offset trick (`transform: translate(-2px,-2px)` + `box-shadow: 6px 6px 0 0 var(--accent)`). Never use blurred/soft shadows.
- **Animations**: stick to `--ease` (0.18s cubic-bezier). Wrap any transform-heavy hover in the `prefers-reduced-motion` opt-out at the bottom of the file.

## Notes for Future Work

- **No build step**: Jekyll handles compilation; no webpack/bundler needed
- **Relative URLs**: Always use `{{ 'path' | relative_url }}` in templates (handles baseurl: "/fernando")
- **Git deployment**: Push to GitHub, GitHub Actions or gh-pages branch auto-deploys
- **Testing**: Open browser to `localhost:4000/fernando` and manually verify responsive design and theme toggle

## Related Files

- `.github/workflows/` may contain deployment configs (not visible here)
- `Gemfile.lock`: Locks dependency versions—check before pushing if gems updated
