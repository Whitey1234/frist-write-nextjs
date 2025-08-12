// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGB2j-I5uGelQ4CVTq-KAEbGelQx026XI",
  authDomain: "first-write-cd0fa.firebaseapp.com",
  projectId: "first-write-cd0fa",
  storageBucket: "first-write-cd0fa.firebasestorage.app",
  messagingSenderId: "389054778929",
  appId: "1:389054778929:web:6ea97ac7f55dd83f7f0f10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app)