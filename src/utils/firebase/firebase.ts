import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
  UserCredential,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDDU4V-_QV3M8GyhC9SVieRTDM4dbiT0Yk',
  authDomain: 'crwn-clothing-db-98d4d.firebaseapp.com',
  projectId: 'crwn-clothing-db-98d4d',
  storageBucket: 'crwn-clothing-db-98d4d.appspot.com',
  messagingSenderId: '626766232035',
  appId: '1:626766232035:web:506621582dab103a4d08d6',
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

type CategoryData = {
  imageUrl: string;
  items: CategoryItem[];
  title: string;
};

export const getCategoriesAndDocuments = async (): Promise<CategoryData[]> => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as CategoryData
  );
};

export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: AdditionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential | void> => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async (): Promise<void> => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};




// *** REGULAR JS *********
// https://firebase.google.com/docs/web/setup#available-libraries
// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   signInWithRedirect,
//   signInWithPopup,
//   GoogleAuthProvider,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   writeBatch,
//   query,
//   getDocs,
// } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: "ztm-clothing-db-13ee1.firebaseapp.com",
//   projectId: "ztm-clothing-db-13ee1",
//   storageBucket: "ztm-clothing-db-13ee1.appspot.com",
//   messagingSenderId: "540926130827",
//   appId: process.env.REACT_APP_APP_ID,
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);

// // To use Google Authentication, first we need to initialize the GoogleAuthProvider class that we recieved
// const googleProvider = new GoogleAuthProvider();

// // This setCustomParameters is use to tell google how we want google to behave
// googleProvider.setCustomParameters({
//   prompt: "select_account",
// });

// export const auth = getAuth();
// export const signInWithGooglePopup = () =>
//   signInWithPopup(auth, googleProvider);

// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

// // Instantiated the firestore (firststore is a database)
// export const db = getFirestore();

// // This function is used to add collection to the database
// // collectionKey parameter is the name of collection that we want to add to the firestore
// // objectsToAdd parameter is from local object that we want to push to the database via this funtion
// export const addCollectionAndDocuments = async (
//   collectionKey,
//   objectsToAdd,
//   field
// ) => {
//   // collectionKey in this case will be whaterever name that we want to name in the firestore collection
//   const batch = writeBatch(db);
//   const collectionRef = collection(db, collectionKey);

//   //Recieve data from local data and then loop through it and add them to the document
//   objectsToAdd.forEach((object) => {
//     const docRef = doc(collectionRef, object.title.toLowerCase());
//     batch.set(docRef, object);
//   });

//   await batch.commit();
//   console.log("done");
// };

// // Fetching / Getting data from the document
// export const getCategoriesAndDocuments = async () => {
//   const collectionRef = collection(db, "categories");
//   const query_collection = query(collectionRef);

//   const querySnapshot = await getDocs(query_collection);
//   return querySnapshot.docs.map((doc) => doc.data());
// };

// // ****CREATING THE USER DOCUMENT IN THE FIREBASE STORE****
// export const createUserDocumentFromAuth = async (
//   userAuth,
//   additionalInfo = {}
// ) => {
//   // This line is used to protect the app from breaking in case of google change their method
//   if (!userAuth) return;

//   // uid comes from the auth response when user sign in
//   const userDocRef = doc(db, "users", userAuth.uid);

//   // the snapshot allows us to check whether or not there is an instant of database exist and access the data
//   const userSnapshot = await getDoc(userDocRef);

//   // This condition will create user document when the user doesn't exist
//   if (!userSnapshot.exists()) {
//     const { displayName, email } = userAuth;
//     const createAt = new Date();

//     try {
//       await setDoc(userDocRef, {
//         displayName,
//         email,
//         createAt,
//         ...additionalInfo,
//       });
//     } catch (error) {
//       console.log("Error creating the user", error.message);
//     }
//   }

//   return userSnapshot;
// };

// // **** CREATE USER BY EMAIL AND PASSWORD*****
// export const createAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await createUserWithEmailAndPassword(auth, email, password);
// };

// // **** SIGN IN USER BY EMAIL AND PASSWORD****
// export const signInAuthUserWithEmailAndPassword = async (email, password) => {
//   if (!email || !password) return;

//   return await signInWithEmailAndPassword(auth, email, password);
// };

// // **** SIGN OUT USER ****
// export const signOutUser = async () => await signOut(auth);

// // **** Observer for Change listenter****
// export const onAuthStateChangedListenter = (callback) => {
//   // onAuthStateChanged is used to listen the any chanage such as user sign in or sing out
//   // when this method get called, we say hey create a listener for me using this callback
//   onAuthStateChanged(auth, callback);
// };

// export const getCurrentUser = () => {
//   return new Promise((resolve, reject) => {
//     const unsubscribe = onAuthStateChanged(
//       auth,
//       (userAuth) => {
//         unsubscribe();
//         resolve(userAuth);
//       },
//       reject
//     );
//   });
// };
