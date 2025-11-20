import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const getFirebaseConfig = () => {
  // 1. Try to use the environment's injected config (for this preview)
  if (typeof window !== 'undefined' && (window as any).__firebase_config) {
    try {
      return JSON.parse((window as any).__firebase_config);
    } catch (e) {
      console.error("Error parsing firebase config", e);
    }
  }
  
  // 2. Fallback: Use standard Next.js env variables (for your local setup)
  // You will need to create a .env.local file with these values from your Firebase Console
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-key",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(getFirebaseConfig()) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };