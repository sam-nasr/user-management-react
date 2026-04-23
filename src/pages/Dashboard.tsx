import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <h1>Dashboard</h1>
      <div className="glass-panel" style={{ maxWidth: '800px' }}>
        <h2>Welcome, {user?.name}!</h2>
        <p>This is your protected dashboard. Only authenticated users can see this.</p>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/users" className="btn btn-primary" style={{ width: 'auto' }}>
            Manage Users
          </Link>
        </div>
      </div>
    </div>
  );
};
