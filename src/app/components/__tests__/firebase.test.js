// Mock Firebase modules before importing
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(() => ({})),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => ({})),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({ currentUser: null })),
}));

// Now import after mocking
import { db, auth } from '../firebase';

describe('Firebase Configuration', () => {
  it('should export db instance', () => {
    expect(db).toBeDefined();
    expect(db).not.toBeNull();
  });

  it('should export auth instance', () => {
    expect(auth).toBeDefined();
    expect(auth).not.toBeNull();
  });

  it('should have db as an object', () => {
    expect(typeof db).toBe('object');
  });

  it('should have auth as an object with currentUser property', () => {
    expect(typeof auth).toBe('object');
    expect(auth).toHaveProperty('currentUser');
  });
});
