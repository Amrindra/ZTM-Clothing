import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import Button from "../button/Button";
import FormInput from "../formInput/FormInput";
import "./SignUp.scss";

const defaultFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(defaultFormData);

  // console.log(formData);

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const { email, password, confirmPassword, displayName } = formData;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // This line will save the user to the database
      await createUserDocumentFromAuth(response.user, { displayName });
      resetFormData();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("User creation encountered error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account? </h2>
      <span>Sign Up with email and password</span>
      <form onSubmit={handleOnSubmit}>
        <FormInput
          label="Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleOnChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
