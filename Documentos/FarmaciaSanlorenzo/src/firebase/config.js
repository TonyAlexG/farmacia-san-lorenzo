import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Configuración con variables de entorno
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1bW7YP5uUKs4q8MpRC-m4_G2EDESV-1s",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "farmaciatony-9a4a1.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "farmaciatony-9a4a1",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "farmaciatony-9a4a1.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "921333254540",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:921333254540:web:d76d4a3ac9021b14f1eea9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5QFKWWRRDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;