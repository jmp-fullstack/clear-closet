import React from "react";
import { Route, Routes } from "react-router-dom";

import Plus from "../pages/Plus";
import Deal from "../pages/Deal";
import My from "../pages/My";
import Home from "../pages/home/Home";
import Search from "../pages/Search";

import Login from "../pages/login/Login";
import Start from "../pages/login/Start";
import SignUp from "../pages/login/SignUp";
import Wellcome from "../pages/login/Wellcome";
import HomeProduct from "../pages/home/HomeProduct";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/wellcome" element={<Wellcome />} />

      <Route path="/home" element={<Home />} />
      <Route path="/home_product" element={<HomeProduct />} />

      <Route path="/search" element={<Search />} />
      <Route path="/plus" element={<Plus />} />
      <Route path="/deal" element={<Deal />} />
      <Route path="/my" element={<My />} />
    </Routes>
  );
};

export default AllRoutes;
