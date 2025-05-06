// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// import { firebaseConfig } from './firebaseConfig'; // Add proper import path

const firebaseConfig = {
    apiKey: "AIzaSyBi4YLq8vah40AxuUgTw1pJdRm2rlj1Q8Y",
    authDomain: "des427-8f9bb.firebaseapp.com",
    projectId: "des427-8f9bb",
    storageBucket: "des427-8f9bb.firebasestorage.app",
    messagingSenderId: "56584507771",
    appId: "1:56584507771:web:65577d2b650e684ea16dde",
    measurementId: "G-BFHVZZZEL5"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);