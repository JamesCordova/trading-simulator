import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../page';
import { signUp, signIn, onAuthStateChange, getCurrentUser } from '../components/auth.js';
import { useRouter } from 'next/navigation';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock auth functions
jest.mock('../components/auth.js', () => ({
  signUp: jest.fn(),
  signIn: jest.fn(),
  onAuthStateChange: jest.fn(),
  getCurrentUser: jest.fn(),
  getUserData: jest.fn(),
}));

describe('LandingPage', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (getCurrentUser as jest.Mock).mockReturnValue(null);
    (onAuthStateChange as jest.Mock).mockImplementation((callback) => {
      // Call callback immediately with null user
      callback(null);
      return jest.fn(); // Return unsubscribe function
    });
  });

  describe('Initial Rendering', () => {
    it('should render the landing page with main heading', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        expect(screen.getByText(/Master Trading/i)).toBeInTheDocument();
      });
    });

    it('should display TradeSim logo', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        expect(screen.getByText('TradeSim')).toBeInTheDocument();
      });
    });

    it('should show sign in form by default', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
      });
    });

    it('should display feature list', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        expect(screen.getByText(/Real-time market simulation/i)).toBeInTheDocument();
        expect(screen.getByText(/Competitive leaderboards/i)).toBeInTheDocument();
        expect(screen.getByText(/100% risk-free trading/i)).toBeInTheDocument();
      });
    });
  });

  describe('Sign In Functionality', () => {
    it('should allow user to type email', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(emailInput.value).toBe('test@example.com');
      });
    });

    it('should allow user to type password', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput.value).toBe('password123');
      });
    });

    it('should toggle password visibility', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const passwordInput = screen.getByPlaceholderText(/password/i) as HTMLInputElement;
        const toggleButton = screen.getAllByRole('button').find(btn => 
          btn.getAttribute('aria-label')?.includes('password') || 
          btn.innerHTML.includes('Eye')
        );
        
        expect(passwordInput.type).toBe('password');
        
        if (toggleButton) {
          fireEvent.click(toggleButton);
          expect(passwordInput.type).toBe('text');
        }
      });
    });

    it('should call signIn on form submission with valid credentials', async () => {
      (signIn as jest.Mock).mockResolvedValue({ success: true });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('should show success message on successful sign in', async () => {
      (signIn as jest.Mock).mockResolvedValue({ success: true });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/redirecting to dashboard/i)).toBeInTheDocument();
      });
    });

    it('should show error message on failed sign in', async () => {
      (signIn as jest.Mock).mockResolvedValue({ success: false, error: 'Invalid credentials' });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/incorrect email\/password/i)).toBeInTheDocument();
      });
    });
  });

  describe('Sign Up Functionality', () => {
    it('should switch to sign up form', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const signUpButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(signUpButton);
      });

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
      });
    });

    it('should show name field in sign up mode', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        expect(screen.getByPlaceholderText(/enter your full name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/confirm your password/i)).toBeInTheDocument();
      });
    });

    it('should validate password match during sign up', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/enter your full name/i);
        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const confirmInput = screen.getByPlaceholderText(/confirm your password/i);
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmInput, { target: { value: 'different' } });
        
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
      });
    });

    it('should validate password length during sign up', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/enter your full name/i);
        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const confirmInput = screen.getByPlaceholderText(/confirm your password/i);
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: '12345' } });
        fireEvent.change(confirmInput, { target: { value: '12345' } });
        
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
      });
    });

    it('should validate name is required', async () => {
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/enter your full name/i);
        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const confirmInput = screen.getByPlaceholderText(/confirm your password/i);
        
        // Leave name empty
        fireEvent.change(nameInput, { target: { value: '   ' } }); // Whitespace only
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/name is required/i)).toBeInTheDocument();
      });
    });

    it('should call signUp on successful validation', async () => {
      (signUp as jest.Mock).mockResolvedValue({ success: true });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/enter your full name/i);
        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const confirmInput = screen.getByPlaceholderText(/confirm your password/i);
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(signUp).toHaveBeenCalledWith('john@example.com', 'password123', 'John Doe');
      });
    });

    it('should show success message on successful sign up', async () => {
      (signUp as jest.Mock).mockResolvedValue({ success: true });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const switchButton = screen.getByText(/need an account\? sign up/i);
        fireEvent.click(switchButton);
      });

      await waitFor(() => {
        const nameInput = screen.getByPlaceholderText(/enter your full name/i);
        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput = screen.getByPlaceholderText(/enter your password/i);
        const confirmInput = screen.getByPlaceholderText(/confirm your password/i);
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /create account/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/account created successfully/i)).toBeInTheDocument();
      });
    });
  });

  describe('Authentication State', () => {
    it('should redirect to dashboard when user is authenticated', async () => {
      const mockGetUserData = require('../components/auth.js').getUserData;
      mockGetUserData.mockResolvedValue({ success: true, data: { name: 'Test User' } });
      
      (onAuthStateChange as jest.Mock).mockImplementation((callback) => {
        setTimeout(() => {
          callback({ uid: '123', email: 'test@example.com', displayName: 'Test User' });
        }, 0);
        return jest.fn();
      });

      render(<LandingPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      }, { timeout: 3000 });
    });

    it('should redirect if current user exists on mount', async () => {
      (getCurrentUser as jest.Mock).mockReturnValue({ 
        uid: '123', 
        email: 'test@example.com' 
      });
      (onAuthStateChange as jest.Mock).mockImplementation((callback) => {
        return jest.fn();
      });

      render(<LandingPage />);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });

  describe('Form Interaction', () => {
    it('should clear error message when user starts typing', async () => {
      (signIn as jest.Mock).mockResolvedValue({ success: false, error: 'Invalid' });
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/incorrect/i)).toBeInTheDocument();
      });

      // Start typing to clear message
      const emailInput = screen.getByPlaceholderText(/email/i);
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });

      await waitFor(() => {
        expect(screen.queryByText(/incorrect/i)).not.toBeInTheDocument();
      });
    });

    it('should disable submit button while loading', async () => {
      (signIn as jest.Mock).mockImplementation(() => 
        new Promise(resolve => setTimeout(() => resolve({ success: true }), 100))
      );
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
        
        // Button should be disabled during loading
        expect(submitButton).toBeDisabled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle unexpected errors gracefully', async () => {
      (signIn as jest.Mock).mockRejectedValue(new Error('Network error'));
      
      render(<LandingPage />);
      
      await waitFor(() => {
        const emailInput = screen.getByPlaceholderText(/email/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        
        const submitButton = screen.getByRole('button', { name: /sign in/i });
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText(/unexpected error/i)).toBeInTheDocument();
      });
    });
  });
});
