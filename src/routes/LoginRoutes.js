// project import
import MinimalLayout from "../Layouts/MinimalLayout";
import Login from "../pages/login";
import Reset from "pages/ResetPassword/index";

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "reset",
      element: <Reset />,
    },
  ],
};

export default LoginRoutes;
