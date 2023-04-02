import "./Reset.style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "pages/login/components/LoginFooter";
import ChangePassword from "./ChangePassword";


export default function Reset() {
  const {
    userData,
    user: { visible, findUser },
  } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = findUser;

  const { email, setEmail } = useState("");
  const { code, setCode } = useState("");
  const { error, setError } = useState("");

  return (
    <div className="reset">
      {/* Navbar */}
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {findUser.picture ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={findUser.picture} alt="" />
            </Link>
            <button className="blue_btn" onClick={() => {}}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount email={email} setEmail={setEmail} error={error} />
        )}
        {visible === 1 && <SendEmail user={user} />}
        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
          />
        )}
        {visible === 3 && <ChangePassword />}
      </div>
      <Footer />
    </div>
  );
}
