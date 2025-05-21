import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingFallback } from './LoadingFallback';
export const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return <LoadingFallback />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/" state={{
      from: location
    }} replace />;
  }
  return <>{children}</>;
};