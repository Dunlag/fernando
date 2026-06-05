export default function Stack({ t, styleVariant = 'stickers' }) {
  const s = t.stack
  const cls = 'section-stack' + (styleVariant === 'stickers' ? ' section-stack--stickers' : '')
  return (
    <section className={cls} id="stack">
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
              <span className="stack-group__bullet"></span>{g.label}
            </div>
            <ul className="stack-grid reveal reveal--stagger">
              {g.items.map((item, i) => (
                <li className="stack-tile" key={item} style={{ '--n': i }}>
                  <span className="stack-tile__name">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
