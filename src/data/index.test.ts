import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { DATA, PROJECTS_COMMON, TOOLS_COMMON, TOOL_COPY } from './index'

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

describe('TOOLS_COMMON', () => {
  it.each(TOOLS_COMMON)('$id only exposes a code link once its repo is public', ({ repo, repoPublic }) => {
    if (repoPublic) expect(repo).toBeDefined()
  })

  it.each(TOOLS_COMMON)('$id has copy in both languages', ({ id }) => {
    expect(TOOL_COPY.es[id].problem).not.toBe('')
    expect(TOOL_COPY.en[id].problem).not.toBe('')
  })

  it.each(TOOLS_COMMON.filter((t) => t.shot))('$id only references a screenshot that exists', ({ shot }) => {
    expect(existsSync('public/' + shot!.slice(import.meta.env.BASE_URL.length))).toBe(true)
  })
})

it('keeps the nav in step with the sections', () => {
  expect(Object.keys(DATA.es.nav)).toEqual(Object.keys(DATA.en.nav))
})
