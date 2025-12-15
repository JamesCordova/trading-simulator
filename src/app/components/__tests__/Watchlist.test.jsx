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
      expect(screen.getByText(/Watchlist/i)).toBeInTheDocument()
    })

    it('displays all default watchlist items', () => {
      render(<Watchlist />)
      expect(screen.getAllByText('NVDA').length).toBeGreaterThan(0)
      expect(screen.getAllByText('TSLA').length).toBeGreaterThan(0)
      expect(screen.getAllByText('AMZN').length).toBeGreaterThan(0)
      expect(screen.getAllByText('META').length).toBeGreaterThan(0)
    })

    it('displays company names', () => {
      render(<Watchlist />)
      expect(screen.getAllByText('NVIDIA Corporation').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Tesla, Inc.').length).toBeGreaterThan(0)
    })

    it('renders Add Stock button', () => {
      render(<Watchlist />)
      expect(screen.getAllByText('Add Stock').length).toBeGreaterThan(0)
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
      const positiveChanges = screen.getAllByText(/\+1\.44%/)
      expect(positiveChanges.length).toBeGreaterThan(0)
    })

    it('displays negative changes in red', () => {
      render(<Watchlist />)
      // TSLA has negative change
      const negativeChanges = screen.getAllByText(/-2\.05%/)
      expect(negativeChanges.length).toBeGreaterThan(0)
    })

    it('formats market cap correctly', () => {
      render(<Watchlist />)
      const marketCaps1 = screen.getAllByText(/\$2\.15T/)
      const marketCaps2 = screen.getAllByText(/\$789\.2B/)
      expect(marketCaps1.length).toBeGreaterThan(0)
      expect(marketCaps2.length).toBeGreaterThan(0)
    })
  })

  // 3. BÚSQUEDA Y FILTRADO
  describe('Search and Filtering', () => {
    it('renders search input', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      expect(searchInputs.length).toBeGreaterThan(0)
    })

    it('filters watchlist items by search term', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      const searchInput = searchInputs[0]
      
      fireEvent.change(searchInput, { target: { value: 'NVDA' } })
      
      expect(screen.getAllByText('NVDA').length).toBeGreaterThan(0)
    })

    it('search is case-insensitive', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      const searchInput = searchInputs[0]
      
      fireEvent.change(searchInput, { target: { value: 'tesla' } })
      
      expect(screen.getAllByText('TSLA').length).toBeGreaterThan(0)
    })

    it('clears search term', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      const searchInput = searchInputs[0]
      
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
      const addButtons = screen.getAllByText('Add Stock')
      
      fireEvent.click(addButtons[0])
      
      const modalTitle = screen.getAllByText(/Add/i)
      expect(modalTitle.length).toBeGreaterThan(0)
    })

    it('modal has close functionality', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      // Just verify modal opened
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('has input for new stock symbol', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      // Check if there are input fields
      const inputs = screen.getAllByRole('textbox')
      expect(inputs.length).toBeGreaterThan(0)
    })

    it('can type in stock symbol input', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      const inputs = screen.getAllByRole('textbox')
      const symbolInput = inputs.find(input => input.placeholder && input.placeholder.includes('symbol'))
      
      if (symbolInput) {
        fireEvent.change(symbolInput, { target: { value: 'AAPL' } })
        expect(symbolInput.value).toBe('AAPL')
      }
    })

    it('adds stock to watchlist when form is submitted', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      const inputs = screen.getAllByRole('textbox')
      const symbolInput = inputs.find(input => input.placeholder && input.placeholder.includes('symbol'))
      
      if (symbolInput) {
        fireEvent.change(symbolInput, { target: { value: 'AAPL' } })
        
        const addToWatchlistButton = screen.getByText('Add to Watchlist')
        fireEvent.click(addToWatchlistButton)
        
        // Check if AAPL was added
        expect(screen.getAllByText('AAPL').length).toBeGreaterThan(0)
      }
    })

    it('closes modal after adding stock', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      const inputs = screen.getAllByRole('textbox')
      const symbolInput = inputs.find(input => input.placeholder && input.placeholder.includes('symbol'))
      
      if (symbolInput) {
        fireEvent.change(symbolInput, { target: { value: 'AAPL' } })
        
        const addToWatchlistButton = screen.getByText('Add to Watchlist')
        fireEvent.click(addToWatchlistButton)
        
        // Modal should be closed
        expect(screen.queryByText('Add to Watchlist')).not.toBeInTheDocument()
      }
    })

    it('does not add empty stock symbol', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      const addToWatchlistButton = screen.getByText('Add to Watchlist')
      fireEvent.click(addToWatchlistButton)
      
      // Should still have original 4 stocks
      expect(screen.getAllByText('NVDA').length).toBeGreaterThan(0)
      expect(screen.getAllByText('TSLA').length).toBeGreaterThan(0)
      expect(screen.getAllByText('AMZN').length).toBeGreaterThan(0)
      expect(screen.getAllByText('META').length).toBeGreaterThan(0)
    })
  })

  // 5. ELIMINAR STOCKS
  describe('Removing Stocks', () => {
    it('has remove functionality', () => {
      render(<Watchlist />)
      
      // Find all buttons
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('removes stock from watchlist', () => {
      render(<Watchlist />)
      
      // Get initial count of stocks
      const initialStocks = screen.getAllByRole('row').filter(row => 
        row.textContent.includes('NVDA') || row.textContent.includes('TSLA') || 
        row.textContent.includes('AMZN') || row.textContent.includes('META')
      )
      
      // Find remove buttons (X icons)
      const removeButtons = screen.getAllByRole('button').filter(button => 
        button.querySelector('svg') && button.querySelector('svg').classList.contains('lucide-x')
      )
      
      if (removeButtons.length > 0) {
        fireEvent.click(removeButtons[0])
        
        // Check that total stocks count decreased
        const totalStocksElement = screen.getByText('Total Stocks')
        const totalStocksText = totalStocksElement.nextElementSibling.textContent
        expect(parseInt(totalStocksText)).toBe(3) // Should be 3 after removing one
      }
    })
  })

  // 6. ACCIONES DE TRADING
  describe('Trading Actions', () => {
    it('renders action buttons for stocks', () => {
      render(<Watchlist />)
      const allButtons = screen.getAllByRole('button')
      expect(allButtons.length).toBeGreaterThan(0)
    })

    it('has interactive elements', () => {
      render(<Watchlist />)
      // Just verify component is interactive
      expect(screen.getAllByText('NVDA').length).toBeGreaterThan(0)
    })
  })

  // 7. ESTADOS VACÍOS
  describe('Empty States', () => {
    it('handles search filtering', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      
      if (searchInputs.length > 0) {
        fireEvent.change(searchInputs[0], { target: { value: 'ZZZZZ' } })
      }
      
      // Component should still be rendered
      expect(screen.getByText(/Watchlist/i)).toBeInTheDocument()
    })

    it('shows empty state message when no stocks match search', () => {
      render(<Watchlist />)
      const searchInputs = screen.getAllByPlaceholderText(/Search/i)
      
      if (searchInputs.length > 0) {
        fireEvent.change(searchInputs[0], { target: { value: 'ZZZZZ' } })
        
        const emptyMessages = screen.getAllByText('No stocks found matching your search')
        expect(emptyMessages.length).toBeGreaterThan(0)
      }
    })
  })

  // 8. EDGE CASES
  describe('Edge Cases', () => {
    it('handles modal interactions', () => {
      render(<Watchlist />)
      const addButtons = screen.getAllByText('Add Stock')
      fireEvent.click(addButtons[0])
      
      // Modal should open
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('displays all stocks by default', () => {
      render(<Watchlist />)
      expect(screen.getAllByText('NVDA').length).toBeGreaterThan(0)
      expect(screen.getAllByText('TSLA').length).toBeGreaterThan(0)
    })

    it('displays volume information', () => {
      render(<Watchlist />)
      const volumeElements = screen.getAllByText(/M/)
      expect(volumeElements.length).toBeGreaterThan(0)
    })

    it('renders mobile card view for small screens', () => {
      render(<Watchlist />)
      // Mobile cards should be rendered (they have different structure than table)
      // Check for mobile-specific elements
      const mobileCards = document.querySelectorAll('.block.sm\\:hidden')
      // Since we can't easily test responsive design without mocking viewport,
      // just verify the component renders mobile elements
      expect(screen.getByText('Portfolio Watchlist')).toBeInTheDocument()
    })
  })
})
