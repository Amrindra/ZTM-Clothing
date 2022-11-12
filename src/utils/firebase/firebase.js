// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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
const googleProvider = new GoogleAuthProvider();

// This setCustomParameters is use to tell google how we want google to behave
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Instantiated the firestore (firststore is a database)
export const db = getFirestore();

// ****CREATING THE USER DOCUMENT IN THE FIREBASE STORE****
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
) => {
  // This line is used to protect the app from breaking in case of google change their method
  if (!userAuth) return;

  // uid comes from the auth response when user sign in
  const userDocRef = doc(db, "users", userAuth.uid);

  // the snapshot allows us to check whether or not there is an instant of database exist and access the data
  const userSnapshot = await getDoc(userDocRef);

  // This condition will create user document when the user doesn't exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInfo,
      });
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }

  return userDocRef;
};

// **** CREATE USER BY EMAIL AND PASSWORD*****
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// **** SIGN IN USER BY EMAIL AND PASSWORD****
export const signAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// **** SIGN OUT USER ****
export const signOutUser = async () => await signOut(auth);

// **** Observer for Change listenter****
export const onAuthStateChangedListenter = (callback) => {
  // onAuthStateChanged is used to listen the any chanage such as user sign in or sing out
  // when this method get called, we say hey create a listener for me using this callback
  onAuthStateChanged(auth, callback);
};
