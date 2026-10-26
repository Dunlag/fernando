// Bilingual content for Fernando's portfolio

export type Lang = 'es' | 'en'

/** Inline markup used in copy: plain text, a line break, or an emphasised/highlighted run. */
export type RichPart = string | { br: true } | { em: string } | { span: string }

interface ProjectBase {
  id: string
  ref: string
  year: string
  url: string
  repo?: string
  featured?: boolean
  tags: readonly string[]
  shots: readonly string[]
}

interface ExperimentBase {
  id: string
  badge: string
  stack: string
  url: string
  thumb: string
}

export interface ItemCopy {
  title: string
  desc: string
}

export interface Service {
  num: string
  name: string
  desc: string
}

export type Stat =
  { seq: number[]; label: string } | { num: number; count: true; label: string } | { num: string; label: string }

interface NavCopy {
  work: string
  tools: string
  labs: string
  about: string
  contact: string
}

/** Everything a language must provide. DATA.es and DATA.en are both checked against it. */
export interface Copy {
  dir: 'ES' | 'EN'
  nav: NavCopy
  cta: string
  cv: { tab: string; expanded: string; close: string }
  menu: { open: string; close: string }
  mailSubject: string
  hero: {
    eyebrow: string
    title: RichPart[]
    sub: string
    btnPrimary: string
    btnSecondary: string
    cardNow: string
    cardTag: string
    cardCaption: string
  }
  featured: { title: RichPart[]; meta: string[]; cta: string }
  marquee: string[]
  work: { heading: string; lead: RichPart[]; ctaLabel: string; code: string; agency: { heading: string; note: string } }
  tools: { eyebrow: string; heading: string; desc: string; soon: string; code: string; noShot: string }
  labs: { eyebrow: string; heading: string; desc: string; open: string }
  services: { eyebrow: string; heading: string; statNum: string; statLabel: string; body: string }
  stack: { eyebrow: string; heading: string; desc: string; groups: { label: string; items: string[] }[] }
  about: {
    eyebrow: string
    heading: string
    headline: RichPart[]
    p1: string
    p2: string
    p3: string
    collage: string[]
    stats: Stat[]
  }
  contact: { kicker: string; title: RichPart[]; sub: string; btn: string }
  footer: {
    nav: NavCopy
    colA: { label: string }
    colB: { label: string; lines: string[] }
    colC: { label: string }
    word1: string
    word2: string
    graffiti1: string
    graffiti2: string
    legal: string
    builtWith: string
  }
}

const A = import.meta.env.BASE_URL + 'assets/'

export const CV_URL = A + 'cv-fernando-pinilla.pdf'

export const CONTACT = {
  email: 'fernando.pinilla85@gmail.com',
  github: 'https://github.com/Dunlag',
  linkedin: 'https://linkedin.com/in/fernandopinillavalbuena',
}

export const ACCENTS = ['#FFE000', '#FFB100', '#C6F23C', '#FF5C38', '#36E0C8']

const PROJECTS = [
  {
    id: 'two-black-cats',
    ref: '00',
    year: '2026.05',
    url: 'https://dunlag.github.io/Two-Black-Cats/',
    repo: 'https://github.com/Dunlag/Two-Black-Cats',
    featured: true,
    tags: ['Canvas', 'CSS3', 'JS'],
    shots: [
      A + 'twoBlackCats/two-black-cats01.webp',
      A + 'twoBlackCats/two-black-cats00.webp',
      A + 'twoBlackCats/two-black-cats02.webp',
      A + 'twoBlackCats/two-black-cats04.webp',
      A + 'twoBlackCats/two-black-cats05.webp',
    ],
  },
  {
    id: 'toldos',
    ref: '01',
    year: '2026.05',
    url: 'https://dunlag.github.io/toldos-venecianos-landing/',
    repo: 'https://github.com/Dunlag/toldos-venecianos-landing',
    tags: ['React 18', 'Claude Design', 'GH Pages'],
    shots: [
      A + 'toldosVenecianos/toldos-venecianos00.webp',
      A + 'toldosVenecianos/toldos-venecianos01.webp',
      A + 'toldosVenecianos/toldos-venecianos02.webp',
      A + 'toldosVenecianos/toldos-venecianos03.webp',
      A + 'toldosVenecianos/toldos-venecianos04.webp',
    ],
  },
  {
    id: 'marathon',
    ref: '02',
    year: '2026.02',
    url: import.meta.env.BASE_URL + 'projects/marathon-concept/',
    repo: 'https://github.com/Dunlag/fernando/tree/main/public/projects/marathon-concept',
    tags: ['HTML5', 'CSS3', 'JS'],
    shots: [
      A + 'marathon/marathon01.webp',
      A + 'marathon/marathon02.webp',
      A + 'marathon/marathon03.webp',
      A + 'marathon/marathon04.webp',
      A + 'marathon/marathon05.webp',
    ],
  },
  {
    id: 'obras-elena',
    ref: '03',
    year: '2026',
    url: 'https://dunlag.github.io/Obras-helen/',
    repo: 'https://github.com/Dunlag/Obras-helen',
    tags: ['HTML5', 'CSS3', 'JS'],
    shots: [
      A + 'obrasHelen/obras-helen01.webp',
      A + 'obrasHelen/obras-helen02.webp',
      A + 'obrasHelen/obras-helen03.webp',
      A + 'obrasHelen/obras-helen04.webp',
      A + 'obrasHelen/obras-helen02.webp',
    ],
  },
] as const satisfies readonly ProjectBase[]

export type ProjectId = (typeof PROJECTS)[number]['id']
export interface Project extends ProjectBase {
  id: ProjectId
}
export const PROJECTS_COMMON: readonly Project[] = PROJECTS

/** Agency work without a public repo: shown as one compact row, not as cards. Names are proper nouns, so no per-language copy. */
export const AGENCY: readonly { name: string; year?: string; url: string; tags: readonly string[] }[] = [
  { name: 'Pacífico Residences', year: '2025.08', url: 'https://pacificoresidences.com/', tags: ['PHP', 'CSS3', 'JS'] },
  {
    name: 'Puerto Narixa',
    year: '2025.06',
    url: 'https://gardenhomes.puertonarixa.com/',
    tags: ['PHP', 'HTML5', 'CSS3'],
  },
  { name: 'Finca Avignon', year: '2025.07', url: 'https://fincaavignon.es/', tags: ['PHP', 'HTML5', 'CSS3'] },
  { name: 'Mipuf', year: '2025+', url: 'https://www.mipuf.es/', tags: ['PrestaShop', 'E-com'] },
  { name: 'Cenep', year: '2026.10', url: 'https://cenep.kodoo.es/', tags: ['Odoo', 'E-com'] },
  { name: 'Umbro Iberia', year: '2025', url: 'https://umbro.es/', tags: ['PrestaShop', 'Elementor', 'E-com'] },
  {
    name: 'Serenity Hills',
    year: '2026',
    url: 'https://serenityhills.proyectosavanza.com/index.php',
    tags: ['PHP', 'HTML5', 'CSS3'],
  },
]

interface ToolBase {
  id: string
  stack: string
  /** repo URL, kept ready while the repo is private; only rendered when repoPublic */
  repo?: string
  repoPublic: boolean
  /** no repo yet at all */
  soon?: boolean
  /** screenshot under public/assets/tools/; a placeholder is drawn while missing */
  shot?: string
}

const TOOLS = [
  {
    id: 'escrow',
    shot: A + 'tools/escrow.webp',
    stack: 'Go · Bubble Tea',
    repo: 'https://github.com/Dunlag/escrow',
    repoPublic: false,
  },
  { id: 'tesla', stack: 'GJS · GNOME Shell 50', repoPublic: false, soon: true },
  { id: 'spotify-cli', stack: 'Ink · React · Node', repo: 'https://github.com/Dunlag/spotify-cli', repoPublic: false },
  {
    id: 'sitio-cli',
    shot: A + 'tools/sitio-cli.webp',
    stack: 'Node · CLI',
    repo: 'https://github.com/Dunlag/sitio-cli',
    repoPublic: false,
  },
  {
    id: 'creador-de-videos',
    shot: A + 'tools/creador-de-videos.webp',
    stack: 'Node · Canvas · Kokoro',
    repo: 'https://github.com/Dunlag/creador-de-videos',
    repoPublic: false,
  },
] as const satisfies readonly ToolBase[]

export type ToolId = (typeof TOOLS)[number]['id']
export interface Tool extends ToolBase {
  id: ToolId
}
export const TOOLS_COMMON: readonly Tool[] = TOOLS

// Typed by id: a tool missing its copy in either language does not compile
export const TOOL_COPY: Record<Lang, Record<ToolId, { title: string; problem: string }>> = {
  es: {
    escrow: {
      title: 'ESCROW',
      problem: 'Estrategia espacial cyberpunk para jugar sin salir de la terminal.',
    },
    tesla: {
      title: 'Tesla para GNOME',
      problem:
        'El estado de mi coche en la barra de GNOME. Es un port de omarchy-tesla (MIT, de Jankees van Woezik) que acabo de empezar.',
    },
    'spotify-cli': {
      title: 'spotify-cli',
      problem: 'Spotify en la terminal, con la carátula incluida y todo desde el teclado.',
    },
    'sitio-cli': {
      title: 'sitio-cli',
      problem:
        'Un comando para abrir de golpe todo lo de un cliente (web, admin, staging, repo…) y auditar su web de paso.',
    },
    'creador-de-videos': {
      title: 'Creador de vídeos',
      problem: 'Mi estudio para hacer vídeos animados con código. Con él monto los del canal AskPloc.',
    },
  },
  en: {
    escrow: {
      title: 'ESCROW',
      problem: 'Cyberpunk space strategy you play without leaving the terminal.',
    },
    tesla: {
      title: 'Tesla for GNOME',
      problem:
        "My car's status in the GNOME bar. It's a port of omarchy-tesla (MIT, by Jankees van Woezik) that I've just started.",
    },
    'spotify-cli': {
      title: 'spotify-cli',
      problem: 'Spotify in the terminal, cover art included, all from the keyboard.',
    },
    'sitio-cli': {
      title: 'sitio-cli',
      problem:
        "One command to open everything for a client (site, admin, staging, repo…) and audit their site while you're at it.",
    },
    'creador-de-videos': {
      title: 'Video maker',
      problem: 'My studio for making animated videos with code. I use it for the AskPloc channel.',
    },
  },
}

const EXPERIMENTS = [
  {
    id: 'hover-dock',
    badge: 'UI',
    stack: 'CSS · JS',
    url: 'https://codepen.io/Fernando-Pinilla/pen/wBoayWM',
    thumb: A + 'labs/hover-dock.webp',
  },
  {
    id: 'navbar-anim',
    badge: 'CSS',
    stack: 'CSS · JS',
    url: 'https://codepen.io/Fernando-Pinilla/pen/YPXOoPO',
    thumb: A + 'labs/navbar-anim.webp',
  },
  {
    id: 'error404-pen',
    badge: 'Canvas',
    stack: 'CSS · JS',
    url: 'https://codepen.io/Fernando-Pinilla/pen/raLXxZG',
    thumb: A + 'labs/error404-pen.webp',
  },
] as const satisfies readonly ExperimentBase[]

export type ExperimentId = (typeof EXPERIMENTS)[number]['id']
export interface Experiment extends ExperimentBase {
  id: ExperimentId
}
export const EXP_COMMON: readonly Experiment[] = EXPERIMENTS

// Typed by id: a project or experiment missing its copy in either language does not compile
export const PROJECT_COPY: Record<Lang, Record<ProjectId | ExperimentId, ItemCopy>> = {
  es: {
    'two-black-cats': {
      title: 'Two Black Cats',
      desc: 'Sitio personal para dos gatos bombay. Hero oscuro estilo editorial, revelado tipográfico y atmósfera con Canvas.',
    },
    toldos: {
      title: 'Toldos Venecianos',
      desc: 'De prompt a producción: diseño con Claude Design, implementación en React 18. Flujo AI-to-code completo.',
    },
    marathon: {
      title: 'Marathon Concept',
      desc: 'Recreación fiel del site oficial de Bungie. Paleta neón, efectos avanzados y responsive.',
    },
    'obras-elena': {
      title: 'Obras de Elena',
      desc: 'Web personal para que Elena publique y muestre sus obras. Proyecto real, en producción.',
    },
    'hover-dock': {
      title: 'Dock Hover',
      desc: 'Dock estilo macOS con animación de hover. Pure CSS + JS, sin frameworks.',
    },
    'navbar-anim': {
      title: 'Navbar Animado',
      desc: 'Menú de navegación con animación de apertura y cierre.',
    },
    'error404-pen': {
      title: 'Error 404',
      desc: 'Página 404 animada, experimento en CodePen.',
    },
  },
  en: {
    'two-black-cats': {
      title: 'Two Black Cats',
      desc: 'Personal site for two Bombay cats. Dark editorial hero, typographic reveal and Canvas atmosphere.',
    },
    toldos: {
      title: 'Venetian Blinds',
      desc: 'Prompt to production: designed with Claude Design, built in React 18. Full AI-to-code flow.',
    },
    marathon: {
      title: 'Marathon Concept',
      desc: "Faithful recreation of Bungie's official site. Neon palette, advanced effects, responsive.",
    },
    'obras-elena': {
      title: "Elena's Art",
      desc: 'Personal site where Elena publishes and showcases her artwork. Real project, in production.',
    },
    'hover-dock': {
      title: 'Dock Hover',
      desc: 'macOS-style dock with hover animation. Pure CSS + JS, no frameworks.',
    },
    'navbar-anim': {
      title: 'Animated Navbar',
      desc: 'Navigation menu with open/close animation.',
    },
    'error404-pen': {
      title: 'Error 404',
      desc: 'Animated 404 page, CodePen experiment.',
    },
  },
}

export const SERVICES: Record<Lang, Service[]> = {
  es: [
    {
      num: '01',
      name: 'FRONTEND',
      desc: 'React y TypeScript, o HTML, CSS y JS a pelo, según pida el proyecto. Mira Work.',
    },
    {
      num: '02',
      name: 'DISEÑO',
      desc: 'UI/UX con carácter y animación (GSAP, Canvas): esta web, Two Black Cats, y el flujo de Claude Design a React de Toldos.',
    },
    {
      num: '03',
      name: 'WEB DE AGENCIA',
      desc: 'PHP, WordPress y PrestaShop en proyectos reales de cliente, montados primero en local con Docker.',
    },
    {
      num: '04',
      name: 'HERRAMIENTAS',
      desc: 'CLIs y TUIs en Go y Node, y un motor de vídeo propio. Mira Herramientas.',
    },
  ],
  en: [
    {
      num: '01',
      name: 'FRONTEND',
      desc: 'React and TypeScript, or bare HTML, CSS and JS, whatever the project asks for. See Work.',
    },
    {
      num: '02',
      name: 'DESIGN',
      desc: 'UI/UX with character and motion (GSAP, Canvas): this site, Two Black Cats, and the Claude Design to React flow behind Toldos.',
    },
    {
      num: '03',
      name: 'AGENCY WEB',
      desc: 'PHP, WordPress and PrestaShop on real client projects, built locally with Docker first.',
    },
    {
      num: '04',
      name: 'TOOLS',
      desc: 'CLIs and TUIs in Go and Node, plus a home-made video engine. See Tools.',
    },
  ],
}

export const DATA: Record<Lang, Copy> = {
  es: {
    dir: 'ES',
    nav: {
      work: 'Proyectos',
      tools: 'Herramientas',
      labs: 'Experimentos',
      about: 'Sobre mí',
      contact: 'Contacto',
    },
    cta: 'Contacto',
    cv: { tab: 'CV', expanded: 'Descargar CV', close: 'Cerrar' },
    menu: { open: 'Abrir menú', close: 'Cerrar menú' },
    mailSubject: 'Contacto desde portfolio',
    hero: {
      eyebrow: '↘ Frontend + herramientas/IA · Málaga, ES',
      title: ['DISEÑO WEBS', { br: true }, { em: 'imposibles' }, { br: true }, 'DE IGNORAR'],
      sub: 'Frontend que también construye herramientas, TUIs y flujos con IA. React, CSS y JavaScript en la web; Go y Node en la terminal. Código que se sigue entendiendo seis meses después.',
      btnPrimary: 'Ver proyectos',
      btnSecondary: 'Hablemos',
      cardNow: 'RECIENTE',
      cardTag: '2026',
      cardCaption: 'Lo último que he construido.',
    },
    featured: {
      title: ['TWO BLACK ', { span: 'cats' }],
      meta: ['Proyecto destacado', '2026 · Canvas · CSS · JS', 'Morty & Negrita'],
      cta: 'Abrir proyecto',
    },
    marquee: [
      'FRONTEND',
      'UI/UX',
      'CSS A PELO',
      'VANILLA JS',
      'RESPONSIVE',
      'ANIMACIÓN',
      'ACCESIBLE',
      'TERMINAL',
      'GO',
      'NODE',
      'AGENTES',
      'HECHO A MANO',
      'DEL DIRECTO AL NAVEGADOR',
    ],
    work: {
      heading: 'WORK',
      lead: [{ span: 'Producto real, en producción — de la idea al deploy.' }],
      ctaLabel: 'VER TODO',
      code: 'Código',
      agency: {
        heading: 'Trabajo de agencia',
        note: 'Webs de cliente en PHP, WordPress y PrestaShop. Las desarrollo primero en local con Docker y luego las subo.',
      },
    },
    tools: {
      eyebrow: '↘ Taller',
      heading: 'HERRAMIENTAS',
      desc: 'Lo que construyo cuando el problema no es una web: juegos, TUIs, CLIs y agentes. El código se verá según vaya puliéndolo.',
      soon: 'Próximamente',
      code: 'Código',
      noShot: 'Captura pendiente',
    },
    labs: {
      eyebrow: '↘ Patio de pruebas',
      heading: 'LABS',
      desc: 'Tres experimentos sueltos: un dock con hover, una 404 con Canvas y un menú que se abre y se cierra. Sin frameworks, solo HTML, CSS y JS.',
      open: 'Abrir',
    },
    services: {
      eyebrow: '↘ Lo que hago',
      heading: 'QUÉ HAGO',
      statNum: '10+',
      statLabel: 'proyectos llevados de la idea a producción',
      body: 'Llevo años creando experiencias — antes en directo, ahora en el navegador. La web es solo otro escenario donde montar el espectáculo.',
    },
    stack: {
      eyebrow: '↘ Caja de herramientas',
      heading: 'STACK',
      desc: 'Las herramientas con las que construyo. Elijo lo que hace el trabajo rápido, accesible y fácil de mantener — no por moda.',
      groups: [
        {
          label: 'Frontend',
          items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS moderno', 'GSAP', 'Canvas'],
        },
        { label: 'Backend', items: ['Node.js', 'PHP', 'MySQL', 'REST APIs'] },
        { label: 'Herramientas', items: ['Git', 'Docker', 'Vite', 'Figma'] },
        { label: 'Herramientas/IA', items: ['Go', 'Bubble Tea', 'Ink', 'GJS', 'Claude Code', 'Agentes'] },
      ],
    },
    about: {
      eyebrow: '↘ Sobre mí',
      heading: 'BIO',
      headline: [
        'Antes dirigía el sonido de ',
        { em: 'conciertos, cine y publicidad' },
        ' en Londres. Hoy aplico esa misma precisión a cada interfaz que construyo.',
      ],
      p1: 'Me gusta el desarrollo web casi tanto como discutir el orden correcto de ver Star Wars: coger una idea suelta y convertirla en una página que carga rápido y se entiende a la primera. Vengo del directo —conciertos, rodajes—, donde no hay segundas tomas, y esa costumbre de hacer las cosas bien al momento se me quedó pegada.',
      p2: 'Hago frontend con HTML, CSS y JavaScript, cuidando el rendimiento, la accesibilidad y el SEO sin dármelas de gurú de nada. Lo que me importa: que la web vaya fina y que el código siga teniendo sentido cuando vuelvo a él meses después. Desde Málaga y casi siempre en remoto.',
      p3: 'Del directo me quedé con la manía de no fiarme de «ya saldrá bien». En el escenario no hay segundas tomas; en código lo equivalente son los tests. Por eso, además de webs, ahora hago herramientas de terminal, juegos y agentes con IA, y los que importan llevan tests.',
      collage: ['Mesa de sonido en directo', 'Escenario durante el montaje', 'Plató de televisión antes del directo'],
      stats: [
        {
          seq: [6, 7, 8, 1, 2, 3, 9, 10, 11],
          label: 'Mi orden para ver Star Wars',
        },
        { num: 10, count: true, label: 'Ciudades visitadas este año' },
        { num: 23957, count: true, label: 'Minutos de música en Spotify' },
        { num: 'MLG', label: 'Base · Málaga, en remoto' },
      ],
    },
    contact: {
      kicker: '↘ Línea abierta',
      title: ['HABLEMOS', { br: true }, { span: 'de tu proyecto' }],
      sub: '¿Tienes una idea entre manos o quieres comentar algo? Escríbeme directamente.',
      btn: 'Transmitir mensaje',
    },
    footer: {
      nav: {
        work: 'Proyectos',
        tools: 'Herramientas',
        labs: 'Labs',
        about: 'Sobre mí',
        contact: 'Contacto',
      },
      colA: { label: 'Escríbeme' },
      colB: { label: 'Dónde', lines: ['Málaga / España', 'También en remoto'] },
      colC: { label: 'Redes' },
      word1: 'FRONTEND',
      word2: 'DEVELOPER',
      graffiti1: 'Hecho',
      graffiti2: 'a mano',
      legal: '© 2026 — Fernando Pinilla · Málaga, ES',
      builtWith: 'Estética: Mammoth Style',
    },
  },
  en: {
    dir: 'EN',
    nav: { work: 'Work', tools: 'Tools', labs: 'Labs', about: 'About', contact: 'Contact' },
    cta: 'Contact',
    cv: { tab: 'CV', expanded: 'Download CV', close: 'Close' },
    menu: { open: 'Open menu', close: 'Close menu' },
    mailSubject: 'Contact from portfolio',
    hero: {
      eyebrow: '↘ Frontend + tools/AI · Málaga, ES',
      title: ['I BUILD SITES', { br: true }, { em: 'impossible' }, { br: true }, 'TO IGNORE'],
      sub: 'Frontend that also builds tools, TUIs and AI workflows. React, CSS and JavaScript on the web; Go and Node in the terminal. Code that still reads clean six months later.',
      btnPrimary: 'See projects',
      btnSecondary: "Let's talk",
      cardNow: 'RECENT',
      cardTag: '2026',
      cardCaption: "Latest thing I've built.",
    },
    featured: {
      title: ['TWO BLACK ', { span: 'cats' }],
      meta: ['Featured project', '2026 · Canvas · CSS · JS', 'Morty & Negrita'],
      cta: 'Open project',
    },
    marquee: [
      'FRONTEND',
      'UI/UX',
      'NO-FRAMEWORK CSS',
      'VANILLA JS',
      'RESPONSIVE',
      'MOTION',
      'ACCESSIBLE',
      'TERMINAL',
      'GO',
      'NODE',
      'AGENTS',
      'HAND-BUILT',
      'FROM STAGE TO BROWSER',
    ],
    work: {
      heading: 'WORK',
      lead: [{ span: 'Real, shipped product — from idea to deploy.' }],
      ctaLabel: 'VIEW ALL',
      code: 'Code',
      agency: {
        heading: 'Agency work',
        note: 'Client sites in PHP, WordPress and PrestaShop. I build them locally with Docker first, then ship them.',
      },
    },
    tools: {
      eyebrow: '↘ Workshop',
      heading: 'TOOLS',
      desc: "What I build when the problem isn't a website: games, TUIs, CLIs and agents. The code goes up as I polish it.",
      soon: 'Coming soon',
      code: 'Code',
      noShot: 'Screenshot pending',
    },
    labs: {
      eyebrow: '↘ Playground',
      heading: 'LABS',
      desc: 'Three loose experiments: a hover dock, a Canvas 404 and a menu that opens and closes. No frameworks, just HTML, CSS and JS.',
      open: 'Open',
    },
    services: {
      eyebrow: '↘ What I do',
      heading: 'WHAT I DO',
      statNum: '10+',
      statLabel: 'projects taken from idea to production',
      body: "I've spent years crafting experiences — first live, now in the browser. The web is just another stage to put on the show.",
    },
    stack: {
      eyebrow: '↘ Toolbox',
      heading: 'STACK',
      desc: "The tools I build with. I pick whatever makes the work fast, accessible and easy to maintain — not whatever's trending.",
      groups: [
        {
          label: 'Frontend',
          items: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'Modern CSS', 'GSAP', 'Canvas'],
        },
        { label: 'Backend', items: ['Node.js', 'PHP', 'MySQL', 'REST APIs'] },
        { label: 'Tooling', items: ['Git', 'Docker', 'Vite', 'Figma'] },
        { label: 'Tools/AI', items: ['Go', 'Bubble Tea', 'Ink', 'GJS', 'Claude Code', 'Agents'] },
      ],
    },
    about: {
      eyebrow: '↘ About',
      heading: 'BIO',
      headline: [
        'I used to run sound for ',
        { em: 'concerts, film and ad shoots' },
        ' in London. Today I bring that same precision to every interface I build.',
      ],
      p1: 'I like web development almost as much as arguing about the right order to watch Star Wars: taking a loose idea and turning it into a page that loads fast and makes sense the first time. I come from live work —concerts, shoots— where there are no second takes, and that habit of getting things right on the spot stuck with me.',
      p2: 'I build frontend with HTML, CSS and JavaScript, keeping an eye on performance, accessibility and SEO without acting like some kind of guru. What matters to me: the site runs smooth and the code still makes sense when I come back to it months later. From Málaga, mostly remote.',
      p3: "Live work left me with a distrust of 'it'll be fine'. On stage there are no second takes; in code the equivalent is tests. That's why, besides websites, I now build terminal tools, games and AI agents, and the ones that matter come with tests.",
      collage: ['Live sound console', 'Stage during load-in', 'TV studio set before a show'],
      stats: [
        {
          seq: [6, 7, 8, 1, 2, 3, 9, 10, 11],
          label: 'My Star Wars watch order',
        },
        { num: 10, count: true, label: 'Cities visited this year' },
        { num: 23957, count: true, label: 'Minutes of music on Spotify' },
        { num: 'MLG', label: 'Based in Málaga, remote' },
      ],
    },
    contact: {
      kicker: '↘ Open line',
      title: ["LET'S", { br: true }, { span: 'talk' }],
      sub: 'Got something you want to build, or just want to say hi? Write to me directly.',
      btn: 'Transmit message',
    },
    footer: {
      nav: { work: 'Work', tools: 'Tools', labs: 'Labs', about: 'About', contact: 'Contact' },
      colA: { label: 'Write me' },
      colB: { label: 'Where', lines: ['Málaga / Spain', 'Remote too'] },
      colC: { label: 'Social' },
      word1: 'FRONTEND',
      word2: 'DEVELOPER',
      graffiti1: 'Hand',
      graffiti2: 'made',
      legal: '© 2026 — Fernando Pinilla · Málaga, ES',
      builtWith: 'Aesthetic: Mammoth Style',
    },
  },
}
