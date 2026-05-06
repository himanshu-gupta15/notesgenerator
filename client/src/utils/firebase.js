// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD46hGX16zSDzT9uv0VXchO9sVn_zhlcE",
  authDomain: "whats-clone-389e9.firebaseapp.com",
  projectId: "whats-clone-389e9",
  storageBucket: "whats-clone-389e9.firebasestorage.app",
  messagingSenderId: "664123018675",
  appId: "1:664123018675:web:831725b158c16b65738fc6",
  measurementId: "G-G920BESS73"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {auth, provider}
