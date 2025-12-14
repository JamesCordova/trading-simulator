import {
  signUp,
  signIn,
  signOutUser,
  getUserData,
  updateUserProfile,
  onAuthStateChange,
  getCurrentUser,
} from '../auth';

// Mock Firebase modules
jest.mock('../firebase.js', () => ({
  auth: { currentUser: null },
  db: {},
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
}));

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

describe('Auth Functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  describe('signUp', () => {
    it('should successfully create a new user', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
      };

      createUserWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });
      updateProfile.mockResolvedValue();
      setDoc.mockResolvedValue();

      const result = await signUp('test@example.com', 'password123', 'Test User');

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(updateProfile).toHaveBeenCalledWith(mockUser, {
        displayName: 'Test User',
      });
      expect(setDoc).toHaveBeenCalled();
    });

    it('should handle signup errors', async () => {
      createUserWithEmailAndPassword.mockRejectedValue(
        new Error('Email already in use')
      );

      const result = await signUp('test@example.com', 'password123', 'Test User');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Email already in use');
    });
  });

  describe('signIn', () => {
    it('should successfully sign in a user', async () => {
      const mockUser = {
        uid: 'test-uid',
        email: 'test@example.com',
      };

      signInWithEmailAndPassword.mockResolvedValue({
        user: mockUser,
      });
      updateDoc.mockResolvedValue();

      const result = await signIn('test@example.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.user).toEqual(mockUser);
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        'test@example.com',
        'password123'
      );
      expect(updateDoc).toHaveBeenCalled();
    });

    it('should handle signin errors', async () => {
      signInWithEmailAndPassword.mockRejectedValue(
        new Error('Invalid credentials')
      );

      const result = await signIn('test@example.com', 'wrongpassword');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid credentials');
    });
  });

  describe('signOutUser', () => {
    it('should successfully sign out a user', async () => {
      signOut.mockResolvedValue();

      const result = await signOutUser();

      expect(result.success).toBe(true);
      expect(signOut).toHaveBeenCalledWith(expect.anything());
    });

    it('should handle signout errors', async () => {
      signOut.mockRejectedValue(new Error('Signout failed'));

      const result = await signOutUser();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Signout failed');
    });
  });

  describe('getUserData', () => {
    it('should successfully get user data', async () => {
      const mockData = {
        uid: 'test-uid',
        email: 'test@example.com',
        displayName: 'Test User',
      };

      getDoc.mockResolvedValue({
        exists: () => true,
        data: () => mockData,
      });

      const result = await getUserData('test-uid');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockData);
      expect(getDoc).toHaveBeenCalled();
    });

    it('should handle user not found', async () => {
      getDoc.mockResolvedValue({
        exists: () => false,
      });

      const result = await getUserData('test-uid');

      expect(result.success).toBe(false);
      expect(result.error).toBe('User data not found');
    });

    it('should handle getUserData errors', async () => {
      getDoc.mockRejectedValue(new Error('Database error'));

      const result = await getUserData('test-uid');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Database error');
    });
  });

  describe('updateUserProfile', () => {
    it('should successfully update user profile', async () => {
      updateDoc.mockResolvedValue();

      const updates = { displayName: 'New Name' };
      const result = await updateUserProfile('test-uid', updates);

      expect(result.success).toBe(true);
      expect(updateDoc).toHaveBeenCalled();
    });

    it('should handle update errors', async () => {
      updateDoc.mockRejectedValue(new Error('Update failed'));

      const result = await updateUserProfile('test-uid', {});

      expect(result.success).toBe(false);
      expect(result.error).toBe('Update failed');
    });
  });

  describe('onAuthStateChange', () => {
    it('should call onAuthStateChanged with callback', () => {
      const mockCallback = jest.fn();
      onAuthStateChanged.mockReturnValue(() => {});

      onAuthStateChange(mockCallback);

      expect(onAuthStateChanged).toHaveBeenCalledWith(
        expect.anything(),
        mockCallback
      );
    });
  });

  describe('getCurrentUser', () => {
    it('should return current user', () => {
      const { auth } = require('../firebase.js');
      auth.currentUser = { uid: 'test-uid' };

      const result = getCurrentUser();

      expect(result).toEqual({ uid: 'test-uid' });
    });

    it('should return null when no user is logged in', () => {
      const { auth } = require('../firebase.js');
      auth.currentUser = null;

      const result = getCurrentUser();

      expect(result).toBeNull();
    });
  });
});
