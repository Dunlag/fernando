import Rich from './Rich'
import { CONTACT } from '../data/index'

export default function Cta({ t }) {
  const mail = 'mailto:' + CONTACT.email
  return (
    <section className="section-cta" id="contact">
      <div className="section-cta__kicker">{t.contact.kicker}</div>
      <h2 className="section-cta__title">
        <Rich parts={t.contact.title} />
      </h2>
      <p className="section-cta__sub">{t.contact.sub}</p>
      <a className="section-cta__btn" href={mail + '?subject=' + encodeURIComponent(t.mailSubject)}>
        <span>{t.contact.btn}</span>
        <svg
          width="22"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10h12M12 6l4 4-4 4" />
        </svg>
      </a>
      <div className="section-cta__alt">
        <a href={mail}>{CONTACT.email}</a>
        <a href={CONTACT.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  )
}
