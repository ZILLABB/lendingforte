import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Use environment variables with fallback to hardcoded values
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBLRKdnJRAKjNjh3t5SRwofz0UajwXyIwk",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "lendingforte.firebaseapp.com",
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL || "https://lendingforte-default-rtdb.firebaseio.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "lendingforte",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "lendingforte.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "460740639625",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:460740639625:web:bed63551a57e6e3953ff58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, database, auth, firestore, storage };
