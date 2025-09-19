import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
  // apiKey: "AIzaSyDC0lgUlaXyBKxPguJqLteNhAqgTm0ERqY",
  // authDomain: "e-siksha-f4ce0.firebaseapp.com",
  // projectId: "e-siksha-f4ce0",
  // storageBucket: "e-siksha-f4ce0.firebasestorage.app",
  // messagingSenderId: "326135525221",
  // appId: "1:326135525221:web:019a9dc70e77c3a60a3b8c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);