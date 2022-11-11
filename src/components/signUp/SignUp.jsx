import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
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
    <div>
      <h1>Sign Up with email and password</h1>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="">Name</label>
        <input
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          name="email"
          value={email}
          onChange={handleOnChange}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          name="password"
          value={password}
          onChange={handleOnChange}
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleOnChange}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
