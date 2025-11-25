import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) return <LoadingSpinner fullScreen />;
  
  // Si no hay sesión, mandar al login
  if (!session) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;