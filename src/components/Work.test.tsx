import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { PROJECTS_COMMON } from '../data/index'
import Work from './Work'

it('renders one card per project', () => {
  const { container } = render(<Work />)

  expect(container.querySelectorAll('.work-card')).toHaveLength(PROJECTS_COMMON.length)
})

it('shows the source chip only for projects that have a repo', () => {
  const { container } = render(<Work />)
  const chips = [...container.querySelectorAll<HTMLAnchorElement>('.work-card__chip--repo')]

  expect(chips.map((a) => a.getAttribute('href'))).toEqual(PROJECTS_COMMON.flatMap((p) => p.repo ?? []))
})

it('does not link cards of projects that are not public yet', () => {
  const { container } = render(<Work />)
  const linked = container.querySelectorAll('.work-card__link')

  expect(linked).toHaveLength(PROJECTS_COMMON.filter((p) => p.url).length)
  expect(PROJECTS_COMMON.some((p) => !p.url)).toBe(true)
})
