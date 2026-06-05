import { useEffect } from 'react'

export function useFitText(deps = []) {
  useEffect(() => {
    const fit = (el) => {
      if (!el || !el.parentElement) return
      const pad = parseInt(el.dataset.fit) || 0
      const target = el.parentElement.clientWidth - pad
      if (target <= 0) return
      el.style.fontSize = '100px'
      const w = el.scrollWidth
      if (!w) return
      let size = (100 * target) / w
      const fvh = parseFloat(el.dataset.fitVh)
      if (fvh) size = Math.min(size, window.innerHeight * fvh)
      el.style.fontSize = Math.floor(size) + 'px'
    }
    const run = () => document.querySelectorAll('[data-fit]').forEach(fit)
    run()
    const id = setTimeout(run, 150)
    if (document.fonts?.ready) document.fonts.ready.then(run)
    window.addEventListener('resize', run)
    return () => { clearTimeout(id); window.removeEventListener('resize', run) }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
