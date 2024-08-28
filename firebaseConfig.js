// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore,FieldValue } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDaRaPiaO-IMGKrLpZDRuTckwGixdtUesU",
  authDomain: "the-madi.firebaseapp.com",
  projectId: "the-madi",
  storageBucket: "the-madi.appspot.com",
  messagingSenderId: "1020225404793",
  appId: "1:1020225404793:web:0dd63031395f22da31f9a8",
  measurementId: "G-J9MBSXGE4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage,FieldValue};