export default function Marquee({ t }) {
  const items = t.marquee
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-inner">
        {[0, 1].map((dup) =>
          items.map((w, i) => <span key={dup + '-' + i}>{w}</span>)
        )}
      </div>
    </div>
  )
}
