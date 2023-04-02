import { Form, Formik } from "formik";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import LoginInput from "pages/login/components/loginInputs/index";
import { useDispatch, useSelector } from "react-redux";
import { changePassword, handleInputChange } from "store/userSlice";

export default function ChangePassword({}) {
  const {
    findUser: { password, confPassword, isSuccess },
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const error = useSelector((state) => state.user.message.findUser);
  const navigate = useNavigate();

  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),

    confPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match.")
      .required("Confirm your password."),
  });

  const handlePassword = (e) => {
    const { name, value } = e.target;
    dispatch(
      handleInputChange({
        name,
        value,
        target: "findUser",
      })
    );
  };

  isSuccess && setTimeout(() => navigate("/login"), 1000);

  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          confPassword,
        }}
        validationSchema={validatePassword}
        onSubmit={() => {
          dispatch(changePassword(), () => navigate("/login"));
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={handlePassword}
              placeholder="New password"
            />
            <LoginInput
              type="password"
              name="confPassword"
              onChange={handlePassword}
              placeholder="Confirm new password"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
