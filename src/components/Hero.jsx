import Rich from './Rich'

export default function Hero({ t, variant = 'a' }) {
  return (
    <header className="hero" id="top" data-variant={variant}>
      <div className="hero__inner">
        <div>
          <div className="hero__eyebrow">{t.hero.eyebrow}</div>
          <h1 className="hero__title"><Rich parts={t.hero.title} /></h1>
        </div>
        <div className="hero__bottom">
          <div className="hero__bottom-left">
            <p className="hero__sub">{t.hero.sub}</p>
            <div className="hero__buttons">
              <a className="btn-primary" href="#work">{t.hero.btnPrimary} <span>→</span></a>
              <a className="btn-secondary" href="#contact">{t.hero.btnSecondary}</a>
            </div>
          </div>
          <div className="hero__card">
            <div className="hero__card-thumb">
              <img
                src="https://dunlag.github.io/Two-Black-Cats/assets/preview.jpg"
                alt="Two Black Cats — proyecto reciente"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="hero__card-label">
                <span className="hero__card-now"><span className="status-dot"></span>{t.hero.cardNow}</span>
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
