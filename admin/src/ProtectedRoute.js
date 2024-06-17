import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let isAuthenticated = false; // Replace this with actual authentication logic
  if(localStorage.getItem('userId') && localStorage.getItem('role')==='admin') isAuthenticated=true;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;