import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "../pages/login/Start";
import Login from "../pages/login/Login";
import SignUp from "../pages/login/SignUp";
import Wellcome from "../pages/login/Wellcome";

import Home from "../pages/home/Home";
import HomeProduct from "../pages/home/HomeProduct";
import Search from "../pages/search/Search";

import Plus from "../pages/plus/Plus";
import Sell from "../pages/plus/sell/Sell";
import Buy from "../pages/plus/buy/Buy";
import CameraPage from "../pages/plus/camera/Camerapage";

import Deal from "../pages/deal/Deal";
import Chat from "../pages/deal/Chat";

import My from "../pages/my/My";
import Alarm from "../pages/alarm/Alarm";

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
      <Route path="/sell" element={<Sell />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/camera" element={<CameraPage />} />

      <Route path="/deal" element={<Deal />} />
      <Route path="/chat" element={<Chat />} />

      <Route path="/my" element={<My />} />

      <Route path="/alarm" element={<Alarm />} />
    </Routes>
  );
};

export default AllRoutes;
