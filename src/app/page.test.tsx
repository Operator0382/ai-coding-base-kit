import { render, screen } from '@testing-library/react'

import Home from './page'

describe('Home', () => {
  it('renders the starter page and its primary links', () => {
    render(<Home />)

    expect(screen.getByRole('img', { name: 'Next.js logo' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Deploy now/ })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    )
    expect(screen.getByRole('link', { name: 'Read our docs' })).toBeInTheDocument()
  })
})
