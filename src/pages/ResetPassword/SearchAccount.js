import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "pages/login/components/loginInputs";
import { findUser, handleInputChange } from "store/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SearchAccount({ setEmail, error }) {
  const dispatch = useDispatch();

  const {
    findUser: { email },
  } = useSelector((state) => state.user);

  const handleAccount = (e) => {
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
      <div className="reset_form_header">Find Your Account</div>
      <div className="reset_form_text">
        Please enter your email address or mobile number to search for your
        account.
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        onSubmit={() => {
          dispatch(findUser());
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="email"
              onInput={handleAccount}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
