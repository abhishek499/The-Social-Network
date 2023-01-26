import LoginFooter from "./components/LoginFooter";

import LoginForm from "./components/LoginForm";
import Register from "./components/Register";
import "./login.style.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login_wrapper">
        <LoginForm />
        <Register />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;
