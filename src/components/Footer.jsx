export default function Footer({ t }) {
  const f = t.footer
  return (
    <footer className="footer">
      <div className="footer__top">
        <ul className="footer__top-nav">
          <li><a href="#work">{f.nav.work}</a></li>
          <li><a href="#labs">{f.nav.labs}</a></li>
          <li><a href="#about">{f.nav.about}</a></li>
          <li><a href="#contact">{f.nav.contact}</a></li>
        </ul>
      </div>
      <div className="footer__info">
        <div className="footer__info-col">
          <span className="footer__info-label">{f.colA.label}</span>
          {f.colA.lines.map((l, i) => <a key={i} href="mailto:fernando.pinilla85@gmail.com">{l}</a>)}
        </div>
        <div className="footer__info-col footer__info-col--center" style={{ display: 'block', textAlign: 'center' }}>
          <span className="footer__info-label">{f.colB.label}</span>
          {f.colB.lines.map((l, i) => <p key={i}>{l}</p>)}
        </div>
        <div className="footer__info-col footer__info-col--right">
          <span className="footer__info-label">{f.colC.label}</span>
          {f.colC.links.map(([label, href], i) => <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__graffiti">
          <span className="footer__graffiti-text">{f.graffiti1}</span>
          <span className="footer__graffiti-text footer__graffiti-text--2">{f.graffiti2}</span>
        </div>
        <div className="footer__wordmark-row"><span className="footer__word" data-fit="16">{f.word1}</span></div>
        <div className="footer__wordmark-row"><span className="footer__word" data-fit="16">{f.word2}</span></div>
      </div>
      <div className="footer__legal">
        <span>{f.legal}</span>
        <span>{f.builtWith}</span>
      </div>
    </footer>
  )
}
