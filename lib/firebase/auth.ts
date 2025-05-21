import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User,
  UserCredential
} from 'firebase/auth';
import { auth } from './config';

// Register a new user
export const registerUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Update user profile
export const updateUserProfile = async (
  displayName: string, 
  photoURL?: string
): Promise<void> => {
  if (!auth.currentUser) throw new Error('No user is signed in');
  
  return updateProfile(auth.currentUser, {
    displayName,
    photoURL: photoURL || null
  });
};

// Sign in existing user
export const signInUser = async (
  email: string, 
  password: string
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign out user
export const signOutUser = async (): Promise<void> => {
  return signOut(auth);
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  return sendPasswordResetEmail(auth, email);
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};
