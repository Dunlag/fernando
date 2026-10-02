import { useEffect, useRef, useState } from 'react'
import { useLang } from './hooks/useLang'
import { useFitText } from './hooks/useFitText'
import { DATA, ACCENTS } from './data/index'
import { MenuAnims } from './lib/menu-anim'
import Navbar from './components/Navbar'
import CvTab from './components/CvTab'
import CvModal from './components/CvModal'
import Hero from './components/Hero'
import Featured from './components/Featured'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Labs from './components/Labs'
import Services from './components/Services'
import Stack from './components/Stack'
import About from './components/About'
import Cta from './components/Cta'
import Footer from './components/Footer'

export default function App() {
  const [lang, setLang] = useLang()
  const data = DATA[lang]
  const [cvOpen, setCvOpen] = useState(false)
  const cvTabRef = useRef<HTMLButtonElement>(null)
  const openCv = () => setCvOpen(true)

  // Random accent on mount — never repeat the previous one
  useEffect(() => {
    let last: string | null = null
    try {
      last = localStorage.getItem('fp_last_accent')
    } catch {}
    const pool = ACCENTS.filter((c) => c !== last)
    const pick = pool[Math.floor(Math.random() * pool.length)] || ACCENTS[0]
    try {
      localStorage.setItem('fp_last_accent', pick)
    } catch {}
    document.documentElement.style.setProperty('--c-yellow', pick)
  }, [])

  // Fit display words to full width
  useFitText([lang])

  // 3D tilt on hero title and work header
  useEffect(() => {
    const targets = [
      { zone: '.section-cta', el: '.section-cta__title', max: 30 },
      { zone: '.work-header', el: '.work-header__text', max: 24 },
    ]
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups: (() => void)[] = []
    targets.forEach(({ zone, el, max }) => {
      const z = document.querySelector<HTMLElement>(zone)
      const e = document.querySelector<HTMLElement>(el)
      if (!z || !e) return
      if (reduce) {
        e.style.transform = ''
        return
      }
      e.style.transition = 'transform 0.32s ease-out'
      e.style.transformOrigin = 'center'
      e.style.willChange = 'transform'
      const move = (ev: PointerEvent) => {
        const r = z.getBoundingClientRect()
        const px = (ev.clientX - r.left) / r.width - 0.5
        const py = (ev.clientY - r.top) / r.height - 0.5
        e.style.transform = `perspective(650px) rotateX(${(py * max).toFixed(2)}deg) rotateY(${(-px * max).toFixed(2)}deg)`
      }
      const leave = () => {
        e.style.transform = 'perspective(650px) rotateX(0deg) rotateY(0deg)'
      }
      z.addEventListener('pointermove', move)
      z.addEventListener('pointerleave', leave)
      cleanups.push(() => {
        z.removeEventListener('pointermove', move)
        z.removeEventListener('pointerleave', leave)
        e.style.transform = ''
        e.style.transition = ''
        e.style.willChange = ''
      })
    })
    return () => cleanups.forEach((c) => c())
  }, [lang])

  // SplitText menu animations — re-init on lang change
  useEffect(() => {
    const navTexts = [data.nav.work, data.nav.labs, data.nav.about, data.cv.tab, data.nav.contact]
    const f = data.footer.nav
    const footerTexts = [f.work, f.labs, f.about, data.cv.tab, f.contact]
    const id = requestAnimationFrame(() => MenuAnims.init(navTexts, footerTexts))
    if (document.fonts?.ready) document.fonts.ready.then(() => MenuAnims.init(navTexts, footerTexts))
    return () => {
      cancelAnimationFrame(id)
      MenuAnims.destroy()
    }
  }, [data])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [lang])

  return (
    <>
      <Navbar t={data} lang={lang} setLang={setLang} onOpenCv={openCv} />
      <CvTab t={data} ref={cvTabRef} onOpenCv={openCv} />
      <CvModal t={data} open={cvOpen} onClose={() => setCvOpen(false)} originRef={cvTabRef} />
      <Hero t={data} lang={lang} />
      <Featured t={data} lang={lang} />
      <Marquee t={data} />
      <Work t={data} lang={lang} />
      <Labs t={data} lang={lang} />
      <Services t={data} lang={lang} />
      <Stack t={data} />
      <About t={data} />
      <Cta t={data} />
      <Footer t={data} onOpenCv={openCv} />
    </>
  )
}
