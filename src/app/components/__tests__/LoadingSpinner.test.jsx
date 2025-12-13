import { render, screen } from '@testing-library/react'
import LoadingSpinner from '../LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays default loading message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('displays custom message when provided', () => {
    render(<LoadingSpinner message="Fetching data..." />)
    expect(screen.getByText('Fetching data...')).toBeInTheDocument()
  })

  it('displays wait message', () => {
    render(<LoadingSpinner />)
    expect(screen.getByText(/please wait while we load your data/i)).toBeInTheDocument()
  })
})
