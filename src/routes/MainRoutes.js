// project import
import React from "react";
import LoaderComponent from "components/Loader/index";
import PrivateRoute from "components/PrivateRoute/index";
import MainLayout from "Layouts/MainLayout/index";
// import Home from "pages/home";
// import Profile from "pages/profile";

const Home = React.lazy(() => import("pages/home"));
const Profile = React.lazy(() => import("pages/profile"));

// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: (
        <PrivateRoute>
          <LoaderComponent>
            <Home />
          </LoaderComponent>
        </PrivateRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <PrivateRoute>
          <LoaderComponent>
            <Profile />
          </LoaderComponent>
        </PrivateRoute>
      ),
    },
  ],
};

export default MainRoutes;
