import type { RichPart } from '../data/index'

export default function Rich({ parts }: { parts: RichPart[] }) {
  return parts.map((p, i) => {
    if (typeof p === 'string') return <span key={i}>{p}</span>
    if ('br' in p) return <br key={i} />
    if ('em' in p) return <em key={i}>{p.em}</em>
    return <span key={i}>{p.span}</span>
  })
}
