import { beforeEach, describe, expect, it } from 'vitest'
import { useStore } from './store'

const saved = () => JSON.parse(localStorage.getItem('fp_prefs') ?? '{}').state

beforeEach(() => {
  useStore.setState({ lang: 'es', cvOpen: false })
})

describe('language', () => {
  it('switches language, updates <html lang> and persists the choice', () => {
    useStore.getState().setLang('en')

    expect(useStore.getState().lang).toBe('en')
    expect(document.documentElement.lang).toBe('en')
    expect(saved()).toEqual({ lang: 'en' })
  })

  it('falls back to Spanish when storage holds an unknown language', async () => {
    localStorage.setItem('fp_prefs', JSON.stringify({ state: { lang: 'xx' }, version: 0 }))
    await useStore.persist.rehydrate()

    expect(useStore.getState().lang).toBe('es')
  })
})

describe('CV panel', () => {
  it('opens and closes, and is never persisted', () => {
    useStore.getState().openCv()
    expect(useStore.getState().cvOpen).toBe(true)
    expect(saved()).not.toHaveProperty('cvOpen')

    useStore.getState().closeCv()
    expect(useStore.getState().cvOpen).toBe(false)
  })
})
