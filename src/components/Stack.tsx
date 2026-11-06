import type { CSSProperties } from 'react'
import { useT } from '../store'

export default function Stack() {
  const t = useT()
  const s = t.stack
  return (
    <section className="section-stack section-stack--stickers" id="stack">
      <div className="stack__header">
        <div>
          <span className="eyebrow eyebrow--invert">{s.eyebrow}</span>
          <h2 className="section-heading stack__heading">{s.heading}</h2>
        </div>
        <p className="stack__desc">{s.desc}</p>
      </div>
      <div className="stack__groups">
        {s.groups.map((g) => (
          <div className="stack-group" key={g.label}>
            <div className="stack-group__label">
              <span className="stack-group__bullet"></span>
              {g.label}
            </div>
            <ul className="stack-grid reveal reveal--stagger">
              {g.items.map((item, i) => {
                const name = typeof item === 'string' ? item : item.name
                return (
                  <li className="stack-tile" key={name} style={{ '--n': i } as CSSProperties}>
                    {typeof item === 'string' ? (
                      <span className="stack-tile__name">{name}</span>
                    ) : (
                      <a
                        className="stack-tile__name stack-tile__link"
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {name} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
