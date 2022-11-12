import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import "./Authentication.scss";

const Authentication = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;
