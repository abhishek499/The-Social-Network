import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import LoginInput from "pages/login/components/loginInputs";
import { useDispatch, useSelector } from "react-redux";
import { handleInputChange, sendCode } from "store/userSlice";

export default function CodeVerification({ error }) {
  const dispatch = useDispatch();
  const code = useSelector((state) => state.user.findUser.code);

  const handleCode = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    dispatch(
      handleInputChange({
        name: name,
        value: value,
        target: "findUser",
      })
    );
  };

  return (
    <div className="reset_form">
      <div className="reset_form_header">Code verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          code,
        }}
        onSubmit={() => {
          dispatch(sendCode());
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onInput={handleCode}
              placeholder="Code"
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
