import SignUp from "../../components/signUp/SignUp";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import "./SignIn.scss";

const SignIn = () => {
  const logInGoogleUser = async () => {
    // First we need to get the response from the user.
    const response = await signInWithGooglePopup();
    // Once users sign in we pass the response.user to createUserDocumentFromAuth to create document if users never been existing
    const userDocRef = await createUserDocumentFromAuth(response.user);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logInGoogleUser}>Sign in with Google Popup</button>
      <SignUp />
    </div>
  );
};

export default SignIn;
