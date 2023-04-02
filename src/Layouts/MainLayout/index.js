import LeftHome from "pages/home/components/LeftHome/index";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/index";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
