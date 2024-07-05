import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "../pages/login/Start";
import Login from "../pages/login/Login";
import SignUp from "../pages/login/SignUp";
import Find from "../pages/login/Find";
import Wellcome from "../pages/login/Wellcome";
import Service from "../pages/login/Service";

import Home from "../pages/home/Home";
import Product from "../pages/home/Product";
import Search from "../pages/search/Search";

import Plus from "../pages/plus/Plus";
import Sell from "../pages/plus/sell/Sell";
import Buy from "../pages/plus/buy/Buy";
import Upload from "../components/camera/Upload";

import Deal from "../pages/deal/Deal";
import Chat from "../pages/deal/Chat";

import My from "../pages/my/My";
import Alarm from "../pages/alarm/Alarm";
import User from "../pages/home/User";
import CameraSell from "../pages/plus/camera/CameraSell";
import CameraBuy from "../pages/plus/camera/CameraBuy";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/find" element={<Find />} />
      <Route path="/service" element={<Service />} />

      <Route path="/wellcome" element={<Wellcome />} />

      <Route path="/home" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/user" element={<User />} />

      <Route path="/search" element={<Search />} />

      <Route path="/plus" element={<Plus />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/camera-sell" element={<CameraSell />} />
      <Route path="/camera-buy" element={<CameraBuy />} />
      <Route path="/upload" element={<Upload />} />

      <Route path="/deal" element={<Deal />} />
      <Route path="/chat" element={<Chat />} />

      <Route path="/my" element={<My />} />

      <Route path="/alarm" element={<Alarm />} />
    </Routes>
  );
};

export default AllRoutes;
