import { useEffect, useState } from 'react'
import Rich from './Rich'
import { PROJECTS_COMMON, PROJECT_COPY, TOOLS_COMMON, TOOL_COPY } from '../data/index'
import { useLang, useT } from '../store'

const STEP_MS = 1200

export default function Hero() {
  const t = useT()
  const lang = useLang()
  // newest first: tools are appended over time, projects are already listed newest first
  const frames = [
    ...TOOLS_COMMON.filter((tool) => tool.shot)
      .reverse()
      .map((tool) => ({ id: tool.id, src: tool.shot ?? '', alt: TOOL_COPY[lang][tool.id].title })),
    ...PROJECTS_COMMON.map((p) => ({ id: p.id, src: p.shots[0], alt: PROJECT_COPY[lang][p.id].title })),
  ]
  const [active, setActive] = useState(0)
  const count = frames.length
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // exactly one frame is active at any time, so the card can never show the black backdrop
    const id = setInterval(() => setActive((i) => (i + 1) % count), STEP_MS)
    return () => clearInterval(id)
  }, [count])
  return (
    <header className="hero" id="top">
      <div className="hero__inner">
        <div>
          <div className="hero__eyebrow">{t.hero.eyebrow}</div>
          <h1 className="hero__title">
            <Rich parts={t.hero.title} />
          </h1>
        </div>
        <div className="hero__bottom">
          <div className="hero__bottom-left">
            <p className="hero__sub">{t.hero.sub}</p>
            <div className="hero__buttons">
              <a className="btn-primary" href="#work">
                {t.hero.btnPrimary} <span>→</span>
              </a>
              <a className="btn-secondary" href="#contact">
                {t.hero.btnSecondary}
              </a>
            </div>
          </div>
          <div className="hero__card">
            <div className="hero__card-thumb">
              {frames.map((f, i) => (
                <div className={'hero__card-shot' + (i === active ? ' is-active' : '')} key={f.id}>
                  {/* stacked above the fold: only the first frame is visible at rest, so it gets priority */}
                  <img src={f.src} alt={f.alt} fetchpriority={i === 0 ? 'high' : 'low'} decoding="async" />
                </div>
              ))}
              <div className="hero__card-label">
                <span className="hero__card-now">
                  <span className="status-dot"></span>
                  {t.hero.cardNow}
                </span>
                <span className="hero__card-tag">{t.hero.cardTag}</span>
              </div>
            </div>
            <p className="hero__card-cap">{t.hero.cardCaption}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
