import Rich from './Rich'
import { PROJECTS_COMMON, PROJECT_COPY } from '../data/index'
import { useLang, useT } from '../store'

export default function Hero() {
  const t = useT()
  const lang = useLang()
  const copy = PROJECT_COPY[lang]
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
              {PROJECTS_COMMON.map((p, i) => (
                <div className="hero__card-shot" key={p.id}>
                  {/* stacked above the fold: only the first frame is visible at rest, so it gets priority */}
                  <img
                    src={p.shots[0]}
                    alt={copy[p.id].title}
                    fetchpriority={i === 0 ? 'high' : 'low'}
                    decoding="async"
                  />
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
