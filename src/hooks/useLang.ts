import { useEffect, useState } from 'react'
import type { Lang } from '../data/index'

export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem('fp_lang') === 'en' ? 'en' : 'es'
    } catch {
      return 'es'
    }
  })
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const set = (l: Lang) => {
    setLang(l)
    try {
      localStorage.setItem('fp_lang', l)
    } catch {}
  }
  return [lang, set] as const
}
