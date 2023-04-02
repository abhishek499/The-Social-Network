// project import
import React, { Suspense } from "react";
import LoaderComponent from "components/Loader/index";
import PrivateRoute from "components/PrivateRoute/index";
import MainLayout from "Layouts/MainLayout/index";
import ActivateAccount from "pages/ActivateAccount/index";

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
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "profile",
      element: (
        <PrivateRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <Profile />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "activate/:token",
      element: (
        <PrivateRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <ActivateAccount />
          </Suspense>
        </PrivateRoute>
      ),
    },
  ],
};

export default MainRoutes;
