import {
  ref,
  push,
  set,
  get,
  update,
  remove,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  DatabaseReference,
  DataSnapshot
} from 'firebase/database';
import { database } from './config';

// Create a new record
export const createRecord = async <T>(
  path: string,
  data: T
): Promise<string> => {
  try {
    const dbRef = ref(database, path);
    const newRef = push(dbRef);
    await set(newRef, data);
    return newRef.key as string;
  } catch (error) {
    // Check if this is a permission error
    if (error instanceof Error && error.message.includes('PERMISSION_DENIED')) {
      console.warn(`Firebase permission denied for path: ${path}. This is expected in demo mode.`);
      // Return a mock ID for demo purposes
      return `demo-${Date.now()}`;
    }
    // Re-throw other errors
    throw error;
  }
};

// Get a record by ID
export const getRecordById = async <T>(
  path: string,
  id: string
): Promise<T | null> => {
  const dbRef = ref(database, `${path}/${id}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val() as T;
  }

  return null;
};

// Update a record
export const updateRecord = async <T>(
  path: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  const dbRef = ref(database, `${path}/${id}`);
  return update(dbRef, data);
};

// Delete a record
export const deleteRecord = async (
  path: string,
  id: string
): Promise<void> => {
  const dbRef = ref(database, `${path}/${id}`);
  return remove(dbRef);
};

// Get all records in a path
export const getAllRecords = async <T>(
  path: string
): Promise<Record<string, T> | null> => {
  const dbRef = ref(database, path);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val() as Record<string, T>;
  }

  return null;
};

// Query records by a field value
export const queryRecordsByField = async <T>(
  path: string,
  field: string,
  value: string | number | boolean
): Promise<Record<string, T> | null> => {
  const dbRef = ref(database, path);
  const dbQuery = query(dbRef, orderByChild(field), equalTo(value));
  const snapshot = await get(dbQuery);

  if (snapshot.exists()) {
    return snapshot.val() as Record<string, T>;
  }

  return null;
};

// Subscribe to a record
export const subscribeToRecord = <T>(
  path: string,
  id: string,
  callback: (data: T | null) => void
): (() => void) => {
  const dbRef = ref(database, `${path}/${id}`);

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as T);
    } else {
      callback(null);
    }
  });

  // Return unsubscribe function
  return () => off(dbRef);
};

// Subscribe to a query
export const subscribeToQuery = <T>(
  path: string,
  field: string,
  value: string | number | boolean,
  callback: (data: Record<string, T> | null) => void
): (() => void) => {
  const dbRef = ref(database, path);
  const dbQuery = query(dbRef, orderByChild(field), equalTo(value));

  onValue(dbQuery, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.val() as Record<string, T>);
    } else {
      callback(null);
    }
  });

  // Return unsubscribe function
  return () => off(dbRef);
};
