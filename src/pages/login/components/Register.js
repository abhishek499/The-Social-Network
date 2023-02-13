import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

import RegisterInput from "./registerInputs";
import { register } from "../../../store/userSlice";
import {
  toggleRegisterModal,
  handleRegisterChange,
} from "../../../store/userSlice";
import { useNavigate } from "react-router";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State fetching
  const user = useSelector((state) => state.user.userData.register);
  const error = useSelector((state) => state.user.isError);
  const message = useSelector((state) => state.user.message.register);
  const loading = useSelector((state) => state.user.isLoading);
  const token = useSelector((state) => state.user.token);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleChange = (e) => {
    dispatch(
      handleRegisterChange({
        name: e.target.name,
        value: e.target.value,
        target: "register",
      })
    );
  };
  const redirect = () => {
    setTimeout(() => {
      Cookies.set("user", JSON.stringify(user));
      dispatch(toggleRegisterModal());
      navigate("/");
    }, 2000);
  };
  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => new Date(bYear, bMonth, 0).getDate();
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your first name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Number and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your first name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Number and special characters are not allowed."),
    email: Yup.string().required("You need to enter an email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers, letters and punctuation marks(such as ! and &)."
      )
      .min(8, "Password must be atleast 8 characters.")
      .max(36, "password can't be more than 36 characters."),
  });
  const [dateError, setDateError] = useState();
  const [genderError, setGenderError] = useState();
  !error && token && redirect();
  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i
            onClick={() => dispatch(toggleRegisterModal())}
            className="exit_icon"
          ></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            bYear: bYear,
            bMonth: bMonth,
            bDay: bDay,
            gender: gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "It looks like you've entered wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              dispatch(register());
            }
          }}
        >
          {(formik) => (
            <Form className="register_form">
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  onInput={(e) => handleChange(e)}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onInput={(e) => handleChange(e)}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onInput={(e) => handleChange(e)}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onInput={(e) => handleChange(e)}
                />
              </div>
              <div className="reg_col">
                <div className="reg_Line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" onChange={(e) => handleChange(e)}>
                    {days.map((day, index) => (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" onChange={(e) => handleChange(e)}>
                    {months.map((month, index) => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" onChange={(e) => handleChange(e)}>
                    {years.map((year, index) => (
                      <option value={year} key={index}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {dateError && <div className="error_message">{dateError}</div>}
              </div>
              <div className="reg_col">
                <div className="reg_line_header">
                  Gender <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <label htmlFor="male">
                    Male
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value={"male"}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value={"female"}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value={"custom"}
                      onChange={(e) => handleChange(e)}
                    />
                  </label>
                </div>
                {genderError && (
                  <div className="error_message">{genderError}</div>
                )}
              </div>
              <div className="reg_infos">
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive SMS
                notifications from us and can opt out at any time.
              </div>
              <div className="reg_btn_wrapper">
                <button
                  type="submit"
                  className="blue_btn open_signup"
                  style={{ height: "50px" }}
                >
                  {loading ? (
                    <ClipLoader
                      color={"#fff"}
                      loading={loading}
                      // cssOverride={override}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Sign up"
                  )}
                </button>
              </div>

              {error ? (
                <div className="error_message">{message}</div>
              ) : (
                !error && <div className="success_message">{message}</div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
