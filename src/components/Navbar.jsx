import { useState } from 'react'
import { useScrollHide } from '../hooks/useScrollHide'

export default function Navbar({ t, lang, setLang }) {
  const hidden = useScrollHide()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <nav className={'navbar' + (hidden && !open ? ' navbar--hidden' : '')}>
        <a className="navbar__logo" href="#top" onClick={close}>FERNANDO·P</a>
        <ul className="navbar__nav">
          <li><a href="#work">{t.nav.work}</a></li>
          <li><a href="#labs">{t.nav.labs}</a></li>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
        <div className="navbar__right">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'es' ? 'is-active' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="navbar__cta navbar__cta--desktop" href="#contact"><span className="status-dot"></span>{t.cta}</a>
          <button
            className="navbar__menu-btn"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'CLOSE -' : 'MENU +'}
          </button>
        </div>
      </nav>

      <div className={'navbar__mobile-panel' + (open ? ' is-open' : '')} aria-hidden={!open}>
        <nav className="navbar__mobile-nav">
          <a href="#work" onClick={close}>{t.nav.work}</a>
          <a href="#labs" onClick={close}>{t.nav.labs}</a>
          <a href="#about" onClick={close}>{t.nav.about}</a>
          <a href="#contact" onClick={close}>{t.nav.contact}</a>
        </nav>
        <div className="navbar__mobile-foot">
          <a href="mailto:fernando.pinilla85@gmail.com" onClick={close}>fernando.pinilla85@gmail.com</a>
          <span>Málaga / España · En remoto</span>
          <div className="navbar__mobile-socials">
            <a href="https://github.com/Dunlag" target="_blank" rel="noopener noreferrer" onClick={close}>GitHub</a>
            <a href="https://linkedin.com/in/fernandopinillavalbuena" target="_blank" rel="noopener noreferrer" onClick={close}>LinkedIn</a>
          </div>
        </div>
      </div>
    </>
  )
}
