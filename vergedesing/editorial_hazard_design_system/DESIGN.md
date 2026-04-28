---
name: Editorial Hazard Design System
colors:
  surface: '#0d1512'
  surface-dim: '#0d1512'
  surface-bright: '#323b37'
  surface-container-lowest: '#08100d'
  surface-container-low: '#151d1a'
  surface-container: '#19211e'
  surface-container-high: '#232c28'
  surface-container-highest: '#2e3733'
  on-surface: '#dbe5df'
  on-surface-variant: '#b9cac2'
  inverse-surface: '#dbe5df'
  inverse-on-surface: '#2a322f'
  outline: '#84948d'
  outline-variant: '#3b4a44'
  surface-tint: '#00e0b4'
  primary: '#ffffff'
  on-primary: '#00382b'
  primary-container: '#3afecf'
  on-primary-container: '#00725b'
  inverse-primary: '#006b55'
  secondary: '#c9bfff'
  on-secondary: '#2f009c'
  secondary-container: '#5200ff'
  on-secondary-container: '#ccc2ff'
  tertiary: '#ffffff'
  on-tertiary: '#3a3000'
  tertiary-container: '#fee267'
  on-tertiary-container: '#756300'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#3afecf'
  primary-fixed-dim: '#00e0b4'
  on-primary-fixed: '#002118'
  on-primary-fixed-variant: '#00513f'
  secondary-fixed: '#e5deff'
  secondary-fixed-dim: '#c9bfff'
  on-secondary-fixed: '#1a0063'
  on-secondary-fixed-variant: '#4400d9'
  tertiary-fixed: '#fee267'
  tertiary-fixed-dim: '#e0c64e'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#534600'
  background: '#0d1512'
  on-background: '#dbe5df'
  surface-variant: '#2e3733'
  jelly-mint: '#3CFFD0'
  verge-ultraviolet: '#5200FF'
  console-mint-border: '#309875'
  deep-link-blue: '#3860BE'
  focus-cyan: '#1EAEDB'
  purple-rule: '#3D00BF'
  canvas-black: '#131313'
  surface-slate: '#2D2D2D'
  image-frame: '#313131'
  hazard-white: '#FFFFFF'
  text-primary: '#FFFFFF'
  text-secondary: '#949494'
  text-muted: '#E9E9E9'
typography:
  hero-wordmark:
    fontFamily: epilogue
    fontSize: 107px
    fontWeight: '900'
    lineHeight: '0.80'
    letterSpacing: 1.07px
  display-secondary:
    fontFamily: epilogue
    fontSize: 60px
    fontWeight: '900'
    lineHeight: '0.80'
  headline-lg:
    fontFamily: inter
    fontSize: 34px
    fontWeight: '700'
    lineHeight: '1.00'
  heading-wide:
    fontFamily: inter
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.10'
    letterSpacing: 0.32px
  heading-md:
    fontFamily: inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.00'
  fashion-whisper:
    fontFamily: inter
    fontSize: 19px
    fontWeight: '300'
    lineHeight: '1.20'
    letterSpacing: 1.9px
  all-caps-xl:
    fontFamily: inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.10'
    letterSpacing: 1.8px
  body-relaxed:
    fontFamily: inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: '1.60'
  eyebrow:
    fontFamily: inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.30'
    letterSpacing: 1.8px
  mono-timestamp:
    fontFamily: spaceGrotesk
    fontSize: 11px
    fontWeight: '500'
    lineHeight: '1.20'
    letterSpacing: 1.1px
  mono-button:
    fontFamily: spaceGrotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '2.00'
    letterSpacing: 1.5px
  serif-pullquote:
    fontFamily: newsreader
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.30'
    letterSpacing: -0.16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  micro-2: 2px
  micro-4: 4px
  micro-5: 5px
  micro-6: 6px
  micro-9: 9px
  micro-10: 10px
  editorial-12: 12px
  editorial-16: 16px
  editorial-20: 20px
  editorial-24: 24px
  editorial-25: 25px
---

# Design System / Editorial Hazard
## Design System Inspiration of The Verge

Hazard-tape editorial. Massive Manuka headlines, acid-mint + ultraviolet accents, and a StoryStream timeline that feels like a git log for the news. Generated from DESIGN.md.

---

## Section 01 / Palette
**Color Palette**
Canvas black, jelly mint, verge ultraviolet — hazard colors on a near-black surface.

### Primary — Brand Hazards
| Color | Hex | Description |
| :--- | :--- | :--- |
| **Jelly Mint** | `#3CFFD0` | The signature acid-mint accent. CTA fills, active borders, hazard spotlights. |
| **Verge Ultraviolet** | `#5200FF` | The complementary hazard. Secondary tiles, outlined buttons, alert borders. |

### Secondary & Accent
*   **Console Mint Border:** `#309875` (Darker mint for card outlines and button borders)
*   **Deep Link Blue:** `#3860BE` (The one moment blue appears — every link's hover state)
*   **Focus Cyan:** `#1EAEDB` (Reserved for button focus rings. Keyboard-only visibility)
*   **Purple Rule:** `#3D00BF` (Darker ultraviolet for StoryStream timeline rails)

### Surface & Background
*   **Canvas Black:** `#131313` (The default dark surface for the entire homepage. Newsprint-negative warmth)
*   **Surface Slate:** `#2D2D2D` (Secondary card background when a tile stays quiet)
*   **Image Frame:** `#313131` (1px border around inline photography)
*   **Hazard White:** `#FFFFFF` (Tile fill, primary text, and the loudest "spotlight" surface)

### Neutrals & Text
*   **Primary Text:** `#FFFFFF` (Headlines and display text on the canvas)
*   **Secondary Text:** `#949494` (Bylines, timestamps, photo credits)
*   **Muted Text:** `#E9E9E9` (Button text on dark slate — slightly off-white to reduce glare)

---

## Section 02 / Typography
**Typographic Hierarchy**
Manuka shouts, PolySans works, PolySans Mono labels, FK Roman whispers.

*   **Hero Wordmark:** Manuka · 107px / 900 / 0.80 / 1.07px
*   **Display Secondary:** Manuka · 60px / 900 / 0.80
*   **Large Headline:** PolySans · 34px / 700 / 1.00
*   **Heading Wide:** PolySans · 32px / 400 / 1.10 / 0.32px
*   **Heading Medium:** PolySans · 24px / 700 / 1.00
*   **Fashion Whisper:** PolySans · 19px / 300 / 1.20 / 1.9px / CAPITALIZE
*   **All-Caps XL:** PolySans · 18px / 400 / 1.10 / 1.8px / UPPER
*   **Body Relaxed:** PolySans · 16px / 500 / 1.60 (Long-form reading body)
*   **Eyebrow All-Caps:** PolySans · 12px / 400 / 1.30 / 1.8px / UPPER
*   **Mono Timestamp:** PolySans Mono · 11px / 500 / 1.20 / 1.1px / UPPER
*   **Mono Button:** PolySans Mono · 12px / 600 / 2.00 / 1.5px / UPPER
*   **Serif Body:** FK Roman Standard · 16px / 400 / 1.30 / -0.16px (Review decks and critic pulls)

---

## Section 03 / Buttons
**Button Variants**
Pills only. 24–40px radius, hazard-color fills, mono UPPERCASE labels.

*   **Primary:** Jelly Mint Pill (`#3CFFD0`)
*   **Secondary:** Dark Pill (Surface Slate)
*   **Outlined Mint:** 40px radius, `#309875` border
*   **Outlined Ultraviolet:** 30px radius, `#5200FF` border
*   **Icon:** Round 50%
*   **Pill Tag:** Non-interactive, used for "Breaking" labels

---

## Section 04 / Story Tiles
**Hazard-Color Tiles**
Saturated accent blocks with rounded 20–24px corners. Color is elevation.

*   **Policy / Feature:** Long-form deck style.
*   **Hardware:** Review style.
*   **Gaming:** News style.
*   **Science:** Lab/Deep-dive style.

---

## Section 05 / StoryStream
**Timeline Rail**
Every post is a pill-cornered tile, pinned to a dashed rail by a mono uppercase timestamp.

---

## Section 06 / Forms
**Inputs & Newsletter**
Tight 2px radius, mint focus border, ultraviolet error border — newspaper-form minimalism.

---

## Section 07 / Spacing
**Spacing Scale (8px System)**
*   **Micro:** 2px, 4px, 5px, 6px, 9px, 10px
*   **Editorial:** 12px, 16px, 20px, 24px, 25px
*   **Base:** 8px

---

## Section 08 / Radius
**Border Radius Scale**
*   **2px:** Inputs, badges
*   **3px:** Inline images
*   **4px:** Nested imagery
*   **20px:** Story tiles
*   **24px:** Feature cards, primary button
*   **30px:** Promo buttons
*   **40px:** Outlined pill CTAs
*   **50%:** Avatars, icon buttons

---

## Section 09 / Elevation
**Depth & Elevation**
Color is elevation. 1px hazard borders do the work shadows would do elsewhere.

*   **Level 0:** Plain canvas text
*   **Level 2:** 1px hairline frame (images)
*   **Level 3:** 1px Jelly Mint outline (active tile)
*   **Level 4:** 1px Ultraviolet outline (promo state)
*   **Level 5:** Subtle atmospheric 1px ring (stacked cards)
*   **Level 6:** Inset mint underline (active tab)
*   **Level 7:** Saturated Jelly Mint fill (loudest emphasis)
