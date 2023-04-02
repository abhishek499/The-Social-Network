import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../home/components/createPost";
import LeftHome from "../home/components/LeftHome";
import RightHome from "../home/components/RightHome";
import Stories from "../home/components/Stories";
import ActivateForm from "./ActivateForm";
import "./Home.style.css";
import { activate } from "store/userSlice";

export default function Activate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((user) => ({ ...user }));
  const { isLoading, isError,isSuccess } = useSelector((state) => state.user);

  const message = useSelector((state) => state.user.message.activate);
  const { token } = useParams();

  useEffect(() => {
    dispatch(activate(token));
  }, []);

  (isError || isSuccess) &&
    message &&
    setTimeout(() => {
      navigate("/");
    }, 3000);

  return (
    <div className="home">
      {message && (
        <ActivateForm
          type="success"
          header="Account verification succeded."
          text={message}
          loading={isLoading}
        />
      )}
      {isError && (
        <ActivateForm
          type="error"
          header="Account verification failed."
          text={message}
          loading={isLoading}
        />
      )}
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
