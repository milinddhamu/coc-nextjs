// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCof-q-_4SkbLOqIk9Of7qTYmPJzxPgEkI",
  authDomain:"coc-api-express.firebaseapp.com" ,
  projectId:"coc-api-express" ,
  storageBucket:"coc-api-express.appspot.com" ,
  messagingSenderId:"395851423321" ,
  appId:"1:395851423321:web:1b322c4a27848e466c5b48" ,
  measurementId:"G-F6HJM936C2" 
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// initialize db
export const db = getFirestore(app);
const storage = getStorage()
// exporting db
