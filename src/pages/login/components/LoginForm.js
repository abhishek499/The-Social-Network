import { Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import LoginInput from "./loginInputs";

export default function LoginForm() {
    const [login, setLogin] = useState({
        email: "",
        password: "",
      });
    
      const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...login, [name]: value });
      };
      const loginValidation = Yup.object({
        email: Yup.string()
          .required("Email is required")
          .email("Must be a valid email.")
          .max(100),
        password: Yup.string().required("Password is required."),
      });
  return (
    <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="" />
            <span>
              Facebooks helps you connnect and share with the people in your
              life.
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{
                  email: login.email,
                  password: login.password,
                }}
                validationSchema={loginValidation}
              >
                {(formik) => (
                  <form>
                    <LoginInput
                      type="text"
                      name="email"
                      placeholder={"Email address or phone number"}
                      onChange={handleLoginChange}
                    />
                    <LoginInput
                      type="password"
                      name="password"
                      placeholder={"password"}
                      onChange={handleLoginChange}
                    />
                    <button type="submit" className="blue_btn">
                      Log in
                    </button>
                  </form>
                )}
              </Formik>
              <Link to="/forgot" className="forgot_password">
                Forgotten Password
              </Link>
              <div className="line_spliter"></div>
              <button className="blue_btn open_signup">Create Account</button>
            </div>
            <Link to="/" className="sign_extra">
              <b>Create a Page</b> for a celebrity, brand or business.
            </Link>
          </div>
        </div>
  )
}
