// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore-compat.js';
import 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage-compat.js';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMDuFnNwp1mVlRVPotB_NkBvmbmNWxTf4",
  authDomain: "restaurante-82ef5.firebaseapp.com",
  projectId: "restaurante-82ef5",
  storageBucket: "restaurante-82ef5.firebasestorage.app",
  messagingSenderId: "1056580102450",
  appId: "1:1056580102450:web:e3dfaca294d96455ef8f2b",
  measurementId: "G-B682R8KLZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = app.firestore();

export { auth, db };