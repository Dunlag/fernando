import { forwardRef } from 'react'

const CvTab = forwardRef(function CvTab({ t, onOpenCv }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      className="cv-tab"
      onClick={onOpenCv}
      aria-label={t.cv.expanded}
    >
      <span className="cv-tab__expanded">{t.cv.expanded} ↓</span>
      <span className="cv-tab__collapsed">{t.cv.tab}</span>
    </button>
  )
})

export default CvTab
