import Rich from './Rich'
import { PROJECTS_COMMON, PROJECT_COPY } from '../data/index'
import { useLang, useT } from '../store'

const FEATURED = PROJECTS_COMMON.find((p) => p.featured) ?? PROJECTS_COMMON[0]
// Sorted by filename so the "00" frame shows first here (the Work card leads with "01")
const SHOTS = [...FEATURED.shots].sort()

export default function Featured() {
  const t = useT()
  const lang = useLang()
  const title = PROJECT_COPY[lang][FEATURED.id].title
  return (
    <section className="featured">
      <div className="featured__frame">
        <div className="featured__shots">
          {SHOTS.map((src, i) => (
            <div className="featured__shot" key={src}>
              <img src={src} alt={title + ' · screenshot ' + (i + 1)} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
      </div>
      <div className="featured__caption">
        <div className="featured__caption-left">
          <h2 className="featured__title">
            <Rich parts={t.featured.title} />
          </h2>
        </div>
        <div className="featured__meta">
          <div className="featured__meta-lines">
            {t.featured.meta.map((m, i) => (
              <div key={i}>{m}</div>
            ))}
          </div>
          <a
            className="btn-primary featured__cta"
            href={FEATURED.url ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.featured.cta} <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
