import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbuEIE3EEgt8iUSXXok-oezuP4lVtPESw",
  authDomain: "online-quizz-app.firebaseapp.com",
  projectId: "online-quizz-app",
  storageBucket: "online-quizz-app.firebasestorage.app",
  messagingSenderId: "419798900551",
  appId: "1:419798900551:web:934f7d0beb121632583662"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };