export default function Rich({ parts }) {
  if (typeof parts === 'string') return parts
  return (parts || []).map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>
    if (p.br) return <br key={i} />
    if (p.em) return <em key={i}>{p.em}</em>
    if (p.span) return <span key={i}>{p.span}</span>
    return null
  })
}
