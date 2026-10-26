import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { TOOLS_COMMON } from '../data/index'
import Tools from './Tools'

it('renders one card per tool', () => {
  const { container } = render(<Tools />)

  expect(container.querySelectorAll('.tool-card')).toHaveLength(TOOLS_COMMON.length)
})

it('links code only for tools whose repo is public, and marks the ones without a repo as soon', () => {
  const { container } = render(<Tools />)
  const links = [...container.querySelectorAll<HTMLAnchorElement>('.tool-card__code')]

  expect(links.map((a) => a.getAttribute('href'))).toEqual(TOOLS_COMMON.flatMap((t) => (t.repoPublic && t.repo) || []))
  expect(container.querySelectorAll('.tool-card__soon')).toHaveLength(TOOLS_COMMON.filter((t) => t.soon).length)
})
