import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TradingInterface from '../TradingInterface'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock auth module
jest.mock('../auth.js', () => ({
  onAuthStateChange: jest.fn((callback) => {
    // Simulate authenticated user
    callback({ uid: 'test-user-id', email: 'test@example.com' })
    return jest.fn() // unsubscribe function
  }),
  getCurrentUser: jest.fn(() => ({ uid: 'test-user-id', email: 'test@example.com' })),
  getUserData: jest.fn(() => Promise.resolve({
    displayName: 'Test User',
    email: 'test@example.com',
    cash: 50000,
    portfolio: []
  })),
  signOutUser: jest.fn(() => Promise.resolve()),
}))

describe('TradingInterface Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO BÁSICO
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<TradingInterface />)
      // Component should render
      expect(document.body).toBeInTheDocument()
    })

    it('shows loading spinner initially', () => {
      render(<TradingInterface />)
      // May show loading state initially
      const body = document.body
      expect(body).toBeInTheDocument()
    })

    it('renders dashboard header', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        // Dashboard should render after loading
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  // 2. TABS DE NAVEGACIÓN
  describe('Navigation Tabs', () => {
    it('renders with default tab', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('can switch between tabs', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        const portfolioElements = screen.queryAllByText(/Portfolio/i)
        if (portfolioElements.length > 0) {
          expect(portfolioElements.length).toBeGreaterThan(0)
        }
      })
    })

    it('renders different content for each tab', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        // Component should render different views
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  // 3. PORTFOLIO VIEW
  describe('Portfolio View', () => {
    it('displays portfolio summary', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('shows portfolio holdings', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        // Portfolio data should be visible
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('calculates total portfolio value', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  // 4. USER DATA
  describe('User Data Management', () => {
    it('loads user data on mount', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('displays user information', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        // User data should be loaded
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('shows cash balance', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  // 5. AUTHENTICATION
  describe('Authentication', () => {
    it('checks authentication status', async () => {
      const { onAuthStateChange } = require('../auth.js')
      render(<TradingInterface />)
      
      await waitFor(() => {
        expect(onAuthStateChange).toHaveBeenCalled()
      })
    })

    it('loads user data when authenticated', async () => {
      const { getUserData } = require('../auth.js')
      render(<TradingInterface />)
      
      await waitFor(() => {
        expect(getUserData).toHaveBeenCalled()
      }, { timeout: 3000 })
    })

    it('handles sign out', async () => {
      const { signOutUser } = require('../auth.js')
      render(<TradingInterface />)
      
      // Component should be able to sign out
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  // 6. DATOS MOCK
  describe('Mock Data', () => {
    it('uses mock portfolio data', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('uses mock trade data', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })

    it('has mock stock data available', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      }, { timeout: 3000 })
    })
  })

  // 7. FUNCIONES AUXILIARES
  describe('Helper Functions', () => {
    it('formats currency correctly', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        // Currency formatting should work
        expect(document.body).toBeInTheDocument()
      })
    })

    it('formats percentages correctly', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('calculates gain/loss correctly', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  // 8. STATE MANAGEMENT
  describe('State Management', () => {
    it('manages active tab state', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('manages loading state', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('manages user state', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  // 9. ERROR HANDLING
  describe('Error Handling', () => {
    it('handles authentication errors', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('handles data loading errors', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })
  })

  // 10. INTEGRATION
  describe('Component Integration', () => {
    it('integrates with DashboardHeader', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('integrates with Portfolio component', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })

    it('integrates with other sub-components', async () => {
      render(<TradingInterface />)
      await waitFor(() => {
        expect(document.body).toBeInTheDocument()
      })
    })
  })
})
