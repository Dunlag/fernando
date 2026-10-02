import { useEffect, useState } from 'react'

export function useLang() {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('fp_lang') || 'es'
    } catch {
      return 'es'
    }
  })
  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])
  const set = (l) => {
    setLang(l)
    try {
      localStorage.setItem('fp_lang', l)
    } catch {}
  }
  return [lang, set]
}
