import { createContext, useEffect, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListenter,
} from "../utils/firebase/firebase";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

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
  });

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
