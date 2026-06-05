import Rich from './Rich'
import { PROJECTS_COMMON, PROJECT_COPY } from '../data/index'

function WorkShots({ p, title }) {
  const n = p.comingSoon ? 1 : 3
  return (
    <div className={'work-card__shots work-card__shots--' + n}>
      {Array.from({ length: n }, (_, i) => (
        <div className="work-card__shot" key={i}>
          <img
            src={'https://picsum.photos/seed/fpw-' + p.id + '-' + (i + 1) + '/800/600'}
            alt={title + ' · screenshot ' + (i + 1)}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      ))}
    </div>
  )
}

function WorkCard({ p, copy, t, variant }) {
  const url = p.url
  const Tag = url ? 'a' : 'div'
  const linkProps = url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {}

  if (variant === 'b') {
    return (
      <Tag className="work-card" {...linkProps}>
        <div className="work-card__media">
          <span className="work-card__ref">{p.comingSoon ? t.work.soon : 'REF ' + p.ref}</span>
          <WorkShots p={p} title={copy.title} />
          <div className="work-card__duo"></div>
        </div>
        <div className="work-card__body">
          <span className="work-card__bignum">{p.comingSoon ? '—' : p.ref}</span>
          <div className="work-card__cap">
            <h3 className="work-card__title">{copy.title}</h3>
            <span className="work-card__year">{p.year}</span>
          </div>
          <p className="work-card__rowdesc">{copy.desc}</p>
          <div className="work-card__tags">
            {p.tags.map((tag, i) => <span className="work-card__chip" key={i}>{tag}</span>)}
          </div>
        </div>
      </Tag>
    )
  }

  return (
    <Tag className="work-card" {...linkProps}>
      <div className="work-card__media">
        <span className="work-card__ref">{p.comingSoon ? t.work.soon : 'REF ' + p.ref}</span>
        <WorkShots p={p} title={copy.title} />
        <div className="work-card__duo"></div>
        <div className="work-card__scrim"><p>{copy.desc}</p></div>
      </div>
      <div className="work-card__cap">
        <h3 className="work-card__title">{copy.title}</h3>
        <span className="work-card__year">{p.year}</span>
      </div>
      <div className="work-card__tags">
        {p.tags.map((tag, i) => <span className="work-card__chip" key={i}>{tag}</span>)}
      </div>
    </Tag>
  )
}

export default function Work({ t, lang, variant = 'a' }) {
  const copy = PROJECT_COPY[lang]
  return (
    <section className="section-work" id="work">
      <div className="work-header">
        <div className="work-heading-display" aria-hidden="true" data-fit="24" data-fit-vh="0.88">{t.work.heading}</div>
        <p className="work-header__text"><Rich parts={t.work.lead} /></p>
      </div>
      <div className="work-grid-wrapper">
        <div className="work-grid reveal" data-variant={variant}>
          {PROJECTS_COMMON.map((p) => (
            <WorkCard key={p.id} p={p} copy={copy[p.id]} t={t} variant={variant} />
          ))}
        </div>
        <div className="work-cta">
          <span className="work-cta__label">{t.work.ctaLabel} <span className="work-cta__count">({PROJECTS_COMMON.length})</span></span>
          <a className="btn-secondary" href="https://github.com/Dunlag" target="_blank" rel="noopener noreferrer">GitHub →</a>
        </div>
      </div>
    </section>
  )
}
