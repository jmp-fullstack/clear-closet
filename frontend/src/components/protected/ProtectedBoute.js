// src/components/ProtectedRoute/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../pages/context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
