// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAH_0S25hdiGAam8IdGj662bfAH1mfXifM",
  authDomain: "contect-app-165d6.firebaseapp.com",
  projectId: "contect-app-165d6",
  storageBucket: "contect-app-165d6.appspot.com",
  messagingSenderId: "421404787300",
  appId: "1:421404787300:web:df9136383b74bfc3511571",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
