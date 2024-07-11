import React from "react";

import { Link, useLocation } from "react-router-dom";

import "./BottomNav.css";

import { GoHomeFill } from "react-icons/go";
import { IoChatboxOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";

const BottomNav = () => {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to={"/home"}>
        <span className={location.pathname === "/home" ? "active" : ""}>
          <GoHomeFill size={28} />
        </span>
      </Link>
      <Link to={"/search"}>
        <span className={location.pathname === "/search" ? "active" : ""}>
          <IoSearchOutline size={28} />
        </span>
      </Link>
      <Link to={"/plus"}>
        <span className={location.pathname === "/plus" ? "active" : ""}>
          <AiOutlinePlusSquare size={28} />
        </span>
      </Link>
      <Link to={"/deal?isSell=true"}>
        <span
          className={location.pathname === "/deal?isSell=true" ? "active" : ""}
        >
          <IoChatboxOutline size={28} />
        </span>
      </Link>
      <Link to={"/my"}>
        <span className={location.pathname === "/my" ? "active" : ""}>
          <BsPersonCircle size={25} />
        </span>
      </Link>
    </div>
  );
};

export default BottomNav;
