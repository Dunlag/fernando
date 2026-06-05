import { useScrollHide } from '../hooks/useScrollHide'

export default function Navbar({ t, lang, setLang }) {
  const hidden = useScrollHide()
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
      </div>
    </nav>
  )
}
