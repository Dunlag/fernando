import { forwardRef } from 'react'
import { useStore, useT } from '../store'

const CvTab = forwardRef<HTMLButtonElement>(function CvTab(_props, ref) {
  const t = useT()
  const openCv = useStore((s) => s.openCv)
  return (
    <button ref={ref} type="button" className="cv-tab" onClick={openCv} aria-label={t.cv.expanded}>
      <span className="cv-tab__expanded">{t.cv.expanded} ↓</span>
      <span className="cv-tab__collapsed">{t.cv.tab}</span>
    </button>
  )
})

export default CvTab
