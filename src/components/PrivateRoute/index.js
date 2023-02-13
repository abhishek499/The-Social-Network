import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.user.token);
  console.log(user);

  //Rendering Children under Private Tag
  if (user) {
    return children;
  }

  //Fallback
  return <Navigate to={{ pathname: "/login" }} />;
}
