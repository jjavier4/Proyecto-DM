// Import the functions you need from the SDKs you need
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDH4gyWzX5JjsIz80lkdOU0V77AjpncWfs",
  authDomain: "la-fondita.firebaseapp.com",
  projectId: "la-fondita",
  storageBucket: "la-fondita.firebasestorage.app",
  messagingSenderId: "289752325671",
  appId: "1:289752325671:web:54db8cb48842d4af1a7802",
  measurementId: "G-QTZJY8RS0J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa los servicios que necesitas (Auth y Firestore)
export const auth = getAuth(app); // Para autenticación
export const db = getFirestore(app); // Para Firestore
