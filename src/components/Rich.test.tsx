import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import Rich from './Rich'

it('renders text, line breaks, emphasis and highlighted runs in order', () => {
  const { container } = render(<Rich parts={['DISEÑO', { br: true }, { em: 'imposibles' }, { span: 'de ignorar' }]} />)

  expect(container.innerHTML).toBe('<span>DISEÑO</span><br><em>imposibles</em><span>de ignorar</span>')
})
