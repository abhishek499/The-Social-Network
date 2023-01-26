import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import axios from "axios";

import RegisterInput from "./registerInputs";

export default function Register() {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    email: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  });
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
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
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
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "password can't be more than 36 characters."),
  });
  const [dateError, setDateError] = useState();
  const [genderError, setGenderError] = useState();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading("true");
      const { data } = await axios.post(`http://localhost:8000/register`, {
        first_name,
        last_name,
        email,
        password,
        bYear,
        bMonth,
        bDay,
        gender,
      });
      setError("");
      setSuccess(data.message);
      setLoading("false");
      const {message, ...rest} = data
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };

  return (
    <div className="blur">
      <div className="register">
        <div className="register_header">
          <i className="exit_icon"></i>
          <span>Sign Up</span>
          <span>it's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
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
              registerSubmit();
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
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="text"
                  placeholder="Mobile number or email address"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_line">
                <RegisterInput
                  type="password"
                  placeholder="New password"
                  name="password"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="reg_col">
                <div className="reg_Line_header">
                  Date of birth <i className="info_icon"></i>
                </div>
                <div className="reg_grid">
                  <select name="bDay" onChange={handleRegisterChange}>
                    {days.map((day, index) => (
                      <option value={day} key={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name="bMonth" onChange={handleRegisterChange}>
                    {months.map((month, index) => (
                      <option value={month} key={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name="bYear" onChange={handleRegisterChange}>
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
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="female">
                    Female
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value={"female"}
                      onChange={handleRegisterChange}
                    />
                  </label>
                  <label htmlFor="custom">
                    Custom
                    <input
                      type="radio"
                      name="gender"
                      id="custom"
                      value={"custom"}
                      onChange={handleRegisterChange}
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
                  Sign Up
                </button>
              </div>
              <ClipLoader
                color={"#1876f2"}
                loading={loading}
                // cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {error && <div className="error_message">{error}</div>}
              {success && <div className="success_message">{success}</div>}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
