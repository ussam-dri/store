import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

const PrivateRoute = ({ allowedRoles }) => {
  const auth = useAuthUser();
  const user = auth();

  if (!user) {
    return <Navigate to="/reward-program/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
