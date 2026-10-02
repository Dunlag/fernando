import Rich from './Rich'
import {
  PROJECTS_COMMON,
  PROJECT_COPY,
  CONTACT,
  type Copy,
  type ItemCopy,
  type Lang,
  type Project,
} from '../data/index'

function WorkCard({ p, copy, t }: { p: Project; copy: ItemCopy; t: Copy }) {
  return (
    <article className="work-card">
      {/* stretched link: covers the card so the repo chip can be its own link (no nested <a>) */}
      {p.url && (
        <a className="work-card__link" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={copy.title} />
      )}
      <div className="work-card__media">
        <span className="work-card__ref">{p.comingSoon ? t.work.soon : 'REF ' + p.ref}</span>
        <div className={'work-card__shots work-card__shots--' + p.shots.length}>
          {p.shots.map((src, i) => (
            <div className="work-card__shot" key={i}>
              <img src={src} alt={copy.title + ' · screenshot ' + (i + 1)} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div className="work-card__duo"></div>
        <div className="work-card__scrim">
          <p>{copy.desc}</p>
        </div>
      </div>
      <div className="work-card__cap">
        <h3 className="work-card__title">{copy.title}</h3>
        <span className="work-card__year">{p.year}</span>
      </div>
      <div className="work-card__tags">
        {p.tags.map((tag, i) => (
          <span className="work-card__chip" key={i}>
            {tag}
          </span>
        ))}
        {p.repo && (
          <a className="work-card__chip work-card__chip--repo" href={p.repo} target="_blank" rel="noopener noreferrer">
            {t.work.code} ↗
          </a>
        )}
      </div>
    </article>
  )
}

export default function Work({ t, lang }: { t: Copy; lang: Lang }) {
  const copy = PROJECT_COPY[lang]
  return (
    <section className="section-work" id="work">
      <div className="work-header">
        <div className="work-heading-display" aria-hidden="true" data-fit="24" data-fit-vh="0.88">
          {t.work.heading}
        </div>
        <p className="work-header__text">
          <Rich parts={t.work.lead} />
        </p>
      </div>
      <div className="work-grid-wrapper">
        <div className="work-grid reveal">
          {PROJECTS_COMMON.map((p) => (
            <WorkCard key={p.id} p={p} copy={copy[p.id]} t={t} />
          ))}
        </div>
        <div className="work-cta">
          <span className="work-cta__label">
            {t.work.ctaLabel} <span className="work-cta__count">({PROJECTS_COMMON.length})</span>
          </span>
          <a className="btn-secondary" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            GitHub →
          </a>
        </div>
      </div>
    </section>
  )
}
