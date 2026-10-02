import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DATA, type Copy, type Lang } from './data/index'

interface State {
  lang: Lang
  cvOpen: boolean
  setLang: (lang: Lang) => void
  openCv: () => void
  closeCv: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      lang: 'es',
      cvOpen: false,
      setLang: (lang) => set({ lang }),
      openCv: () => set({ cvOpen: true }),
      closeCv: () => set({ cvOpen: false }),
    }),
    {
      name: 'fp_prefs',
      // only the language survives a reload; the CV panel always starts closed
      partialize: ({ lang }) => ({ lang }),
      // localStorage is user-editable: accept nothing but a known language
      merge: (saved, current) => ({ ...current, lang: (saved as Partial<State> | null)?.lang === 'en' ? 'en' : 'es' }),
    },
  ),
)

// Keep <html lang> in step with the store, including the value restored from storage
const syncHtmlLang = ({ lang }: State) => {
  document.documentElement.lang = lang
}
syncHtmlLang(useStore.getState())
useStore.subscribe(syncHtmlLang)

export const useLang = (): Lang => useStore((s) => s.lang)

/** Copy for the active language. */
export const useT = (): Copy => DATA[useLang()]
