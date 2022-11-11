import { signInWithGooglePopup } from "../../utils/firebase/firebase";
import "./SignIn.scss";

const SignIn = () => {
  const logInGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    console.log(response);
  };
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logInGoogleUser}>Sign in with Google Popup</button>
    </div>
  );
};

export default SignIn;
