import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC5BoHrSnFpo9FXY4DWVjf0EYdMQ2G75HA",
  authDomain: "mern-instagram1.firebaseapp.com",
  databaseURL: "https://mern-instagram1.firebaseio.com",
  projectId: "mern-instagram1",
  storageBucket: "mern-instagram1.appspot.com",
  messagingSenderId: "149671182607",
  appId: "1:149671182607:web:a1063fb48d2bfb725b3e7a",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
