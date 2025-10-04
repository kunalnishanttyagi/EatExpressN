// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "eatexpress-6703f.firebaseapp.com",
  projectId: "eatexpress-6703f",
  storageBucket: "eatexpress-6703f.firebasestorage.app",
  messagingSenderId: "279153876921",
  appId: "1:279153876921:web:86bc1162d34ed2cdbe6068",
  measurementId: "G-12BZD8ZQGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const auth = getAuth(app);


export { auth, analytics };