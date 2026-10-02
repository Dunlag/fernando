import { EXP_COMMON, PROJECT_COPY } from '../data/index'
import { useLang, useT } from '../store'

export default function Labs() {
  const t = useT()
  const lang = useLang()
  const copy = PROJECT_COPY[lang]
  return (
    <section className="section-labs" id="labs">
      <div className="labs-header">
        <div className="labs-header__left">
          <span className="eyebrow">{t.labs.eyebrow}</span>
          <h2 className="labs-heading">
            {t.labs.heading}
            <sup className="labs-heading__count">({EXP_COMMON.length})</sup>
          </h2>
        </div>
        <p className="labs-desc">{t.labs.desc}</p>
      </div>
      <div className="labs-mosaic reveal">
        {EXP_COMMON.map((e, i) => {
          const c = copy[e.id]
          return (
            <a
              className="lab-tile"
              key={e.id}
              href={e.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.title}
            >
              <span className="lab-tile__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="lab-tile__frame">
                <img src={e.thumb} alt={c.title} loading="lazy" decoding="async" />
              </div>
              <div className="lab-tile__duo" aria-hidden="true"></div>
              <div className="lab-tile__bar">
                <span className="lab-tile__title">{c.title}</span>
                <span className="lab-tile__stack">{e.stack}</span>
                <span className="lab-tile__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}
