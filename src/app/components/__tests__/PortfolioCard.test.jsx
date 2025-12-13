import { render, screen, fireEvent } from '@testing-library/react'
import PortfolioCard from '../PortfolioCard'
import { TrendingUp } from 'lucide-react'

describe('PortfolioCard', () => {
  const defaultProps = {
    title: 'Total Value',
    value: 10000,
    change: 500,
    changePercent: 5,
    icon: TrendingUp,
  }

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
  })

  it('renders portfolio card with title', () => {
    render(<PortfolioCard {...defaultProps} />)
    expect(screen.getByText('Total Value')).toBeInTheDocument()
  })

  it('displays formatted currency value', () => {
    render(<PortfolioCard {...defaultProps} />)
    expect(screen.getByText(/\$10,000/)).toBeInTheDocument()
  })

  it('displays positive change correctly', () => {
    render(<PortfolioCard {...defaultProps} />)
    expect(screen.getByText('$500.00')).toBeInTheDocument()
    expect(screen.getByText(/\+5.00%/)).toBeInTheDocument()
  })

  it('displays negative change correctly', () => {
    const negativeProps = { ...defaultProps, change: -200, changePercent: -2 }
    render(<PortfolioCard {...negativeProps} />)
    expect(screen.getByText('$200.00')).toBeInTheDocument()
    expect(screen.getByText(/-2.00%/)).toBeInTheDocument()
  })

  it('toggles visibility when eye icon is clicked', () => {
    render(<PortfolioCard {...defaultProps} />)
    
    // Initially visible
    expect(screen.getByText(/\$10,000/)).toBeInTheDocument()
    
    // Click to hide
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    // Should show asterisks (multiple elements with ****)
    const asterisks = screen.getAllByText('****')
    expect(asterisks.length).toBeGreaterThan(0)
  })

  it('persists visibility state in localStorage', () => {
    render(<PortfolioCard {...defaultProps} />)
    
    const toggleButton = screen.getByRole('button')
    fireEvent.click(toggleButton)
    
    // Check localStorage
    const storageKey = `portfolio-card-visibility-${defaultProps.title}`
    expect(localStorage.getItem(storageKey)).toBe('false')
  })
})
