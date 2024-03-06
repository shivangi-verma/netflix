// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwZb5Hjz1amWGXWkbcRKZImT96i-fH5f8",
  authDomain: "react-netflix-clone-e73f9.firebaseapp.com",
  projectId: "react-netflix-clone-e73f9",
  storageBucket: "react-netflix-clone-e73f9.appspot.com",
  messagingSenderId: "925259587486",
  appId: "1:925259587486:web:56869195093ed6d28f008f",
  measurementId: "G-HS4G1KP3LJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
