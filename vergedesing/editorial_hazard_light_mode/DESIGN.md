---
name: Editorial Hazard (Light Mode)
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#484457'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#797489'
  outline-variant: '#c9c3da'
  surface-tint: '#5c2bff'
  primary: '#3c00c0'
  on-primary: '#ffffff'
  primary-container: '#5200ff'
  on-primary-container: '#ccc2ff'
  inverse-primary: '#c9bfff'
  secondary: '#006b55'
  on-secondary: '#ffffff'
  secondary-container: '#3afecf'
  on-secondary-container: '#00725b'
  tertiary: '#3e3e3e'
  on-tertiary: '#ffffff'
  tertiary-container: '#555555'
  on-tertiary-container: '#cacaca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c9bfff'
  on-primary-fixed: '#1a0063'
  on-primary-fixed-variant: '#4400d9'
  secondary-fixed: '#3afecf'
  secondary-fixed-dim: '#00e0b4'
  on-secondary-fixed: '#002118'
  on-secondary-fixed-variant: '#00513f'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-xl:
    fontFamily: Manuka
    fontSize: 120px
    fontWeight: '800'
    lineHeight: 100px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Manuka
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Manuka
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 44px
  body-lg:
    fontFamily: PolySans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: PolySans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: PolySans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  gutter: 20px
  margin: 40px
---

## Brand & Style
This design system occupies the intersection of traditional broadsheet journalism and aggressive digital futurism. It is high-contrast, intellectual, and intentionally jarring. The brand personality is authoritative yet subversive, utilizing a "Neo-Brutalist" aesthetic that favors structural integrity over decorative fluff. 

The emotional response should be one of urgent clarity—as if reading a digital manifesto printed on premium, off-white stock. By transitioning to a light mode, the system gains a "Physical Press" quality, trading the neon-noir of dark mode for the sophisticated, high-energy legibility of a modern editorial house.

## Colors
The palette is anchored by a warm newsprint white (#F9F9F9), which provides a more organic, tactile reading experience than a sterile hex-white. 

- **Verge Ultraviolet (#5200FF):** Used for primary actions, critical brand moments, and active states. It vibrates against the warm background.
- **Jelly Mint (#3CFFD0):** A secondary "hazard" accent used for highlights, success states, and decorative structural elements.
- **Ink Black (#1A1A1A):** Used for body text to ensure maximum legibility while avoiding the harshness of pure black on a light screen.
- **Monochrome Accents:** Light grays replace dark slates for depth, maintaining a clean, architectural feel.

## Typography
Typography is the structural backbone of this design system. We utilize a strict hierarchy that mimics editorial layouts.

- **Manuka:** Our display face. It should be used at extremely large scales with tight leading. It is condensed, aggressive, and impactful.
- **PolySans:** Our utilitarian workhorse. It provides a contemporary, slightly quirky character to body copy and interface labels.

Always favor extreme scale contrasts. Headlines should feel "too big" for their containers, while labels should remain tiny, precise, and widely tracked.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy inspired by broadsheet newspapers. Use a 12-column grid for desktop and a 4-column grid for mobile.

- **Strict Alignment:** Every element must snap to the grid. Avoid "floating" elements.
- **Asymmetry:** Use empty columns to create white space. Do not feel obligated to fill every horizontal pixel.
- **The "Rule Line":** Use 1px horizontal and vertical dividers (Ink Black or Subtle Gray) to separate content sections, reinforcing the editorial structure.

## Elevation & Depth
This design system rejects traditional shadows and blurred depth. Instead, it uses **Flat Layering** and **Hard Borders**.

- **Level 0 (Base):** Newsprint White (#F9F9F9).
- **Level 1 (Inlay):** Sunken surfaces using #F1F1F1 with a 1px inset border.
- **Level 2 (Raised):** Stark White (#FFFFFF) with a 1px or 2px solid Ink Black border.
- **Active State Depth:** Instead of a shadow, use a "Hard Offset"—a solid block of Ultraviolet or Mint shifted 4px down and 4px right behind the primary element.

## Shapes
The shape language is strictly **Sharp (0px)**. 

No border radii are permitted. Circles may be used for specific iconography or avatars to provide a singular point of organic contrast, but all structural UI components (buttons, cards, inputs) must maintain 90-degree corners. This reinforces the "Hazard" and "Editorial" nature of the system—unapologetic and precise.

## Components
- **Buttons:** Rectangular, no radius. Primary buttons use a Ultraviolet background with White text. Secondary buttons use a White background with a 2px Black border. On hover, apply a solid Jelly Mint offset "shadow."
- **Inputs:** Simple bottom-border only for a "form" feel, or a full 1px border. Background should be #FFFFFF. Focus state triggers a 2px Ultraviolet border.
- **Chips/Tags:** Small-scale PolySans caps. Use Jelly Mint backgrounds with Black text for high visibility "Tags" or "Alerts."
- **Cards:** No shadows. Use 1px borders (#E5E5E5). For featured content, use a 2px Black border and an Ultraviolet "slug" or "eyebrow" text.
- **Dividers:** 1px solid lines are essential. Use them to break up long-form text or separate sidebar navigation.
- **Data Tables:** Clear, horizontal rules only. Header row should be #F1F1F1 with bold PolySans labels.