import { useSelector } from "react-redux";
import "./login.style.css";

import LoginFooter from "./components/LoginFooter";
import LoginForm from "./components/LoginForm";
import Register from "./components/Register";

const Login = () => {
  const isShown = useSelector(state => state.user.isShown)
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        {isShown && <Register />}
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
