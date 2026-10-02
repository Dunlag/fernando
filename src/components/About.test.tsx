import { act, render } from '@testing-library/react'
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { DATA } from '../data/index'

beforeAll(() => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  // jsdom has no IntersectionObserver: report every observed element as in view
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private cb: (entries: { isIntersecting: boolean; target: Element }[]) => void) {}
      observe(target: Element) {
        this.cb([{ isIntersecting: true, target }])
      }
      disconnect() {}
    },
  )
})

afterAll(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('animates the stats up to their final values once in view', async () => {
  // imported after the stubs: About reads matchMedia at module load
  const { default: About } = await import('./About')
  const { container } = render(<About t={DATA.es} />)

  expect(container.querySelectorAll('.about__seq-n.is-on')).toHaveLength(0)
  act(() => vi.advanceTimersByTime(5000))

  expect(container.querySelectorAll('.about__seq-n.is-on')).toHaveLength(9)
  expect(container.textContent).toContain('23.957')
})
