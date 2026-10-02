import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { PROJECTS_COMMON } from './index'

describe('PROJECTS_COMMON', () => {
  it.each(PROJECTS_COMMON)('$id has a shot count the hover slideshow supports', ({ shots }) => {
    // work-shots.css only defines keyframes for these counts
    expect([2, 3, 5, 8]).toContain(shots.length)
  })

  it.each(PROJECTS_COMMON)('$id only references screenshots that exist', ({ shots }) => {
    const missing = shots.filter((src) => !existsSync('public/' + src.slice(import.meta.env.BASE_URL.length)))
    expect(missing).toEqual([])
  })
})
