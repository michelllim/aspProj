// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth  } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA1zhvsZHlRTynqMCETzGrx2qZ8CyrSXCE",
  authDomain: "aspproject-6b683.firebaseapp.com",
  databaseURL: "https://aspproject-6b683-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aspproject-6b683",
  storageBucket: "aspproject-6b683.appspot.com",
  messagingSenderId: "580257877299",
  appId: "1:580257877299:web:31001b2e0c46c059d28246",
  measurementId: "G-XL7Q7108H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;