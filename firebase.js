import { getApps, getApp, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHTZm5h5kNSD5tPesTbDfuFP1heO0jCok",
  authDomain: "shiftway-47cd9.firebaseapp.com",
  databaseURL: "https://shiftway-47cd9-default-rtdb.firebaseio.com",
  projectId: "shiftway-47cd9",
  storageBucket: "shiftway-47cd9.appspot.com",
  messagingSenderId: "382098907273",
  appId: "1:382098907273:web:e86c34f245d11bfe93a658",
  measurementId: "G-76ZEX0J47J"
};

let app;
let auth;

// Initialize Firebase
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig); 
} else {
  app = getApp();
}

// Initializar Firebase Auth with persistence using AsyncStorage
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
} catch (error) {
  if (error.code === 'auth/already-initialized') {
    auth = getAuth(app); // Use the already initialized auth instance
  } else {
    throw error; // If it's a different error, rethrow it
  }
}

export default { auth, app };