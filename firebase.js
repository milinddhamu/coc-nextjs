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
  apiKey: process.env.FIREBASE_API,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN ,
  projectId:process.env.FIREBASE_PROJECT_ID ,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET ,
  messagingSenderId:process.env.FIREBASE_MESSAGING_SENDER_ID ,
  appId:process.env.FIREBASE_APP_ID ,
  measurementId:process.env.FIREBASE_MEASUREMENT_ID 
};

// Initialize Firebase
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

// initialize db
export const db = getFirestore(app);
const storage = getStorage()
// exporting db
