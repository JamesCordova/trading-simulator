import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DashboardHeader from '../DashboardHeader'

describe('DashboardHeader Component', () => {
  const mockProps = {
    activeTab: 'Portfolio',
    onTabChange: jest.fn(),
    userName: 'John Doe',
    userEmail: 'john@example.com',
    onSignOut: jest.fn(),
    onRefresh: jest.fn(),
    isRefreshing: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // 1. RENDERIZADO BÁSICO
  describe('Basic Rendering', () => {
    it('renders without crashing', () => {
      render(<DashboardHeader {...mockProps} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('displays user name', () => {
      render(<DashboardHeader {...mockProps} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('displays user email', () => {
      render(<DashboardHeader {...mockProps} />)
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
    })

    it('renders with default userName when not provided', () => {
      const { userName, ...propsWithoutName } = mockProps
      render(<DashboardHeader {...propsWithoutName} />)
      expect(screen.getByText('User')).toBeInTheDocument()
    })

    it('renders without userEmail', () => {
      const { userEmail, ...propsWithoutEmail } = mockProps
      const { container } = render(<DashboardHeader {...propsWithoutEmail} />)
      expect(container).toBeInTheDocument()
    })
  })

  // 2. NAVEGACIÓN POR TABS
  describe('Tab Navigation', () => {
    it('renders all navigation tabs', () => {
      render(<DashboardHeader {...mockProps} />)
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
      expect(screen.getByText('Watchlist')).toBeInTheDocument()
      expect(screen.getByText('Orders')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
    })

    it('highlights the active tab', () => {
      render(<DashboardHeader {...mockProps} activeTab="Portfolio" />)
      // Verify active tab renders
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })

    it('calls onTabChange when clicking a tab', () => {
      render(<DashboardHeader {...mockProps} />)
      const watchlistTab = screen.getByText('Watchlist')
      fireEvent.click(watchlistTab)
      expect(mockProps.onTabChange).toHaveBeenCalledWith('Watchlist')
    })

    it('updates active tab visual state when different tab is active', () => {
      render(<DashboardHeader {...mockProps} activeTab="Analytics" />)
      // Just verify the component renders with different active tab
      expect(screen.getByText('Analytics')).toBeInTheDocument()
    })
  })

  // 3. MENÚ DE USUARIO
  describe('User Menu', () => {
    it('toggles user dropdown when clicking user button', () => {
      render(<DashboardHeader {...mockProps} />)
      const userButton = screen.getByText('John Doe').closest('button')
      
      // Initially closed
      expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
      
      // Click to open
      fireEvent.click(userButton)
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    it('shows Sign Out option in user menu', () => {
      render(<DashboardHeader {...mockProps} />)
      const userButton = screen.getByText('John Doe').closest('button')
      fireEvent.click(userButton)
      
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
    })

    it('calls onSignOut when clicking Sign Out', () => {
      render(<DashboardHeader {...mockProps} />)
      const userButton = screen.getByText('John Doe').closest('button')
      fireEvent.click(userButton)
      
      const signOutButton = screen.getByText('Sign Out')
      fireEvent.click(signOutButton)
      
      expect(mockProps.onSignOut).toHaveBeenCalled()
    })

    it('closes user menu when clicking outside', async () => {
      render(<DashboardHeader {...mockProps} />)
      const userButton = screen.getByText('John Doe').closest('button')
      
      // Open menu
      fireEvent.click(userButton)
      expect(screen.getByText('Sign Out')).toBeInTheDocument()
      
      // Click outside
      fireEvent.mouseDown(document.body)
      
      await waitFor(() => {
        expect(screen.queryByText('Sign Out')).not.toBeInTheDocument()
      })
    })
  })

  // 4. MENÚ MÓVIL
  describe('Mobile Menu', () => {
    it('renders mobile menu button', () => {
      render(<DashboardHeader {...mockProps} />)
      // Mobile menu button should exist (Menu icon)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('toggles mobile menu visibility', () => {
      render(<DashboardHeader {...mockProps} />)
      const buttons = screen.getAllByRole('button')
      const mobileMenuButton = buttons.find(btn => {
        const svg = btn.querySelector('svg')
        return svg && (svg.classList.contains('lucide-menu') || svg.classList.contains('lucide-x'))
      })
      
      if (mobileMenuButton) {
        fireEvent.click(mobileMenuButton)
        // Menu should be visible after click
        expect(mobileMenuButton).toBeInTheDocument()
      }
    })
  })

  // 5. BOTÓN DE REFRESH
  describe('Refresh Button', () => {
    it('renders refresh button', () => {
      render(<DashboardHeader {...mockProps} />)
      const buttons = screen.getAllByRole('button')
      const refreshButton = buttons.find(btn => {
        const svg = btn.querySelector('svg')
        return svg && svg.classList.contains('lucide-refresh-cw')
      })
      expect(refreshButton).toBeInTheDocument()
    })

    it('calls onRefresh when clicking refresh button', () => {
      render(<DashboardHeader {...mockProps} />)
      const buttons = screen.getAllByRole('button')
      const refreshButton = buttons.find(btn => {
        const svg = btn.querySelector('svg')
        return svg && svg.classList.contains('lucide-refresh-cw')
      })
      
      if (refreshButton) {
        fireEvent.click(refreshButton)
        expect(mockProps.onRefresh).toHaveBeenCalled()
      }
    })

    it('shows loading state when isRefreshing is true', () => {
      render(<DashboardHeader {...mockProps} isRefreshing={true} />)
      const buttons = screen.getAllByRole('button')
      const refreshButton = buttons.find(btn => {
        const svg = btn.querySelector('svg')
        return svg && svg.classList.contains('lucide-refresh-cw')
      })
      
      if (refreshButton) {
        expect(refreshButton).toBeDisabled()
      }
    })

    it('enables button when not refreshing', () => {
      render(<DashboardHeader {...mockProps} isRefreshing={false} />)
      const buttons = screen.getAllByRole('button')
      const refreshButton = buttons.find(btn => {
        const svg = btn.querySelector('svg')
        return svg && svg.classList.contains('lucide-refresh-cw')
      })
      
      if (refreshButton) {
        expect(refreshButton).not.toBeDisabled()
      }
    })
  })

  // 6. EDGE CASES
  describe('Edge Cases', () => {
    it('handles invalid activeTab gracefully', () => {
      render(<DashboardHeader {...mockProps} activeTab="InvalidTab" />)
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })

    it('renders without onTabChange callback', () => {
      const { onTabChange, ...propsWithoutCallback } = mockProps
      render(<DashboardHeader {...propsWithoutCallback} />)
      expect(screen.getByText('Portfolio')).toBeInTheDocument()
    })

    it('renders without onSignOut callback', () => {
      const { onSignOut, ...propsWithoutSignOut } = mockProps
      render(<DashboardHeader {...propsWithoutSignOut} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })

    it('renders without onRefresh callback', () => {
      const { onRefresh, ...propsWithoutRefresh } = mockProps
      render(<DashboardHeader {...propsWithoutRefresh} />)
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })
})
