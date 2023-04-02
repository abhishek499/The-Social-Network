import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { nextVisible, sendResetEmail } from "store/userSlice";

export default function SendEmail({ user }) {
  const dispatch = useDispatch();

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want to receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{user.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={user.picture} alt="" />
          <span>{user.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      <div className="reset_form_btns">
        <Link to="/login" className="gray_btn">
          Not You ?
        </Link>
        <button
          onClick={() => dispatch(sendResetEmail())}
          type="submit"
          className="blue_btn"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
