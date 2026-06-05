import { gsap } from 'gsap'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = window.matchMedia('(pointer:fine)').matches
let heroDone = false

/* ---------- PRELOADER ---------- */
function runPreloader(onDone) {
  const pre = document.getElementById('preloader')
  if (!pre) { onDone(); return }
  document.body.classList.add('preloading')
  const countEl = pre.querySelector('.preloader__count')
  const barEl = pre.querySelector('.preloader__bar')

  function finish() {
    document.body.classList.remove('preloading')
    onDone()
    gsap.to(pre, {
      yPercent: -100, duration: 0.75, ease: 'power4.inOut', delay: 0.15,
      onComplete: () => pre.remove(),
    })
  }

  if (reduce) {
    if (countEl) countEl.textContent = '100'
    if (barEl) barEl.style.width = '100%'
    setTimeout(finish, 250)
    return
  }

  const obj = { v: 0 }
  gsap.to(obj, {
    v: 100, duration: 1.5, ease: 'power2.inOut',
    onUpdate() {
      const n = Math.round(obj.v)
      if (countEl) countEl.textContent = String(n).padStart(3, '0')
      if (barEl) barEl.style.width = n + '%'
    },
    onComplete: finish,
  })
}

/* ---------- CUSTOM CURSOR ---------- */
function initCursor() {
  if (reduce || !fine) return
  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  const label = document.createElement('span')
  label.className = 'cursor-dot__label'
  dot.appendChild(label)
  document.body.appendChild(dot)
  document.documentElement.classList.add('has-cursor')

  gsap.set(dot, { xPercent: -50, yPercent: -50, x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const xTo = gsap.quickTo(dot, 'x', { duration: 0.13, ease: 'power3' })
  const yTo = gsap.quickTo(dot, 'y', { duration: 0.13, ease: 'power3' })
  window.addEventListener('pointermove', (e) => { xTo(e.clientX); yTo(e.clientY) }, { passive: true })

  const GROW = 'a,button,.lab-tile,img,input,textarea,[data-cursor]'
  document.addEventListener('pointerover', (e) => {
    const t = e.target
    const card = t.closest && t.closest('.work-card')
    if (card) {
      label.textContent = (window.__lang === 'en' ? 'VIEW' : 'VER') + ' →'
      dot.classList.add('cursor-dot--view')
      dot.classList.remove('cursor-dot--big')
    } else if (t.closest && t.closest(GROW)) {
      dot.classList.add('cursor-dot--big')
    }
  })
  document.addEventListener('pointerout', (e) => {
    const t = e.target, rel = e.relatedTarget
    const card = t.closest && t.closest('.work-card')
    if (card && !(rel && card.contains(rel))) dot.classList.remove('cursor-dot--view')
    else if (t.closest && t.closest(GROW) && !(rel && rel.closest && rel.closest(GROW)))
      dot.classList.remove('cursor-dot--big')
  })
  window.addEventListener('pointerdown', () => dot.classList.add('cursor-dot--down'))
  window.addEventListener('pointerup', () => dot.classList.remove('cursor-dot--down'))
  document.addEventListener('mouseleave', () => gsap.to(dot, { opacity: 0, duration: 0.2 }))
  document.addEventListener('mouseenter', () => gsap.to(dot, { opacity: 1, duration: 0.2 }))
}

/* ---------- SCROLL PROGRESS ---------- */
function initProgress() {
  if (!fine) return
  const bar = document.createElement('div')
  bar.id = 'scroll-progress'
  document.body.appendChild(bar)
  let ticking = false
  function update() {
    const el = document.scrollingElement || document.documentElement
    const max = el.scrollHeight - el.clientHeight
    bar.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 0) + '%'
    ticking = false
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update) } }, { passive: true })
  update()
}

/* ---------- HERO ENTRANCE ---------- */
function heroIntro(attempt = 0) {
  if (heroDone) return
  const title = document.querySelector('.hero__title')
  if (!title) {
    if (attempt < 12) setTimeout(() => heroIntro(attempt + 1), 140)
    return
  }
  heroDone = true
  if (reduce) return
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  gsap.set('.hero__eyebrow,.hero__title,.hero__sub,.hero__buttons > *,.hero__card', { opacity: 0 })
  tl.from('.hero__eyebrow', { y: 18, duration: 0.5 })
    .from('.hero__title', { yPercent: 16, duration: 0.85 }, '-=0.18')
    .from('.hero__sub', { y: 22, duration: 0.55 }, '-=0.5')
    .from('.hero__buttons > *', { y: 18, duration: 0.45, stagger: 0.08 }, '-=0.35')
    .from('.hero__card', { y: 26, duration: 0.55 }, '-=0.5')
    .set(['.hero__eyebrow', '.hero__title', '.hero__sub', '.hero__buttons > *', '.hero__card'], { clearProps: 'opacity,transform' })
}

export function boot() {
  initProgress()
  initCursor()
  runPreloader(() => heroIntro(0))
  setTimeout(() => heroIntro(0), 2600)
}

window.Enhance = {
  refresh(lang) {
    if (lang) window.__lang = lang
  },
}
