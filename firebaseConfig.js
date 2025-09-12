// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Optionally import the services that you want to use
import { getAuth } from 'firebase/auth';
// import {...} from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByr9juNADuQBJ4vsoA36vxG5DwMHyKMKY",
  authDomain: "cm3070-final-project-su-fc520.firebaseapp.com",
  projectId: "cm3070-final-project-su-fc520",
  storageBucket: "cm3070-final-project-su-fc520.firebasestorage.app",
  messagingSenderId: "128563924988",
  appId: "1:128563924988:web:8fd102167468b3ac11ac79",
  measurementId: "G-Q0D8YN45G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };