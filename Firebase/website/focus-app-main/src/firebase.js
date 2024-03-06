// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1zhvsZHlRTynqMCETzGrx2qZ8CyrSXCE",
  authDomain: "aspproject-6b683.firebaseapp.com",
  databaseURL: "https://aspproject-6b683-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aspproject-6b683",
  storageBucket: "aspproject-6b683.appspot.com",
  messagingSenderId: "580257877299",
  appId: "1:580257877299:web:652f9dbb5ebe9931d28246",
  measurementId: "G-ML5V1NTQ68"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimedb = getDatabase(app);
export default app;