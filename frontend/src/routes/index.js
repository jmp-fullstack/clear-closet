import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserProvider } from "../pages/context/UserContext";

import Start from "../pages/login/Start";
import Login from "../pages/login/Login";
import SignUp from "../pages/login/SignUp";
import Find from "../pages/login/Find";
import Welcome from "../pages/login/Welcome";
import Service from "../pages/login/Service";

import Home from "../pages/home/Home";
import Product from "../pages/home/Product";
import Search from "../pages/search/Search";

import Plus from "../pages/plus/Plus";
import Sell from "../pages/plus/sell/Sell";
import Buy from "../pages/plus/buy/Buy";
// import Upload from "../components/camera/Upload";

import Deal from "../pages/deal/Deal";
import Chat from "../pages/deal/Chat";

import My from "../pages/my/My";
import Alarm from "../pages/alarm/Alarm";
import User from "../pages/home/User";
import CameraSell from "../pages/plus/camera/CameraSell";

import ProtectedRoute from "../components/protected/ProtectedBoute";
import Review from "../pages/my/Review";
import Predict from "../pages/plus/buy/Predict";

const AllRoutes = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/find" element={<Find />} />
        <Route path="/service" element={<Service />} />

        <Route path="/welcome" element={<Welcome />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/user" element={<User />} />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />/{" "}
            </ProtectedRoute>
          }
        />

        <Route
          path="/plus"
          element={
            <ProtectedRoute>
              <Plus />
            </ProtectedRoute>
          }
        />
        <Route path="/sell" element={<Sell />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/camera-sell" element={<CameraSell />} />
        <Route path="/predict" element={<Predict />} />
        {/* <Route path="/upload" element={<Upload />} /> */}

        <Route
          path="/deal"
          element={
            <ProtectedRoute>
              <Deal />
            </ProtectedRoute>
          }
        />
        <Route path="/chat" element={<Chat />} />

        <Route
          path="/my"
          element={
            <ProtectedRoute>
              <My />
            </ProtectedRoute>
          }
        />
        <Route path="/review" element={<Review />} />

        <Route path="/alarm" element={<Alarm />} />
      </Routes>
    </UserProvider>
  );
};

export default AllRoutes;
