# Portfolio React Migration — Spec

## Context

El portfolio actual está construido con Jekyll 4.4.1 y desplegado en `https://dunlag.github.io/fernando/`. Se dispone de un diseño completo exportado desde Claude Design (Mammoth Style editorial) que es una SPA en React 18 con JSX, animaciones GSAP, fuentes Bebas Neue / Barlow, y un sistema de contenido bilingüe ES/EN. El objetivo es reemplazar Jekyll con esta nueva app React+Vite, mantener la URL `/fernando/`, y seguir el mismo patrón de deploy que ya se usa en `toldos-venecianos-landing`.

---

## Arquitectura

### Tech stack
- **React 18 + Vite 5** (sin TypeScript — el diseño usa JS plano)
- **GSAP 3.13** con SplitText (gratuito desde 3.12) via `npm install gsap`
- **CSS global** — los 5 archivos del diseño portados tal cual (no CSS Modules)
- **Google Fonts** — Bebas Neue, Barlow Condensed, Barlow, DM Serif Display, Permanent Marker
- **Sin React Router** — single page con anchor links (`#work`, `#labs`, `#about`, `#contact`)

### Deploy
- Mismo workflow que `toldos-venecianos`: `.github/workflows/deploy.yml` → Node 20 → `npm run build` → `dist/` → `actions/deploy-pages`
- `vite.config.js` con `base: '/fernando/'`
- Archivo `.nojekyll` en la raíz para desactivar el build Jekyll de GitHub Pages
- Eliminar `_config.yml`, `Gemfile`, `Gemfile.lock`, `_layouts/`, `_posts/`, `_projects/`, carpeta `_site/`

### Proyecto Marathon (único demo que no tiene URL de producción propia)
- Mover `proyectos/marathon-concept/` → `public/projects/marathon-concept/`
- Se servirá estáticamente en `/fernando/projects/marathon-concept/`
- El resto de proyectos de cliente (pacifico, narixa, avignon, umbro) enlazan a sus URLs de producción reales (actualizar en `data/projects.js`)

---

## Estructura de ficheros

```
fernando/                         ← raíz del repo (reemplaza Jekyll)
├── .github/workflows/deploy.yml  ← copiado de toldos-venecianos
├── .nojekyll
├── public/
│   ├── projects/
│   │   └── marathon-concept/     ← movido desde proyectos/
│   └── assets/
│       ├── favicon.svg           ← del diseño
│       └── og-cover.png          ← del diseño
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Featured.jsx
│   │   ├── Marquee.jsx
│   │   ├── Work.jsx              ← incluye WorkCard y WorkShots
│   │   ├── Labs.jsx
│   │   ├── Services.jsx
│   │   ├── Stack.jsx
│   │   ├── About.jsx             ← incluye AnimatedStat, CountUp, SeqReveal
│   │   ├── Cta.jsx
│   │   ├── Footer.jsx
│   │   └── Rich.jsx              ← renderer de rich text (string|{em}|{span}|{br})
│   ├── data/
│   │   └── index.js              ← contenido completo bilingüe (portado de data.jsx)
│   ├── hooks/
│   │   ├── useLang.js            ← lang + localStorage
│   │   ├── useFitText.js         ← fit [data-fit] al ancho del padre
│   │   └── useScrollHide.js      ← navbar hide on scroll down
│   ├── styles/
│   │   ├── portfolio.css
│   │   ├── menu-anim.css
│   │   ├── enhance.css           ← preloader, cursor, scroll progress
│   │   ├── stack.css
│   │   └── work-shots.css
│   ├── lib/
│   │   ├── enhance.js            ← preloader, cursor, scroll-progress (portado tal cual)
│   │   └── menu-anim.js          ← SplitText hover menu (portado tal cual)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

---

## Componentes — comportamiento clave

### `Preloader` (inline en `index.html` + `enhance.js`)
HTML del preloader en el `index.html` antes de `<div id="root">`. El JS de `enhance.js` anima el contador 000→100 con GSAP, wipe hacia arriba al terminar, luego dispara la entrada del hero.

### `App.jsx`
- Estado: `lang` (via `useLang`), acento aleatorio en mount (sin repetir el anterior, via `localStorage`)
- `useEffect` para aplicar `--c-yellow` y `--marquee-speed` a `:root`
- `useEffect` para `useFitText` en `[data-fit]` (WORK heading + footer wordmark)
- `useEffect` para tilt 3D ratón en `.section-cta` y `.work-header`
- `useEffect` para SplitText hover en navbar y footer (llama a `MenuAnims.init`)
- `useEffect` para scroll reveal (IntersectionObserver en `.reveal`)
- `useEffect` para escalar iframes de labs (`.lab-tile__frame`)
- Sin TweaksPanel en producción

### `Navbar.jsx`
- Hide on scroll down (`useScrollHide` hook)
- Language toggle ES/EN
- CTA button con `status-dot` pulsante

### `Hero.jsx`
- Soporta `variant` prop: `"a"` (editorial, default), `"b"` (centered), `"c"` (split)
- El preloader/enhance.js dispara la entrada animada del hero tras el wipe
- Imagen del hero: `<img loading="lazy">` en lugar de `<image-slot>`

### `Work.jsx`
- `variant` prop: `"a"` (grid 3 columnas) o `"b"` (lista editorial)
- `WorkShots`: crossfade slideshow CSS puro con 2–3 imágenes apiladas por tarjeta
- Hover: scale imagen, scrim con descripción, duo overlay amarillo
- Cursor personalizado "VER →" gestionado por `enhance.js`
- URLs de proyectos de cliente actualizadas a producción real

### `Labs.jsx`
- Iframes escalados a tile: `iframe` 1280px → scale via `--s` CSS variable
- El escalado se recalcula en resize y en mount (desde App.jsx)

### `About.jsx`
- `CountUp` animado via IntersectionObserver + requestAnimationFrame (sin GSAP)
- `SeqReveal` para Star Wars order (números que aparecen uno a uno)
- Collage de 3 fotos rotadas via CSS `transform: rotate()`
- `<img>` con placeholder de color

### `enhance.js` (lib, no componente)
- Preloader: `gsap.to` 000→100, wipe yPercent -100
- Custom cursor: dot amarillo con `gsap.quickTo`, morphea a "VER →" sobre work-cards
- Scroll progress bar
- Hero entrance: stagger de eyebrow, title, sub, buttons, card
- Se importa en `main.jsx` después de que React monte

---

## CSS

Los 5 archivos del diseño se portan sin modificar a `src/styles/`. Se importan todos en `main.jsx`. La única diferencia: reemplazar todas las referencias a `image-slot` por `img` en las reglas CSS que las tengan (hay pocas, son `width:100%; height:100%`).

Tokens principales:
- `--c-yellow: #FFE000` (tweakable, cambia en mount)
- `--c-black: #0D0D0D` / `--c-cream: #F5F0E8` / `--c-blue: #3B7DDD`
- `--font-display: 'Bebas Neue'` / `--font-condensed: 'Barlow Condensed'` / `--font-body: 'Barlow'`

---

## Datos (`src/data/index.js`)

Puerto directo de `data.jsx`:
- `window.DATA` → export `DATA`
- `window.PROJECT_COPY` → export `PROJECT_COPY`
- `window.PROJECTS_COMMON` → export `PROJECTS_COMMON`
- `window.EXP_COMMON` → export `EXP_COMMON`
- `window.SERVICES` → export `SERVICES`

URLs a actualizar en `PROJECTS_COMMON` (cambiar las que apuntan a `/fernando/projects/...`):
- `pacifico`, `narixa`, `avignon`, `umbro` → sus URLs de producción reales
- `marathon` → `https://dunlag.github.io/fernando/projects/marathon-concept/` (sigue funcionando desde `public/`)

---

## `index.html` de Vite

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <!-- meta, OG, Twitter, canonical (mismos del diseño) -->
  <link rel="icon" href="/fernando/assets/favicon.svg" />
  <!-- Google Fonts: Bebas Neue, Barlow Condensed, Barlow, DM Serif Display, Permanent Marker -->
  <!-- NO se cargan React ni Babel desde CDN — Vite los bundlea -->
</head>
<body>
  <div id="preloader">
    <span class="preloader__word">FERNANDO</span>
    <span class="preloader__count">000</span>
    <span class="preloader__bar"></span>
  </div>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

---

## `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fernando/',
})
```

---

## `package.json` (dependencias clave)

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "gsap": "^3.13.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.x",
    "vite": "^5.x"
  }
}
```

---

## Deploy workflow (`.github/workflows/deploy.yml`)

Copia exacta del de `toldos-venecianos-landing`:
- `on: push: branches: [main]`
- `permissions: pages + id-token`
- `actions/setup-node@v4` Node 20, cache npm
- `npm ci && npm run build`
- `actions/upload-pages-artifact@v3` con `path: dist`
- `actions/deploy-pages@v4`

En el repo de GitHub: Settings → Pages → Source: **GitHub Actions** (no Branch).

---

## Verificación

1. `npm run dev` → `http://localhost:5173/fernando/` — preloader anima, hero aparece, navbar funciona
2. Cambio de idioma ES/EN — todos los textos cambian, `localStorage.fp_lang` se persiste
3. Scroll → navbar se oculta al bajar, reaparece al subir
4. Work cards hover — scrim aparece, imagen escala, cursor "VER →"
5. Labs section — iframes escalados visibles
6. About stats — CountUp y SeqReveal animan al scrollear hasta la sección
7. Footer wordmark — "FRONTEND DEVELOPER" se ajusta al ancho total
8. `npm run build` → sin errores → `dist/` generado
9. Push a `main` → GitHub Actions despliega → `https://dunlag.github.io/fernando/` carga la nueva app
10. `/fernando/projects/marathon-concept/` sigue funcionando
