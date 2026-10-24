// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7QW8Iwn80uwakMMJDE72Ig919LWhJoZA",
  authDomain: "meu-aplicativo-de248.firebaseapp.com",
  projectId: "meu-aplicativo-de248",
  storageBucket: "meu-aplicativo-de248.firebasestorage.app",
  messagingSenderId: "1045076284832",
  appId: "1:1045076284832:web:515286aeb47fb8c39080c5",
  measurementId: "G-XX4D6RTM0Z",
  databaseURL: "https://meu-aplicativo-de248-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
export const db = getFirestore(app);