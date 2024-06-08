// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDwdWH1qBjkcCaDpyX7ws6KMzwEQJJkL6c",
  authDomain: "cityride-nielit.firebaseapp.com",
  projectId: "cityride-nielit",
  storageBucket: "cityride-nielit.appspot.com",
  messagingSenderId: "321185798040",
  appId: "1:321185798040:web:02b19032b7301eb1debded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore (if needed)
const firestore = getFirestore(app);

// Export the initialized app and services
export { app, auth, firestore };
