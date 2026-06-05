import { SERVICES } from '../data/index'

export default function Services({ t, lang }) {
  const items = SERVICES[lang]
  return (
    <section className="section-services" id="services">
      <div className="services-header">
        <div>
          <span className="eyebrow">{t.services.eyebrow}</span>
          <h2 className="section-heading section-heading--outline">{t.services.heading}</h2>
        </div>
        <div className="services-stat">
          <div className="services-stat__num">{t.services.statNum}</div>
          <div className="services-stat__label">{t.services.statLabel}</div>
        </div>
      </div>
      <p className="services-body">{t.services.body}</p>
      <ul className="service-list reveal">
        {items.map((s) => (
          <li className="service-item" key={s.num}>
            <span className="service-item__num">{s.num}</span>
            <span className="service-item__name">{s.name}</span>
            <span className="service-item__desc">{s.desc}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
