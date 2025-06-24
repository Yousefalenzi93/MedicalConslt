// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsrOCUDUevhiv2rYc5ATx4NTnBkKQ-T9k",
  authDomain: "mtmconsult-f48f1.firebaseapp.com",
  projectId: "mtmconsult-f48f1",
  storageBucket: "mtmconsult-f48f1.firebasestorage.app",
  messagingSenderId: "668149959230",
  appId: "1:668149959230:web:06c54fd158d03faf8e9f6f",
  measurementId: "G-TR97F5BZ7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;
