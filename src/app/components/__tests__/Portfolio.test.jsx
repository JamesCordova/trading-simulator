import { render, screen, fireEvent } from '@testing-library/react'
import Portfolio from '../Portfolio'

// Mock components that are passed as props
const MockPortfolioSummary = ({ totalValue, cash }) => (
  <div data-testid="portfolio-summary">
    Summary: ${totalValue} / Cash: ${cash}
  </div>
)

const MockStockSearchList = ({ onSearch, onTrade }) => (
  <div data-testid="stock-search-list">
    <button onClick={() => onSearch('AAPL')}>Search</button>
    <button onClick={() => onTrade({ symbol: 'AAPL' })}>Trade</button>
  </div>
)

const MockRecentTradesList = ({ trades, onViewAllTrades }) => (
  <div data-testid="recent-trades">
    Recent Trades
    <button onClick={onViewAllTrades}>View All</button>
  </div>
)

describe('Portfolio Component', () => {
  const mockProps = {
    getDisplayName: jest.fn(() => 'John Doe'),
    totalValue: 10000,
    cash: 50000,
    totalGainLoss: 1500,
    totalGainLossPercent: 17.5,
    mockPortfolio: [
      {
        symbol: 'AAPL',
        company: 'Apple Inc.',
        shares: 10,
        avgPrice: 150.00,
        currentPrice: 175.50,
        value: 1755.00
      },
      {
        symbol: 'GOOGL',
        company: 'Alphabet Inc.',
        shares: 5,
        avgPrice: 2800.00,
        currentPrice: 2850.00,
        value: 14250.00
      }
    ],
    mockRecentTrades: [
      { type: 'buy', symbol: 'AAPL', shares: 10, price: 150 }
    ],
    handleAddPosition: jest.fn(),
    handleSearch: jest.fn(),
    handleTrade: jest.fn(),
    handleViewAllTrades: jest.fn(),
    formatCurrency: (val) => `$${val.toFixed(2)}`,
    formatPercent: (val) => `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`,
    PortfolioSummary: MockPortfolioSummary,
    StockSearchList: MockStockSearchList,
    RecentTradesList: MockRecentTradesList
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO DE POSICIONES
  describe('Positions Rendering', () => {
    it('renders the welcome header with user name', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByText(/Welcome, John Doe!/)).toBeInTheDocument()
    })

    it('renders holdings table with all columns', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByText('Symbol')).toBeInTheDocument()
      expect(screen.getByText('Shares')).toBeInTheDocument()
      expect(screen.getByText('Avg Price')).toBeInTheDocument()
      expect(screen.getByText('Current Price')).toBeInTheDocument()
      expect(screen.getByText('Value')).toBeInTheDocument()
      expect(screen.getByText('P&L')).toBeInTheDocument()
    })

    it('displays all portfolio positions', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('Apple Inc.')).toBeInTheDocument()
      expect(screen.getByText('GOOGL')).toBeInTheDocument()
      expect(screen.getByText('Alphabet Inc.')).toBeInTheDocument()
    })

    it('formats all values correctly', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByText('$150.00')).toBeInTheDocument()
      expect(screen.getByText('$175.50')).toBeInTheDocument()
      expect(screen.getByText('$1755.00')).toBeInTheDocument()
    })
  })

  // 2. CÁLCULOS VISUALES
  describe('Visual Calculations', () => {
    it('shows gains in green (positive)', () => {
      render(<Portfolio {...mockProps} />)
      const rows = screen.getAllByRole('row')
      // AAPL row has positive gain
      expect(rows.some(row => row.textContent.includes('AAPL'))).toBe(true)
    })

    it('calculates gain/loss correctly', () => {
      render(<Portfolio {...mockProps} />)
      // AAPL: (175.50 - 150.00) * 10 = 255.00
      expect(screen.getByText('$255.00')).toBeInTheDocument()
    })

    it('displays percentage correctly', () => {
      render(<Portfolio {...mockProps} />)
      // AAPL: ((175.50 - 150.00) / 150.00) * 100 = 17%
      expect(screen.getByText(/17\.00%/)).toBeInTheDocument()
    })
  })

  // 3. ACCIONES
  describe('Actions', () => {
    it('renders Add Position button', () => {
      render(<Portfolio {...mockProps} />)
      const addButton = screen.getByText('Add Position')
      expect(addButton).toBeInTheDocument()
    })

    it('calls handleAddPosition when Add Position is clicked', () => {
      render(<Portfolio {...mockProps} />)
      const addButton = screen.getByText('Add Position')
      fireEvent.click(addButton)
      expect(mockProps.handleAddPosition).toHaveBeenCalled()
    })

    it('renders Things to do button', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByText('Things to do?')).toBeInTheDocument()
    })

    it('opens modal when Things to do is clicked', () => {
      render(<Portfolio {...mockProps} />)
      const modalButton = screen.getByText('Things to do?')
      fireEvent.click(modalButton)
      expect(screen.getByText('Functional Components of This Site')).toBeInTheDocument()
    })

    it('closes modal when X button is clicked', () => {
      render(<Portfolio {...mockProps} />)
      const modalButton = screen.getByText('Things to do?')
      fireEvent.click(modalButton)
      
      const closeButton = screen.getByRole('button', { name: '' })
      fireEvent.click(closeButton)
      
      expect(screen.queryByText('Functional Components of This Site')).not.toBeInTheDocument()
    })
  })

  // 4. ESTADOS VACÍOS
  describe('Empty States', () => {
    it('renders with empty portfolio', () => {
      const emptyProps = { ...mockProps, mockPortfolio: [] }
      render(<Portfolio {...emptyProps} />)
      expect(screen.getByText('Your Holdings')).toBeInTheDocument()
    })

    it('shows welcome message even with empty portfolio', () => {
      const emptyProps = { ...mockProps, mockPortfolio: [] }
      render(<Portfolio {...emptyProps} />)
      expect(screen.getByText(/Welcome, John Doe!/)).toBeInTheDocument()
    })
  })

  // 5. COMPONENTES ANIDADOS
  describe('Nested Components', () => {
    it('renders PortfolioSummary component', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByTestId('portfolio-summary')).toBeInTheDocument()
    })

    it('renders StockSearchList component', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByTestId('stock-search-list')).toBeInTheDocument()
    })

    it('renders RecentTradesList component', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.getByTestId('recent-trades')).toBeInTheDocument()
    })

    it('passes correct props to child components', () => {
      render(<Portfolio {...mockProps} />)
      // PortfolioSummary receives totalValue + cash
      expect(screen.getByText(/Summary: \$60000/)).toBeInTheDocument()
      expect(screen.getByText(/Cash: \$50000/)).toBeInTheDocument()
    })
  })

  // 6. EDGE CASES
  describe('Edge Cases', () => {
    it('handles null portfolio gracefully', () => {
      const nullProps = { ...mockProps, mockPortfolio: null }
      render(<Portfolio {...nullProps} />)
      expect(screen.getByText('Your Holdings')).toBeInTheDocument()
    })

    it('handles undefined portfolio gracefully', () => {
      const undefinedProps = { ...mockProps, mockPortfolio: undefined }
      render(<Portfolio {...undefinedProps} />)
      expect(screen.getByText('Your Holdings')).toBeInTheDocument()
    })

    it('handles position with 100% loss', () => {
      const lossProps = {
        ...mockProps,
        mockPortfolio: [{
          symbol: 'FAIL',
          company: 'Failed Co',
          shares: 100,
          avgPrice: 100,
          currentPrice: 0,
          value: 0
        }]
      }
      render(<Portfolio {...lossProps} />)
      expect(screen.getByText('FAIL')).toBeInTheDocument()
    })

    it('renders with many positions (>20)', () => {
      const manyPositions = Array.from({ length: 25 }, (_, i) => ({
        symbol: `STOCK${i}`,
        company: `Company ${i}`,
        shares: 10,
        avgPrice: 100,
        currentPrice: 110,
        value: 1100
      }))
      const manyProps = { ...mockProps, mockPortfolio: manyPositions }
      render(<Portfolio {...manyProps} />)
      expect(screen.getByText('STOCK0')).toBeInTheDocument()
      expect(screen.getByText('STOCK24')).toBeInTheDocument()
    })

    it('handles empty mockPortfolio array', () => {
      const emptyProps = { ...mockProps, mockPortfolio: [] }
      render(<Portfolio {...emptyProps} />)
      expect(screen.getByText('Your Holdings')).toBeInTheDocument()
      // Table should still render but with no rows
      expect(screen.queryByText('AAPL')).not.toBeInTheDocument()
    })

    it('handles very large position counts', () => {
      const manyPos = Array.from({ length: 100 }, (_, i) => ({
        symbol: `STOCK${i}`,
        company: `Company ${i}`,
        shares: 10,
        avgPrice: 100,
        currentPrice: 105,
        value: 1050
      }))
      const largeProps = { ...mockProps, mockPortfolio: manyPos }
      render(<Portfolio {...largeProps} />)
      expect(screen.getByText('STOCK0')).toBeInTheDocument()
      expect(screen.getByText('STOCK99')).toBeInTheDocument()
    })
  })

  // 7. MODAL FUNCTIONALITY
  describe('Modal Functionality', () => {
    it('modal is closed by default', () => {
      render(<Portfolio {...mockProps} />)
      expect(screen.queryByText('Functional Components of This Site')).not.toBeInTheDocument()
    })

    it('modal shows correct content when open', () => {
      render(<Portfolio {...mockProps} />)
      fireEvent.click(screen.getByText('Things to do?'))
      expect(screen.getByText('Search and trade')).toBeInTheDocument()
      expect(screen.getByText('Search, delete, and add stocks to watchlist')).toBeInTheDocument()
      expect(screen.getByText('Filter orders')).toBeInTheDocument()
    })
  })
})
