import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoggedIn === false) {
    return <Navigate to="/login" />
  }

  return children
};

export default ProtectedRoute;
