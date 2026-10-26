import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import { AGENCY, PROJECTS_COMMON } from '../data/index'
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

it('lists agency work in one row instead of as cards', () => {
  const { container } = render(<Work />)

  expect(container.querySelectorAll('.work-agency__list a')).toHaveLength(AGENCY.length)
})
