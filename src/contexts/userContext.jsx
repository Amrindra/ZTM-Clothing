import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListenter,
} from "../utils/firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      // ...state meaning that spread all the same previous value objects accept the currentUser: payload that we want to modify
      return { ...state, currentUser: payload };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

export const UserProvider = ({ children }) => {
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE);
  console.log(currentUser);

  const setCurrentUser = (user) =>
    dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });

  // This is used to listen to the authentication once the component mounted
  useEffect(() => {
    // Passed user as a listener call back. if no signin "user param" will be null
    const unsubcribe = onAuthStateChangedListenter((user) => {
      // Checking if the user is brand new signin with google auth if so go ahead and create auth document for this user otherwise just sign in
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    // this clean up telling the onAuthStateChangedListenter to stop listening when the component unmount.
    //if we don't unsubscribe it will caush memory leak because onAuthStateChangedListenter will always listening to the events
    return unsubcribe;
  }, []);

  const value = { currentUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
