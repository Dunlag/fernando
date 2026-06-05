import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
let cleanups = []

function buildCell(host, text, topColor, botColor) {
  host.textContent = ''
  host.style.position = 'relative'
  host.style.display = 'inline-block'
  host.style.overflow = 'hidden'
  host.style.verticalAlign = 'top'
  host.style.lineHeight = 'normal'

  const inner = document.createElement('span')
  inner.className = 'mm-roll'
  inner.style.display = 'block'
  inner.style.position = 'relative'
  inner.style.lineHeight = 'normal'

  const a = document.createElement('span')
  a.className = 'mm-roll__a'
  a.style.display = 'block'
  a.style.lineHeight = 'normal'
  a.style.whiteSpace = 'pre'
  a.textContent = text
  if (topColor) a.style.color = topColor

  const b = document.createElement('span')
  b.className = 'mm-roll__b'
  b.style.display = 'block'
  b.style.lineHeight = 'normal'
  b.style.position = 'absolute'
  b.style.left = '0'
  b.style.top = '100%'
  b.style.whiteSpace = 'pre'
  b.textContent = text
  if (botColor) b.style.color = botColor

  inner.appendChild(a)
  inner.appendChild(b)
  host.appendChild(inner)
  return inner
}

function setupFooter(texts) {
  const links = document.querySelectorAll('.footer__top-nav a')
  links.forEach((link, i) => {
    if (texts && texts[i] != null) link.textContent = texts[i]
    const split = new SplitText(link, { type: 'chars', charsClass: 'mm-char' })
    const inners = []
    split.chars.forEach((ch) => {
      const tx = ch.textContent
      if (!tx || tx.trim() === '') return
      inners.push(buildCell(ch, tx))
    })
    if (!inners.length) return
    gsap.set(inners, { yPercent: 0 })

    const enter = () => gsap.to(inners, { yPercent: -100, duration: 0.5, ease: 'power3.out', overwrite: true, stagger: { each: 0.035, from: 'start' } })
    const leave = () => gsap.to(inners, { yPercent: 0, duration: 0.45, ease: 'power3.out', overwrite: true, stagger: { each: 0.03, from: 'end' } })

    link.addEventListener('mouseenter', enter)
    link.addEventListener('mouseleave', leave)
    cleanups.push(() => {
      link.removeEventListener('mouseenter', enter)
      link.removeEventListener('mouseleave', leave)
      try { split.revert() } catch (e) {}
    })
  })
}

function setupNav(texts) {
  const links = document.querySelectorAll('.navbar__nav a')
  links.forEach((link, i) => {
    if (texts && texts[i] != null) link.textContent = texts[i]
    link.style.position = 'relative'
    link.style.overflow = 'hidden'

    const split = new SplitText(link, { type: 'words', wordsClass: 'mm-word' })
    const inners = []
    split.words.forEach((w) => {
      const tx = w.textContent
      w.style.position = 'relative'
      w.style.zIndex = '1'
      inners.push(buildCell(w, tx, null, 'var(--c-white)'))
    })
    if (!inners.length) return

    const fill = document.createElement('span')
    fill.className = 'mm-navfill'
    link.insertBefore(fill, link.firstChild)
    gsap.set(fill, { scaleY: 0, transformOrigin: '50% 100%' })
    gsap.set(inners, { yPercent: 0 })

    const enter = () => {
      gsap.to(fill, { scaleY: 1, duration: 0.34, ease: 'power3.out', overwrite: true })
      gsap.to(inners, { yPercent: -100, duration: 0.44, ease: 'power3.out', overwrite: true, stagger: { each: 0.07, from: 'start' } })
    }
    const leave = () => {
      gsap.to(fill, { scaleY: 0, duration: 0.3, ease: 'power3.in', overwrite: true })
      gsap.to(inners, { yPercent: 0, duration: 0.38, ease: 'power3.out', overwrite: true, stagger: { each: 0.05, from: 'end' } })
    }

    link.addEventListener('mouseenter', enter)
    link.addEventListener('mouseleave', leave)
    cleanups.push(() => {
      link.removeEventListener('mouseenter', enter)
      link.removeEventListener('mouseleave', leave)
      try { split.revert() } catch (e) {}
      if (fill.parentNode) fill.parentNode.removeChild(fill)
      link.style.overflow = ''
      link.style.position = ''
    })
  })
}

export const MenuAnims = {
  destroy() {
    cleanups.forEach((fn) => { try { fn() } catch (e) {} })
    cleanups = []
  },
  init(navTexts, footerTexts) {
    this.destroy()
    if (reduce) return
    document.documentElement.classList.add('mm-anim')
    setupNav(navTexts)
    setupFooter(footerTexts)
  },
}

window.MenuAnims = MenuAnims
