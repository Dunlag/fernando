import { useState } from 'react'
import { useScrollHide } from '../hooks/useScrollHide'

export default function Navbar({ t, lang, setLang }) {
  const hidden = useScrollHide()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <nav className={'navbar' + (hidden ? ' navbar--hidden' : '')}>
      <a className="navbar__logo" href="#top">FERNANDO·P</a>
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
        <a className="navbar__cta" href="#contact"><span className="status-dot"></span>{t.cta}</a>
        <button
          className={'navbar__burger' + (open ? ' is-open' : '')}
          aria-label="Menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {open && (
        <div className="navbar__mobile-menu" onClick={close}>
          <a href="#work" onClick={close}>{t.nav.work}</a>
          <a href="#labs" onClick={close}>{t.nav.labs}</a>
          <a href="#about" onClick={close}>{t.nav.about}</a>
          <a href="#contact" onClick={close}>{t.nav.contact}</a>
        </div>
      )}
    </nav>
  )
}
