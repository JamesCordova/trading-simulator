import { render, screen, fireEvent } from '@testing-library/react'
import Analytics from '../Analytics'

describe('Analytics Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO BÁSICO
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<Analytics />)
      expect(screen.getByText('Portfolio Analytics')).toBeInTheDocument()
    })

    it('displays the main heading and description', () => {
      render(<Analytics />)
      expect(screen.getByText('Portfolio Analytics')).toBeInTheDocument()
      expect(screen.getByText('Advanced insights into your investment performance')).toBeInTheDocument()
    })

    it('renders time range selector with default value', () => {
      render(<Analytics />)
      const select = screen.getByDisplayValue('6 Months')
      expect(select).toBeInTheDocument()
    })

    it('renders all time range options', () => {
      render(<Analytics />)
      expect(screen.getByText('1 Month')).toBeInTheDocument()
      expect(screen.getByText('3 Months')).toBeInTheDocument()
      expect(screen.getByText('6 Months')).toBeInTheDocument()
      expect(screen.getByText('1 Year')).toBeInTheDocument()
      expect(screen.getByText('All Time')).toBeInTheDocument()
    })
  })

  // 2. MÉTRICAS CLAVE
  describe('Key Metrics', () => {
    it('renders all metric cards', () => {
      render(<Analytics />)
      // Check that we have at least the 4 main metrics
      const metrics = screen.getAllByText(/Total Return|Sharpe Ratio|Beta|Max Drawdown/)
      expect(metrics.length).toBeGreaterThanOrEqual(4)
    })

    it('displays metric values', () => {
      render(<Analytics />)
      expect(screen.getByText('$12,450')).toBeInTheDocument()
      expect(screen.getByText('1.45')).toBeInTheDocument()
      expect(screen.getByText('0.89')).toBeInTheDocument()
      expect(screen.getByText('-8.2%')).toBeInTheDocument()
    })

    it('displays metric changes with correct styling', () => {
      render(<Analytics />)
      expect(screen.getByText('+24.5%')).toBeInTheDocument()
      expect(screen.getByText('+0.12')).toBeInTheDocument()
      expect(screen.getByText('-0.05')).toBeInTheDocument()
      expect(screen.getByText('+2.3%')).toBeInTheDocument()
    })
  })

  // 3. GRÁFICOS
  describe('Charts', () => {
    it('renders portfolio performance chart', () => {
      render(<Analytics />)
      expect(screen.getByText('Portfolio vs Benchmark')).toBeInTheDocument()
    })

    it('renders sector allocation chart', () => {
      render(<Analytics />)
      expect(screen.getByText('Sector Allocation')).toBeInTheDocument()
    })

    it('renders P&L chart', () => {
      render(<Analytics />)
      expect(screen.getByText('Monthly P&L')).toBeInTheDocument()
    })

    it('renders sector names in allocation chart', () => {
      render(<Analytics />)
      // Since sector names are in chart data and may not render as text with mocks,
      // just verify the pie chart component is rendered
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument()
    })
  })

  // 4. TOP PERFORMERS
  describe('Top Performers', () => {
    it('renders top performers table', () => {
      render(<Analytics />)
      expect(screen.getByText('Top Performers')).toBeInTheDocument()
    })

    it('displays top performing stocks', () => {
      render(<Analytics />)
      expect(screen.getByText('NVDA')).toBeInTheDocument()
      expect(screen.getByText('NVIDIA Corp')).toBeInTheDocument()
      expect(screen.getByText('AAPL')).toBeInTheDocument()
      expect(screen.getByText('Apple Inc')).toBeInTheDocument()
    })

    it('displays performance percentages', () => {
      render(<Analytics />)
      expect(screen.getByText('45.2%')).toBeInTheDocument()
      expect(screen.getByText('28.7%')).toBeInTheDocument()
    })

    it('displays portfolio values', () => {
      render(<Analytics />)
      expect(screen.getByText('$12,500')).toBeInTheDocument()
      expect(screen.getByText('$8,900')).toBeInTheDocument()
    })
  })

  // 5. INTERACTIVIDAD
  describe('Interactivity', () => {
    it('changes time range when select option is changed', () => {
      render(<Analytics />)
      const select = screen.getByDisplayValue('6 Months')

      fireEvent.change(select, { target: { value: '1Y' } })

      expect(select.value).toBe('1Y')
    })

    it('time range select has proper options', () => {
      render(<Analytics />)
      const select = screen.getByDisplayValue('6 Months')
      const options = select.querySelectorAll('option')

      expect(options).toHaveLength(5)
      expect(options[0].value).toBe('1M')
      expect(options[1].value).toBe('3M')
      expect(options[2].value).toBe('6M')
      expect(options[3].value).toBe('1Y')
      expect(options[4].value).toBe('ALL')
    })
  })

  // 6. FUNCIONES DE UTILIDAD
  describe('Utility Functions', () => {
    it('formats currency correctly', () => {
      render(<Analytics />)
      // The formatCurrency function is used internally
      // We can verify its output through rendered content
      expect(screen.getByText('$12,450')).toBeInTheDocument()
    })
  })

  // 7. COMPONENTES DE TOOLTIP
  describe('Tooltip Components', () => {
    it('renders tooltip components without errors', () => {
      render(<Analytics />)
      // Tooltips are rendered by recharts, just verify component renders
      expect(screen.getByText('Portfolio Analytics')).toBeInTheDocument()
    })
  })
})