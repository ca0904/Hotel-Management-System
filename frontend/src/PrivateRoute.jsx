import React from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, children, redirect,toktype }) => {
  const authenticate = (localStorage.getItem(toktype))? true : false;
  const location = useLocation();

  return authenticate ? (
    children
  ) : (
    <Navigate
      to={`/auth/login?redirect=${encodeURIComponent(redirect || location.pathname)}`}
    />
  );
};

export default PrivateRoute;