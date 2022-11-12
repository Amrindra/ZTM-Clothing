import SignIn from "../../components/signIn/SignIn";
import SignUp from "../../components/signUp/SignUp";
import "./Authentication.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default Authentication;
