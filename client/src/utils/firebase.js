// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "examnotes-edbf3.firebaseapp.com",
  projectId: "examnotes-edbf3",
  storageBucket: "examnotes-edbf3.firebasestorage.app",
  messagingSenderId: "880398011939",
  appId: "1:880398011939:web:c89cc40fa2b055f6542b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}