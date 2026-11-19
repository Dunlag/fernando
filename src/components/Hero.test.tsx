import { act, render } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'
import { PROJECTS_COMMON, TOOLS_COMMON } from '../data/index'
import Hero from './Hero'

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('cycles through every project and tool screenshot, always with exactly one frame visible', () => {
  vi.useFakeTimers()
  vi.stubGlobal('matchMedia', () => ({ matches: false }))
  const { container } = render(<Hero />)
  const shots = [...container.querySelectorAll('.hero__card-shot')]
  const activeIndex = () => {
    const active = container.querySelectorAll('.hero__card-shot.is-active')
    expect(active).toHaveLength(1)
    return shots.indexOf(active[0])
  }

  expect(shots).toHaveLength(PROJECTS_COMMON.length + TOOLS_COMMON.filter((t) => t.shot).length)
  for (let i = 0; i < shots.length; i++) {
    expect(activeIndex()).toBe(i)
    act(() => vi.advanceTimersByTime(1200))
  }
  expect(activeIndex()).toBe(0)
})
