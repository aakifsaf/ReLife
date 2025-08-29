import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified and user role is not in allowedRoles, redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.user_type)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If user is authenticated and has proper role, render children
  return children;
};

export default ProtectedRoute;
