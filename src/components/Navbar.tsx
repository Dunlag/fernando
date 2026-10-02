import { useState } from 'react'
import { useScrollHide } from '../hooks/useScrollHide'
import { CONTACT, CV_URL } from '../data/index'
import { useLang, useStore, useT } from '../store'

export default function Navbar() {
  const t = useT()
  const lang = useLang()
  const setLang = useStore((s) => s.setLang)
  const openCv = useStore((s) => s.openCv)
  const hidden = useScrollHide()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className={'navbar' + (hidden && !open ? ' navbar--hidden' : '')}>
        <a className="navbar__logo" href="#top" onClick={close}>
          FERNANDO·P
        </a>
        <ul className="navbar__nav">
          <li>
            <a href="#work">{t.nav.work}</a>
          </li>
          <li>
            <a href="#labs">{t.nav.labs}</a>
          </li>
          <li>
            <a href="#about">{t.nav.about}</a>
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
            <a href="#contact">{t.nav.contact}</a>
          </li>
        </ul>
        <div className="navbar__right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'es' ? 'is-active' : ''} onClick={() => setLang('es')}>
              ES
            </button>
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
              EN
            </button>
          </div>
          <a className="navbar__cta navbar__cta--desktop" href="#contact">
            <span className="status-dot"></span>
            {t.cta}
          </a>
          <button
            className="navbar__menu-btn"
            aria-label={open ? t.menu.close : t.menu.open}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'CLOSE -' : 'MENU +'}
          </button>
        </div>
      </nav>

      {/* inert="" (not a boolean): React 18 drops inert={true} */}
      <div className={'navbar__mobile-panel' + (open ? ' is-open' : '')} inert={open ? undefined : ''}>
        <nav className="navbar__mobile-nav">
          <a href="#work" onClick={close}>
            {t.nav.work}
          </a>
          <a href="#labs" onClick={close}>
            {t.nav.labs}
          </a>
          <a href="#about" onClick={close}>
            {t.nav.about}
          </a>
          <a
            href={CV_URL}
            onClick={(e) => {
              e.preventDefault()
              close()
              openCv()
            }}
          >
            {t.cv.tab}
          </a>
          <a href="#contact" onClick={close}>
            {t.nav.contact}
          </a>
        </nav>
        <div className="navbar__mobile-foot">
          <a href={'mailto:' + CONTACT.email} onClick={close}>
            {CONTACT.email}
          </a>
          <span>{t.footer.colB.lines.join(' · ')}</span>
          <div className="navbar__mobile-socials">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" onClick={close}>
              GitHub
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" onClick={close}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
