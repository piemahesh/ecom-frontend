import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  adminOnly = false 
}) => {
  const { isAuthenticated, user } = useAppSelector(state => state.auth);
  console.log(isAuthenticated,user,adminOnly)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // if (adminOnly && user?.is_admin) {
  //   return <Navigate to="/" replace />;
  // }

  return <>{children}</>;
};