import React from 'react';
import { render } from '@testing-library/react';
import DashboardPage from '../dashboard/page';

// Mock TradingInterface component
jest.mock('../components/TradingInterface', () => {
  return function MockTradingInterface() {
    return <div data-testid="trading-interface">Trading Interface</div>;
  };
});

describe('Dashboard Page', () => {
  it('should render TradingInterface component', () => {
    const { getByTestId } = render(<DashboardPage />);
    expect(getByTestId('trading-interface')).toBeInTheDocument();
  });

  it('should render Trading Interface text', () => {
    const { getByText } = render(<DashboardPage />);
    expect(getByText('Trading Interface')).toBeInTheDocument();
  });
});
