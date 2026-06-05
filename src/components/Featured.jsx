import Rich from './Rich'

const SHOTS = [
  { src: '/fernando/assets/two-black-cats.png', alt: 'Two Black Cats — screenshot 1' },
  { src: 'https://picsum.photos/seed/fpf-2/1894/1077', alt: 'Two Black Cats — screenshot 2' },
  { src: 'https://picsum.photos/seed/fpf-3/1894/1077', alt: 'Two Black Cats — screenshot 3' },
]

export default function Featured({ t }) {
  return (
    <section className="featured">
      <div className="featured__frame">
        <div className="featured__shots">
          {SHOTS.map((s, i) => (
            <div className="featured__shot" key={i}>
              <img src={s.src} alt={s.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="featured__caption">
        <div className="featured__caption-left">
          <h2 className="featured__title"><Rich parts={t.featured.title} /></h2>
        </div>
        <div className="featured__meta">
          <div className="featured__meta-lines">
            {t.featured.meta.map((m, i) => <div key={i}>{m}</div>)}
          </div>
          <a className="btn-primary featured__cta" href="https://dunlag.github.io/Two-Black-Cats/" target="_blank" rel="noopener noreferrer">
            {t.featured.cta} <span>→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
