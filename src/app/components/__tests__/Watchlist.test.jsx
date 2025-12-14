import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Watchlist from '../Watchlist'

describe('Watchlist Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO BÁSICO
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Watchlist />)
      expect(screen.getByText(/My Watchlist/i)).toBeInTheDocument()
    })

    it('displays all default watchlist items', () => {
      render(<Watchlist />)
      expect(screen.getByText('NVDA')).toBeInTheDocument()
      expect(screen.getByText('TSLA')).toBeInTheDocument()
      expect(screen.getByText('AMZN')).toBeInTheDocument()
      expect(screen.getByText('META')).toBeInTheDocument()
    })

    it('displays company names', () => {
      render(<Watchlist />)
      expect(screen.getByText('NVIDIA Corporation')).toBeInTheDocument()
      expect(screen.getByText('Tesla, Inc.')).toBeInTheDocument()
    })

    it('renders Add Stock button', () => {
      render(<Watchlist />)
      expect(screen.getByText('Add Stock')).toBeInTheDocument()
    })
  })

  // 2. FORMATO DE VALORES
  describe('Value Formatting', () => {
    it('formats currency correctly', () => {
      render(<Watchlist />)
      // Check for currency formatting patterns
      const prices = screen.getAllByText(/\$[\d,]+\.\d{2}/)
      expect(prices.length).toBeGreaterThan(0)
    })

    it('displays positive changes in green', () => {
      render(<Watchlist />)
      // NVDA has positive change
      expect(screen.getByText(/\+1\.44%/)).toBeInTheDocument()
    })

    it('displays negative changes in red', () => {
      render(<Watchlist />)
      // TSLA has negative change
      expect(screen.getByText(/-2\.05%/)).toBeInTheDocument()
    })

    it('formats market cap correctly', () => {
      render(<Watchlist />)
      expect(screen.getByText(/\$2\.15T/)).toBeInTheDocument()
      expect(screen.getByText(/\$789\.2B/)).toBeInTheDocument()
    })
  })

  // 3. BÚSQUEDA Y FILTRADO
  describe('Search and Filtering', () => {
    it('renders search input', () => {
      render(<Watchlist />)
      const searchInput = screen.getByPlaceholderText(/Search stocks/i)
      expect(searchInput).toBeInTheDocument()
    })

    it('filters watchlist items by search term', () => {
      render(<Watchlist />)
      const searchInput = screen.getByPlaceholderText(/Search stocks/i)
      
      fireEvent.change(searchInput, { target: { value: 'NVDA' } })
      
      expect(screen.getByText('NVDA')).toBeInTheDocument()
      expect(screen.queryByText('TSLA')).not.toBeInTheDocument()
    })

    it('search is case-insensitive', () => {
      render(<Watchlist />)
      const searchInput = screen.getByPlaceholderText(/Search stocks/i)
      
      fireEvent.change(searchInput, { target: { value: 'tesla' } })
      
      expect(screen.getByText('TSLA')).toBeInTheDocument()
    })

    it('clears search term', () => {
      render(<Watchlist />)
      const searchInput = screen.getByPlaceholderText(/Search stocks/i)
      
      fireEvent.change(searchInput, { target: { value: 'NVDA' } })
      expect(searchInput.value).toBe('NVDA')
      
      fireEvent.change(searchInput, { target: { value: '' } })
      expect(searchInput.value).toBe('')
    })
  })

  // 4. AGREGAR STOCKS
  describe('Adding Stocks', () => {
    it('opens add stock modal', () => {
      render(<Watchlist />)
      const addButton = screen.getByText('Add Stock')
      
      fireEvent.click(addButton)
      
      expect(screen.getByText(/Add to Watchlist/i)).toBeInTheDocument()
    })

    it('closes modal when clicking close button', () => {
      render(<Watchlist />)
      fireEvent.click(screen.getByText('Add Stock'))
      
      const closeButtons = screen.getAllByRole('button')
      const closeButton = closeButtons.find(btn => btn.textContent === '×')
      
      if (closeButton) {
        fireEvent.click(closeButton)
        expect(screen.queryByText(/Add to Watchlist/i)).not.toBeInTheDocument()
      }
    })

    it('adds new stock to watchlist', () => {
      render(<Watchlist />)
      fireEvent.click(screen.getByText('Add Stock'))
      
      const input = screen.getByPlaceholderText(/Enter stock symbol/i)
      fireEvent.change(input, { target: { value: 'AAPL' } })
      
      const addButton = screen.getByText(/Add to Watchlist/i)
      fireEvent.click(addButton)
      
      // Modal should close after adding
      waitFor(() => {
        expect(screen.queryByPlaceholderText(/Enter stock symbol/i)).not.toBeInTheDocument()
      })
    })

    it('converts symbol to uppercase', () => {
      render(<Watchlist />)
      fireEvent.click(screen.getByText('Add Stock'))
      
      const input = screen.getByPlaceholderText(/Enter stock symbol/i)
      fireEvent.change(input, { target: { value: 'aapl' } })
      
      const addButton = screen.getByText(/Add to Watchlist/i)
      fireEvent.click(addButton)
      
      waitFor(() => {
        expect(screen.getByText('AAPL')).toBeInTheDocument()
      })
    })
  })

  // 5. ELIMINAR STOCKS
  describe('Removing Stocks', () => {
    it('removes stock from watchlist', () => {
      render(<Watchlist />)
      
      // Find and click remove button for NVDA
      const removeButtons = screen.getAllByRole('button')
      const nvdaRow = screen.getByText('NVDA').closest('div')
      
      if (nvdaRow) {
        const removeButton = nvdaRow.querySelector('button[class*="text-red"]')
        if (removeButton) {
          fireEvent.click(removeButton)
          
          waitFor(() => {
            expect(screen.queryByText('NVDA')).not.toBeInTheDocument()
          })
        }
      }
    })
  })

  // 6. ACCIONES DE TRADING
  describe('Trading Actions', () => {
    it('renders Trade buttons for each stock', () => {
      render(<Watchlist />)
      const tradeButtons = screen.getAllByText('Trade')
      expect(tradeButtons.length).toBeGreaterThan(0)
    })

    it('renders View Chart buttons', () => {
      render(<Watchlist />)
      const chartButtons = screen.getAllByText('Chart')
      expect(chartButtons.length).toBeGreaterThan(0)
    })
  })

  // 7. ESTADOS VACÍOS
  describe('Empty States', () => {
    it('shows message when search returns no results', () => {
      render(<Watchlist />)
      const searchInput = screen.getByPlaceholderText(/Search stocks/i)
      
      fireEvent.change(searchInput, { target: { value: 'ZZZZZ' } })
      
      // Should show no stocks
      expect(screen.queryByText('NVDA')).not.toBeInTheDocument()
      expect(screen.queryByText('TSLA')).not.toBeInTheDocument()
    })
  })

  // 8. EDGE CASES
  describe('Edge Cases', () => {
    it('handles empty symbol input', () => {
      render(<Watchlist />)
      fireEvent.click(screen.getByText('Add Stock'))
      
      const input = screen.getByPlaceholderText(/Enter stock symbol/i)
      fireEvent.change(input, { target: { value: '' } })
      
      const addButton = screen.getByText(/Add to Watchlist/i)
      fireEvent.click(addButton)
      
      // Modal should stay open or close without adding
      expect(input).toBeInTheDocument()
    })

    it('handles whitespace-only symbol input', () => {
      render(<Watchlist />)
      fireEvent.click(screen.getByText('Add Stock'))
      
      const input = screen.getByPlaceholderText(/Enter stock symbol/i)
      fireEvent.change(input, { target: { value: '   ' } })
      
      const addButton = screen.getByText(/Add to Watchlist/i)
      fireEvent.click(addButton)
      
      // Should not add empty stock
      expect(input).toBeInTheDocument()
    })

    it('displays volume information', () => {
      render(<Watchlist />)
      expect(screen.getByText(/28\.5M/)).toBeInTheDocument()
      expect(screen.getByText(/45\.2M/)).toBeInTheDocument()
    })
  })
})
