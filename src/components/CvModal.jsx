import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function originPoint(originEl, panelEl) {
  const p = panelEl.getBoundingClientRect()
  const o = originEl ? originEl.getBoundingClientRect() : null
  const x = o ? o.left + o.width / 2 - p.left : p.width
  const y = o ? o.top + o.height / 2 - p.top : p.height / 2
  // farthest-corner radius, computed in px so the circle always fully covers the panel
  // (a % radius in clip-path resolves against the box diagonal/2, not the true corner distance)
  const maxR = Math.hypot(Math.max(x, p.width - x), Math.max(y, p.height - y))
  return { x, y, maxR }
}

export default function CvModal({ t, open, onClose, originRef }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const closeBtnRef = useRef(null)
  const contentRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement
    const backdrop = backdropRef.current
    const panel = panelRef.current
    const content = contentRef.current
    if (!backdrop || !panel) return

    const { x, y, maxR } = originPoint(originRef?.current, panel)
    const at = `${x}px ${y}px`

    if (reduce) {
      backdrop.style.opacity = '1'
      panel.style.clipPath = `circle(${maxR}px at ${at})`
      closeBtnRef.current?.focus()
      return
    }

    const obj = { v: 0 }
    gsap.set(backdrop, { opacity: 0 })
    gsap.set(content?.children || [], { opacity: 0, y: 14 })
    const tl = gsap.timeline({ onComplete: () => closeBtnRef.current?.focus() })
    tl.to(backdrop, { opacity: 1, duration: 0.3, ease: 'power1.out' }, 0)
      .to(obj, {
        v: maxR, duration: 0.55, ease: 'power3.out',
        onUpdate() { panel.style.clipPath = `circle(${obj.v}px at ${at})` },
      }, 0)
      .to(content?.children || [], { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, 0.2)

    return () => tl.kill()
  }, [open, originRef])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  function close() {
    const backdrop = backdropRef.current
    const panel = panelRef.current
    if (!backdrop || !panel || reduce) {
      onClose()
      triggerRef.current?.focus?.()
      return
    }
    const { x, y, maxR } = originPoint(originRef?.current, panel)
    const at = `${x}px ${y}px`
    const obj = { v: maxR }
    gsap.timeline({
      onComplete: () => {
        onClose()
        triggerRef.current?.focus?.()
      },
    })
      .to(backdrop, { opacity: 0, duration: 0.25, ease: 'power1.in' }, 0.1)
      .to(obj, {
        v: 0, duration: 0.35, ease: 'power2.in',
        onUpdate() { panel.style.clipPath = `circle(${obj.v}px at ${at})` },
      }, 0)
  }

  if (!open) return null

  return (
    <div className="cv-modal" role="dialog" aria-modal="true" aria-label={t.cv.expanded}>
      <div className="cv-modal__backdrop" ref={backdropRef} onClick={close} />
      <div className="cv-modal__panel" ref={panelRef}>
        <button type="button" className="cv-modal__close" ref={closeBtnRef} onClick={close} aria-label="×">×</button>
        <div className="cv-modal__content" ref={contentRef}>
          <span className="cv-modal__eyebrow">{t.hero.eyebrow}</span>
          <h2 className="cv-modal__title">FERNANDO PINILLA</h2>
          <p className="cv-modal__hint">{t.cv.expanded}</p>
          <a
            className="btn-primary cv-modal__btn"
            href="/fernando/assets/cv-fernando-pinilla.pdf"
            download
          >
            {t.cv.expanded} <span>↓</span>
          </a>
        </div>
      </div>
    </div>
  )
}
