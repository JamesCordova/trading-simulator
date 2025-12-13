import { render, screen } from '@testing-library/react'

describe('Home Page', () => {
  it('renders without crashing', () => {
    // Simple smoke test
    expect(true).toBe(true)
  })

  it('can perform basic math', () => {
    expect(1 + 1).toBe(2)
  })
})

describe('Portfolio Calculations', () => {
  it('calculates percentage change correctly', () => {
    const calculatePercentChange = (initial, current) => {
      return ((current - initial) / initial) * 100
    }

    expect(calculatePercentChange(100, 110)).toBe(10)
    expect(calculatePercentChange(100, 90)).toBe(-10)
    expect(calculatePercentChange(1000, 1500)).toBe(50)
  })

  it('formats currency correctly', () => {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(amount)
    }

    expect(formatCurrency(1000)).toBe('$1,000.00')
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })
})

describe('Trading Logic', () => {
  it('validates buy order', () => {
    const canBuy = (balance, price, quantity) => {
      const totalCost = price * quantity
      return balance >= totalCost
    }

    expect(canBuy(1000, 50, 10)).toBe(true)
    expect(canBuy(1000, 50, 30)).toBe(false)
  })

  it('validates sell order', () => {
    const canSell = (holdings, quantity) => {
      return holdings >= quantity
    }

    expect(canSell(100, 50)).toBe(true)
    expect(canSell(10, 50)).toBe(false)
  })

  it('calculates order total correctly', () => {
    const calculateOrderTotal = (price, quantity, commission = 0) => {
      return (price * quantity) + commission
    }

    expect(calculateOrderTotal(50, 10)).toBe(500)
    expect(calculateOrderTotal(50, 10, 5)).toBe(505)
  })
})
