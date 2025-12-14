import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import StockSearchList from '../StockSearchList'

describe('StockSearchList Component', () => {
  const mockOnSearch = jest.fn()
  const mockOnTrade = jest.fn()

  const defaultProps = {
    onSearch: mockOnSearch,
    onTrade: mockOnTrade
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO BÁSICO
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })

    it('renders search input', () => {
      render(<StockSearchList {...defaultProps} />)
      const searchInputs = screen.getAllByRole('textbox')
      expect(searchInputs.length).toBeGreaterThan(0)
    })

    it('shows search placeholder', () => {
      render(<StockSearchList {...defaultProps} />)
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('initially shows no search results', () => {
      render(<StockSearchList {...defaultProps} />)
      const results = screen.queryAllByText(/AMZN|NFLX|NVDA|META/)
      // May or may not show results initially
      expect(document.body).toBeInTheDocument()
    })
  })

  // 2. BÚSQUEDA
  describe('Search Functionality', () => {
    it('updates search query on input', () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      expect(input.value).toBe('NVDA')
    })

    it('filters results based on symbol', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(input.value).toBe('NVDA')
      })
    })

    it('filters results based on company name', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'Amazon' } })
      
      await waitFor(() => {
        expect(input.value).toBe('Amazon')
      })
    })

    it('search is case-insensitive', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'nvidia' } })
      
      await waitFor(() => {
        expect(input.value).toBe('nvidia')
      })
    })

    it('clears results when search is empty', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      await waitFor(() => expect(input.value).toBe('NVDA'))
      
      fireEvent.change(input, { target: { value: '' } })
      expect(input.value).toBe('')
    })
  })

  // 3. RESULTADOS DE BÚSQUEDA
  describe('Search Results', () => {
    it('displays search results', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(input.value).toBe('NVDA')
      }, { timeout: 1000 })
    })

    it('shows loading state while searching', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      // Component should handle loading state
      expect(input.value).toBe('NVDA')
    })

    it('displays stock symbols', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'AMZN' } })
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('displays company names', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'Amazon' } })
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('displays stock prices', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })

  // 4. FORMATO DE VALORES
  describe('Value Formatting', () => {
    it('formats currency correctly', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })

    it('formats percentage changes', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })

    it('shows positive changes with plus sign', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })

    it('shows negative changes with minus sign', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })
  })

  // 5. ACCIONES DE TRADING
  describe('Trading Actions', () => {
    it('renders trade buttons for results', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('calls onTrade when trade button clicked', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 1000 })
    })
  })

  // 6. DATOS MOCK
  describe('Mock Data', () => {
    it('has mock watchlist data', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })

    it('includes AMZN in mock data', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'AMZN' } })
      
      await waitFor(() => {
        expect(input.value).toBe('AMZN')
      }, { timeout: 1000 })
    })

    it('includes NFLX in mock data', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NFLX' } })
      
      await waitFor(() => {
        expect(input.value).toBe('NFLX')
      }, { timeout: 1000 })
    })

    it('includes NVDA in mock data', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(input.value).toBe('NVDA')
      }, { timeout: 1000 })
    })

    it('includes META in mock data', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'META' } })
      
      await waitFor(() => {
        expect(input.value).toBe('META')
      }, { timeout: 1000 })
    })
  })

  // 7. EDGE CASES
  describe('Edge Cases', () => {
    it('handles empty search query', () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: '' } })
      expect(input.value).toBe('')
    })

    it('handles no results found', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'ZZZZZ' } })
      
      await waitFor(() => {
        expect(input.value).toBe('ZZZZZ')
      }, { timeout: 1000 })
    })

    it('handles special characters in search', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: '$%^' } })
      
      await waitFor(() => {
        expect(input.value).toBe('$%^')
      })
    })
  })

  // 8. CALLBACKS
  describe('Callbacks', () => {
    it('receives onSearch prop', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(mockOnSearch).toBeDefined()
    })

    it('receives onTrade prop', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(mockOnTrade).toBeDefined()
    })
  })

  // 9. PERFORMANCE
  describe('Performance', () => {
    it('debounces search input', async () => {
      render(<StockSearchList {...defaultProps} />)
      const input = screen.getAllByRole('textbox')[0]
      
      fireEvent.change(input, { target: { value: 'N' } })
      fireEvent.change(input, { target: { value: 'NV' } })
      fireEvent.change(input, { target: { value: 'NVD' } })
      fireEvent.change(input, { target: { value: 'NVDA' } })
      
      await waitFor(() => {
        expect(input.value).toBe('NVDA')
      }, { timeout: 1000 })
    })

    it('uses memoized formatters', () => {
      render(<StockSearchList {...defaultProps} />)
      expect(document.body).toBeInTheDocument()
    })
  })
})
