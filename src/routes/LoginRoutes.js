// project import
import MinimalLayout from "../Layouts/MinimalLayout";
import Login from "../pages/login";

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "login",
      element: <Login />,
    },
  ],
};

export default LoginRoutes;
