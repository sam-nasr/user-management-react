import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Layout wraps the main application routes, providing a top navigation bar.
 */
export const Layout: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-brand">NexusApp</Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/users" className="nav-link">Users</Link>
              <span style={{ color: 'var(--text-secondary)', marginLeft: '1rem' }}>
                Hello, {user?.name}
              </span>
              <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem', width: 'auto' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </div>
      </nav>
      {/* The animate-fade-in class applies a subtle entrance animation */}
      <main className="container animate-fade-in">
        <Outlet />
      </main>
    </>
  );
};
