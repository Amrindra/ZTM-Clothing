// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "ztm-clothing-db-13ee1.firebaseapp.com",
  projectId: "ztm-clothing-db-13ee1",
  storageBucket: "ztm-clothing-db-13ee1.appspot.com",
  messagingSenderId: "540926130827",
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// To use Google Authentication, first we need to initialize the GoogleAuthProvider class that we recieved
const provider = new GoogleAuthProvider();

// This setCustomParameters is use to tell google how we want google to behave
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Instantiated the firestore
export const db = getFirestore();
