import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/userAction";
import {} from "../../utils/firebase/firebase";
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
  const { email, password, confirmPassword, displayName } = formData;
  const dispatch = useDispatch();

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormData();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
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
