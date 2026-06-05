import { useRef, useState, useEffect } from 'react'
import Rich from './Rich'

function useInView(ref, threshold = 0.45) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return inView
}

function CountUp({ to, locale, inView, duration }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return }
    let raf, start
    const dur = duration || (to > 1000 ? 1900 : 1200)
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min(1, (ts - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(to * eased))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView])
  return <>{val.toLocaleString(locale || 'es-ES')}</>
}

function SeqReveal({ seq, inView, step = 380 }) {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(seq.length); return }
    let i = 0; setShown(0)
    const id = setInterval(() => {
      i += 1; setShown(i)
      if (i >= seq.length) clearInterval(id)
    }, step)
    return () => clearInterval(id)
  }, [inView])
  return (
    <span className="about__seq">
      {seq.map((n, i) => (
        <span key={i} className={'about__seq-n' + (i < shown ? ' is-on' : '')}>{n}</span>
      ))}
    </span>
  )
}

function AnimatedStat({ s, locale }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  return (
    <div className={'about__stat' + (s.seq ? ' about__stat--seq' : '')} ref={ref}>
      <div className="about__stat-num">
        {s.seq
          ? <SeqReveal seq={s.seq} inView={inView} />
          : s.count
            ? <CountUp to={s.num} locale={locale} inView={inView} />
            : s.num}
      </div>
      <div className="about__stat-label">{s.label}</div>
    </div>
  )
}

export default function About({ t }) {
  const locale = t.dir === 'EN' ? 'en-US' : 'es-ES'
  return (
    <section className="section-about" id="about">
      <div className="about__top">
        <span className="eyebrow">{t.about.eyebrow}</span>
        <h2 className="about__headline"><Rich parts={t.about.headline} /></h2>
      </div>
      <div className="about__body">
        <div className="about__left">
          <div className="about__collage">
            <div className="about__frame about__frame--1">
              <img src="https://picsum.photos/seed/fp-c1/640/480" alt="Setup de sonido en directo" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="about__frame about__frame--2">
              <img src="https://picsum.photos/seed/fp-c2/480/640" alt="Fernando en acción" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="about__frame about__frame--3">
              <img src="https://picsum.photos/seed/fp-c3/560/560" alt="Detalle de proyecto" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
          <div className="about__text">
            <p className="about__p">{t.about.p1}</p>
            <p className="about__p">{t.about.p2}</p>
            <div className="about__stats">
              {t.about.stats.map((s, i) => (
                <AnimatedStat key={i} s={s} locale={locale} />
              ))}
            </div>
          </div>
        </div>
        <div className="about__right">
          <div className="about__media">
            <img src="https://picsum.photos/seed/fp-portrait/640/800" alt="Fernando Pinilla" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="about__media-cap">{t.about.mediaCap}</div>
        </div>
      </div>
    </section>
  )
}
