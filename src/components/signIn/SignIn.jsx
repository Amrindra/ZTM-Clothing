import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";
import Button from "../button/Button";
import FormInput from "../formInput/FormInput";
import "./SignIn.scss";

const defaultFormData = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const { email, password } = formData;

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const signInGoogleUser = async () => {
    // First we need to get the response from the user.
    const response = await signInWithGooglePopup();
    // Once users sign in we pass the response.user to createUserDocumentFromAuth to create document if users never been existing
    await createUserDocumentFromAuth(response.user);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signAuthUserWithEmailAndPassword(email, password);

      console.log(response);
      resetFormData();
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        alert("Wrong credential!");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account? </h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleOnChange}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleOnChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInGoogleUser} buttonType="google">
            Sign In with google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;