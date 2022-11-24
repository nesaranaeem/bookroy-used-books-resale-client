import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Common/Footer/Footer";
import NavBar from "../Pages/Common/NavBar/NavBar";

const Main = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
