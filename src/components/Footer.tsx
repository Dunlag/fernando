import { CONTACT, CV_URL } from '../data/index'
import { useStore, useT } from '../store'

export default function Footer() {
  const t = useT()
  const openCv = useStore((s) => s.openCv)
  const f = t.footer
  return (
    <footer className="footer">
      <div className="footer__top">
        <ul className="footer__top-nav">
          <li>
            <a href="#work">{f.nav.work}</a>
          </li>
          <li>
            <a href="#labs">{f.nav.labs}</a>
          </li>
          <li>
            <a href="#about">{f.nav.about}</a>
          </li>
          <li>
            <a
              href={CV_URL}
              onClick={(e) => {
                e.preventDefault()
                openCv()
              }}
            >
              {t.cv.tab}
            </a>
          </li>
          <li>
            <a href="#contact">{f.nav.contact}</a>
          </li>
        </ul>
      </div>
      <div className="footer__info">
        <div className="footer__info-col">
          <span className="footer__info-label">{f.colA.label}</span>
          <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>
        </div>
        <div className="footer__info-col footer__info-col--center">
          <span className="footer__info-label">{f.colB.label}</span>
          {f.colB.lines.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
        <div className="footer__info-col footer__info-col--right">
          <span className="footer__info-label">{f.colC.label}</span>
          <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="footer__graffiti">
          <span className="footer__graffiti-text">{f.graffiti1}</span>
          <span className="footer__graffiti-text footer__graffiti-text--2">{f.graffiti2}</span>
        </div>
        <div className="footer__wordmark-row">
          <span className="footer__word" data-fit="16">
            {f.word1}
          </span>
        </div>
        <div className="footer__wordmark-row">
          <span className="footer__word" data-fit="16">
            {f.word2}
          </span>
        </div>
      </div>
      <div className="footer__legal">
        <span>{f.legal}</span>
        <span>{f.builtWith}</span>
      </div>
    </footer>
  )
}
