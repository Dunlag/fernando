import { TOOLS_COMMON, TOOL_COPY } from '../data/index'
import { useLang, useT } from '../store'

export default function Tools() {
  const t = useT()
  const lang = useLang()
  const copy = TOOL_COPY[lang]
  return (
    <section className="section-tools" id="tools">
      <div className="tools-header">
        <div>
          <span className="eyebrow">{t.tools.eyebrow}</span>
          <h2 className="tools-heading">
            {t.tools.heading}
            <sup className="tools-heading__count">({TOOLS_COMMON.length})</sup>
          </h2>
        </div>
        <p className="tools-desc">{t.tools.desc}</p>
      </div>
      <div className="tools-grid reveal">
        {TOOLS_COMMON.map((tool) => {
          const c = copy[tool.id]
          return (
            <article className="tool-card" key={tool.id}>
              <div className="tool-card__media">
                {tool.shot ? (
                  <img src={tool.shot} alt={c.title} loading="lazy" decoding="async" />
                ) : (
                  <span className="tool-card__noshot">{t.tools.noShot}</span>
                )}
              </div>
              <div className="tool-card__body">
                <h3 className="tool-card__title">{c.title}</h3>
                <p className="tool-card__problem">{c.problem}</p>
                <div className="tool-card__foot">
                  <span className="tool-card__stack">{tool.stack}</span>
                  {tool.repoPublic && tool.repo ? (
                    <a className="tool-card__code" href={tool.repo} target="_blank" rel="noopener noreferrer">
                      {t.tools.code} ↗
                    </a>
                  ) : (
                    tool.soon && <span className="tool-card__soon">{t.tools.soon}</span>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
