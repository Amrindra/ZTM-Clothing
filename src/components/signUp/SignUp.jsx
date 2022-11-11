import { useState } from "react";
import "./SignUp.scss";

const SignUp = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
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
          value={formData.displayName}
          onChange={handleOnChange}
        />

        <label htmlFor="">Email</label>
        <input
          type="email"
          required
          name="email"
          value={formData.email}
          onChange={handleOnChange}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          required
          name="password"
          value={formData.password}
          onChange={handleOnChange}
        />

        <label htmlFor="">Confirm Password</label>
        <input
          type="password"
          required
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleOnChange}
        />
      </form>
    </div>
  );
};

export default SignUp;
