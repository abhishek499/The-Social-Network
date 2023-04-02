import { useDispatch, useSelector } from "react-redux";

import { sendVerification } from "store/userSlice";
import "./SendVerification.style.css";

export default function SendVerification({ user }) {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    message: { activate },
  } = useSelector((state) => state.user);

  return (
    <div className="send_verification">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <a
        onClick={() => {
          dispatch(sendVerification());
        }}
      >
        click here to resend verification link
      </a>
      {activate && !isError && <div className="success_text">{activate}</div>}
      {isError && <div className="error_text">{activate}</div>}
    </div>
  );
}
