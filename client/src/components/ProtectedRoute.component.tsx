import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth.provider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
  routeFor: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles,routeFor }) => {
  const {user}=useAuth();
  const userRole=user?.role;

  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to={`/${routeFor}`} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

