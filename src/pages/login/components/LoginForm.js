import { Formik, Form } from "formik";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";

import {
  handleRegisterChange,
  login,
  toggleRegisterModal,
} from "store/userSlice";
import LoginInput from "./loginInputs";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, ...user } = useSelector(
    (state) => state.user.userData.login
  );
  const { isLoading, isError, token, message } = useSelector(
    (state) => state.user
  );

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      handleRegisterChange({
        name: name,
        value: value,
        target: "login",
      })
    );
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required."),
  });
  token && navigate("/");
  return (
    <div className="login_wrap">
      <div className="login_1">
        <img src="../../icons/facebook.svg" alt="" />
        <span>
          Facebooks helps you connnect and share with the people in your life.
        </span>
      </div>
      <div className="login_2">
        <div className="login_2_wrap">
          <Formik
            enableReinitialize
            initialValues={{
              email: email,
              password: password,
            }}
            validationSchema={loginValidation}
            onSubmit={() => {
              dispatch(login());
            }}
          >
            {(formik) => (
              <Form>
                <LoginInput
                  type="text"
                  name="email"
                  placeholder={"Email address or phone number"}
                  onInput={handleLoginChange}
                />
                <LoginInput
                  type="password"
                  name="password"
                  placeholder={"password"}
                  onInput={handleLoginChange}
                />
                <button type="submit" className="blue_btn">
                  {isLoading ? (
                    <ClipLoader
                      color={"#fff"}
                      loading={isLoading}
                      // cssOverride={override}
                      size={15}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Log in"
                  )}
                </button>
                {isError ? (
                  <div className="error_message">{message.login}</div>
                ) : (
                  !isError && (
                    <div className="success_message">{message.login}</div>
                  )
                )}
              </Form>
            )}
          </Formik>
          <Link to="/forgot" className="forgot_password">
            Forgotten Password
          </Link>
          <div className="line_spliter"></div>
          <button
            className="blue_btn open_signup"
            onClick={() => dispatch(toggleRegisterModal())}
          >
            Create Account
          </button>
        </div>
        <Link to="/" className="sign_extra">
          <b>Create a Page</b> for a celebrity, brand or business.
        </Link>
      </div>
    </div>
  );
}
