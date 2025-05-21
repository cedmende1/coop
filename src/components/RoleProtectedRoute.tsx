import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { canAccess } from '../utils/roleAccess';
import { LoadingFallback } from './LoadingFallback';
export const RoleProtectedRoute: React.FC<{
  children: React.ReactNode;
  path: string;
}> = ({
  children,
  path
}) => {
  const {
    user,
    isAuthenticated,
    isLoading
  } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <LoadingFallback />;
  }
  if (!isAuthenticated || !user) {
    return <Navigate to="/" state={{
      from: location
    }} replace />;
  }
  if (!canAccess(user.role, path)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};