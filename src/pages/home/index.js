import LeftHome from "./components/LeftHome/index";
import { useSelector } from "react-redux";
import RightHome from "./components/RightHome/index";
import Stories from "./components/Stories/index";
import "./Home.style.css"
import CreatePost from "./components/createPost/index";
import SendVerification from "./components/sendVerification/index";

export default function Home() {
  const user = useSelector((state) => state.user);
  
  return (
    <div className="home">
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories user={user}/>
        {!user.verified && <SendVerification />}
        <CreatePost user={user}/>
      </div>
      <RightHome user={user} />
    </div>
  );
}
