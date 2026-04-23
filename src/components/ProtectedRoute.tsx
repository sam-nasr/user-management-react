import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute is a wrapper component that ensures the user is authenticated
 * before allowing access to the child routes (rendered via Outlet).
 */
export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container" style={{ paddingTop: '20vh' }}>
        <p>Loading session...</p>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the nested child routes
  return <Outlet />;
};
